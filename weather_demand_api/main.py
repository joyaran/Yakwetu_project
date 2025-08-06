# api/main.py
import streamlit as st
import requests
from datetime import datetime

# Import your modules
from model import YAKWETUPredictor
from dynamic_pricing import get_price_multiplier, recommend_genres

# =======================
# Page Setup
# =======================
st.set_page_config(page_title="YAKWETU™ Pricing", layout="wide")
st.title("YAKWETU™ Climate-Based Pricing System")
st.markdown("Predict demand • Recommend content • Optimize pricing")

# =======================
# Load Model
# =======================
@st.cache_resource
def load_predictor():
    try:
        return YAKWETUPredictor()
    except Exception as e:
        st.error(f"Failed to load model: {e}")
        st.stop()

predictor = load_predictor()
st.success("✅ AI Model Ready!")

# =======================
# Weather Helper
# =======================
def get_weather(country_code):
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
        "daily": ["temperature_2m_max", "precipitation_sum"],
        "forecast_days": 1
    }
    try:
        r = requests.get(url, params=params).json()
        temp = r['daily']['temperature_2m_max'][0]
        rain = r['daily']['precipitation_sum'][0]
        is_rainy = 1 if rain > 0 else 0
        return {"temp": temp, "rain": rain, "is_rainy": is_rainy}
    except Exception as e:
        st.warning(f"Weather API error: {e}")
        return {"temp": 25.0, "rain": 0.0, "is_rainy": 0}

def get_temp_bin(temp):
    if temp < 15: return "cold"
    elif temp < 25: return "mild"
    else: return "hot"

# =======================
# UI Input
# =======================
st.sidebar.header("Select Country")
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

if st.button("Predict Demand"):
    with st.spinner("Fetching weather..."):
        weather = get_weather(country)
        if not:
            st.error("Country not supported")
        else:
            temp = weather["temp"]
            rain = weather["rain"]
            is_rainy = weather["is_rainy"]
            temp_bin = get_temp_bin(temp)

            # Predict demand
            demand, conf = predictor.predict_demand(temp, rain, is_rainy, temp_bin)
            price_mult = get_price_multiplier(demand)
            genres = recommend_genres(is_rainy, temp_bin)

            # Display results
            col1, col2, col3 = st.columns(3)
            col1.metric("Temp", f"{temp:.1f}°C")
            col2.metric("Rain", f"{rain:.1f} mm")
            col3.metric("Demand", demand)

            st.markdown("---")

            st.subheader("Recommendations")
            st.write(f"**Confidence**: {conf}")
            st.write(f"**Price Multiplier**: {price_mult}x")
            st.write(f"**Recommended Genres**: {', '.join(genres)}")

            # Save to history
            result = {
                "Time": datetime.now().strftime("%H:%M"),
                "Country": country,
                "Temp": temp,
                "Rain": rain,
                "Demand": demand,
                "Genres": ", ".join(genres)
            }
            st.session_state.setdefault("history", []).append(result)

# Show history
if "history" in st.session_state:
    st.sidebar.subheader("Recent Predictions")
    for item in st.session_state.history[-5:]:
        st.sidebar.text(f"{item['Country']} → {item['Demand']} ({item['Temp']}°C)")