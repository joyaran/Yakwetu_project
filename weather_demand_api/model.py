# api/model.py
import joblib
import pandas as pd
import os
from datetime import datetime

class YAKWETUPredictor:
    def __init__(self, model_path='yakwetu_model.pkl'):
        self.model_path = model_path
        self.model = None
        self._load_model()

    def _load_model(self):
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model not found: {self.model_path}")
        self.model = joblib.load(self.model_path)
        print("Model loaded.")

    def predict_demand(self, temp_max, rain_sum, is_rainy, temp_bin):
        """
        Predict demand using the exact same features the model was trained on.
        """
        # One-hot encode temp_bin
        temp_bin_cold = 1 if temp_bin == "cold" else 0
        temp_bin_mild = 1 if temp_bin == "mild" else 0
        temp_bin_hot = 1 if temp_bin == "hot" else 0

        # Get today's date for temporal features
        now = datetime.now()
        day_of_week = now.weekday()  # 0=Mon, 6=Sun
        month = now.month
        is_weekend = 1 if day_of_week >= 5 else 0
        is_holiday = 0  

        # Dummy lag and rolling values (for demo)
        lag1_total_views = 1500
        lag2_total_views = 1480
        lag7_total_views = 1400
        rolling_3day_avg = 1490
        rolling_7day_avg = 1450

        # You must include 'weathercode' — get it from API or estimate
        weathercode = 3  # Example: partly cloudy — adjust based on forecast

        # Create input DataFrame with ALL expected columns
        input_df = pd.DataFrame([{
            'temperature_2m_max': temp_max,
            'precipitation_sum': rain_sum,
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

        # Ensure column order matches training
        input_df = input_df[self.model.feature_names_in_]

        pred = self.model.predict(input_df)[0]
        proba = self.model.predict_proba(input_df)[0].max()
        return pred, round(proba, 2)