# api/model.py
import joblib
import pandas as pd
import os

class YAKWETUPredictor:
    def __init__(self, model_path='yakwetu_model.pkl', encoder_path='label_encoder.pkl'):
        self.model_path = model_path
        self.encoder_path = encoder_path
        self.model = None
        self.encoder = None
        self._load_model()

    def _load_model(self):
        """Load the saved model and label encoder."""
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model not found at {self.model_path}")
        if not os.path.exists(self.encoder_path):
            raise FileNotFoundError(f"Encoder not found at {self.encoder_path}")

        self.model = joblib.load(self.model_path)
        self.encoder = joblib.load(self.encoder_path)
        print("YAKWETU Model & Encoder loaded!")

    def predict_demand(self, temp_max, rain_sum, is_rainy, temp_bin):
        """
        Predict demand level (Low/Medium/High) based on weather.
        """
        # One-hot encode temp_bin
        temp_bin_cold = 1 if temp_bin == "cold" else 0
        temp_bin_mild = 1 if temp_bin == "mild" else 0
        temp_bin_hot = 1 if temp_bin == "hot" else 0

        # Dummy lag features (your model expects them)
        input_df = pd.DataFrame([{
            'temperature_2m_max': temp_max,
            'precipitation_sum': rain_sum,
            'is_rainy': is_rainy,
            'temp_bin_cold': temp_bin_cold,
            'temp_bin_mild': temp_bin_mild,
            'temp_bin_hot': temp_bin_hot,
            'lag1_total_views': 1500,
            'lag2_total_views': 1480,
            'lag7_total_views': 1400,
            'rolling_3day_avg': 1490,
            'rolling_7day_avg': 1450
        }])

        pred = self.model.predict(input_df)[0]
        proba = self.model.predict_proba(input_df)[0].max()
        demand_level = self.encoder.inverse_transform([pred])[0]

        return demand_level, round(proba, 2)