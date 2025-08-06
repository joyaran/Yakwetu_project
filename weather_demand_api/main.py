# api/main.py
import streamlit as st
import requests
from datetime import datetime
import pandas as pd
import joblib
import os
from dynamic_pricing import get_price_multiplier, recommend_genres, recommend_purchase_types
# =======================
# Page Setup
# =======================
st.set_page_config(page_title="🌍 YAKWETU™ Pricing", layout="wide")
st.title("🌍 YAKWETU™ Climate-Based Pricing System")
st.markdown("Predict demand • Recommend content • Optimize pricing")

# =======================
# Load Model
# =======================
@st.cache_resource
def load_model():
    model_path = 'yakwetu_model.pkl'
    if not os.path.exists(model_path):
        st.error("Model file 'yakwetu_model.pkl' not found in 'api/' folder.")
        st.stop()
    try:
        model = joblib.load(model_path)
        st.success("✅ AI Model Loaded!")
        return model
    except Exception as e:
        st.error(f"Failed to load model: {e}")
        st.stop()

model = load_model()

# Get expected feature names from the model
EXPECTED_FEATURES = model.feature_names_in_.tolist()

# =======================
# Weather Helper
# =======================
def get_weather(country_code):
    """Fetch real weather forecast using Open-Meteo API"""
    coords = {
        "KE": (-1.2921, 36.8219),  # Nairobi
        "NG": (6.5244, 3.3792),   # Lagos
        "GH": (5.6037, -0.1870),  # Accra
        "ZA": (-33.9249, 18.4241), # Cape Town
        "AE": (25.2048, 55.2708)  # Dubai
    }
    if country_code not in coords:
        return None

    lat, lon = coords[country_code]
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["temperature_2m_max", "precipitation_sum", "weathercode"],
        "forecast_days": 1
    }
    try:
        response = requests.get(url, params=params).json()
        temp = response['daily']['temperature_2m_max'][0]
        rain = response['daily']['precipitation_sum'][0]
        weathercode = response['daily']['weathercode'][0]
        is_rainy = 1 if rain > 0 else 0
        return {
            "temp": temp,
            "rain": rain,
            "is_rainy": is_rainy,
            "weathercode": weathercode
        }
    except Exception as e:
        st.warning(f"Weather API error: {e}. Using fallback values.")
        return {
            "temp": 25.0,
            "rain": 0.0,
            "is_rainy": 0,
            "weathercode": 3
        }

def get_temp_bin(temp):
    if temp < 15:
        return "cold"
    elif temp < 25:
        return "mild"
    else:
        return "hot"

# =======================
# Business Logic
# =======================
def recommend_genres(is_rainy, temp_bin):
    genre_map = {
        (1, "cold"): ["Drama", "Romance", "Chick Flick"],
        (1, "mild"): ["Drama", "Romantic Comedy", "Family"],
        (1, "hot"): ["Comedy", "Short & Sweet", "Kenyan Favourites"],
        (0, "cold"): ["Action", "Thriller", "Crime"],
        (0, "mild"): ["Action", "Adventure", "Movies by Women"],
        (0, "hot"): ["Sports", "Reality", "Documentary"]
    }
    return genre_map.get((is_rainy, temp_bin), ["General"])

def get_price_multiplier(demand_level):
    multipliers = {"Low": 0.9, "Medium": 1.0, "High": 1.2}
    return multipliers.get(demand_level, 1.0)

# =======================
# UI Input
# =======================
st.sidebar.header("📍 Select Country")
country = st.sidebar.selectbox(
    "Country Code",
    ["KE", "NG", "GH", "ZA", "AE"],
    format_func=lambda x: {
        "KE": "🇰🇪 Nairobi, Kenya",
        "NG": "🇳🇬 Lagos, Nigeria",
        "GH": "🇬🇭 Accra, Ghana",
        "ZA": "🇿🇦 Cape Town, South Africa",
        "AE": "🇦🇪 Dubai, UAE"
    }[x]
)

if st.button("🌤️ Predict Demand"):
    with st.spinner("Fetching weather and predicting demand..."):
        weather = get_weather(country)
        if not weather:
            st.error("Country not supported")
        else:
            temp = weather["temp"]
            rain = weather["rain"]
            is_rainy = weather["is_rainy"]
            weathercode = weather["weathercode"]
            temp_bin = get_temp_bin(temp)

            # Get current date for temporal features
            now = datetime.now()
            day_of_week = now.weekday()  # 0=Mon, 6=Sun
            month = now.month
            is_weekend = 1 if day_of_week >= 5 else 0
            is_holiday = 0  

            # Dummy lag and rolling values (replace with real data in production)
            lag1_total_views = 1500
            lag2_total_views = 1480
            lag7_total_views = 1400
            rolling_3day_avg = 1490
            rolling_7day_avg = 1450

            # One-hot encode temp_bin
            temp_bin_cold = 1 if temp_bin == "cold" else 0
            temp_bin_mild = 1 if temp_bin == "mild" else 0
            temp_bin_hot = 1 if temp_bin == "hot" else 0

            # Create input DataFrame with ALL expected features
            input_df = pd.DataFrame([{
                'temperature_2m_max': temp,
                'precipitation_sum': rain,
                'is_rainy': is_rainy,
                'weathercode': weathercode,
                'temp_bin_cold': temp_bin_cold,
                'temp_bin_mild': temp_bin_mild,
                'temp_bin_hot': temp_bin_hot,
                'lag1_total_views': lag1_total_views,
                'lag2_total_views': lag2_total_views,
                'lag7_total_views': lag7_total_views,
                'rolling_3day_avg': rolling_3day_avg,
                'rolling_7day_avg': rolling_7day_avg,
                'day_of_week': day_of_week,
                'month': month,
                'is_weekend': is_weekend,
                'is_holiday': is_holiday
            }])

            # Ensure column order matches exactly what the model expects
            input_df = input_df[EXPECTED_FEATURES]

            try:
                # Predict
                pred = model.predict(input_df)[0]
                proba = model.predict_proba(input_df)[0].max()

                # Map numeric prediction back to label
                labels = ["Low", "Medium", "High"]
                demand_level = labels[pred]
                confidence = round(proba, 2)
                price_mult = get_price_multiplier(demand_level)
                genres = recommend_genres(is_rainy, temp_bin)

                # Recommend purchase types
                purchase_types = recommend_purchase_types(demand_level, is_rainy)

                # Display results
                col1, col2, col3 = st.columns(3)
                col1.metric("🌡️ Temp", f"{temp:.1f}°C")
                col2.metric("💧 Rain", f"{rain:.1f} mm")
                col3.metric("🎯 Demand", demand_level)

                st.markdown("---")

                st.subheader("📋 Recommendations")
                st.write(f"**Confidence**: {confidence}")
                st.write(f"**Suggested Price Multiplier**: `{price_mult}x`")
                st.write(f"**Recommended Genres**: `{', '.join(genres)}`")
                st.write(f"**Recommended Purchase Types**: `{', '.join(purchase_types)}`")

                # Save to history
                result = {
                    "Time": now.strftime("%H:%M"),
                    "Country": country,
                    "Temp": temp,
                    "Rain": rain,
                    "Demand": demand_level,
                    "Genres": ", ".join(genres)
                }
                st.session_state.setdefault("history", []).append(result)

            except Exception as e:
                st.error(f"Prediction failed: {e}")

# =======================
# Show History
# =======================
if "history" in st.session_state and st.session_state.history:
    st.sidebar.subheader("📜 Recent Predictions")
    for item in st.session_state.history[-5:]:
        st.sidebar.text(f"{item['Country']} → {item['Demand']} ({item['Temp']}°C)")