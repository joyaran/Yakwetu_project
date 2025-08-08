<div align="center">
  
# 🌟 YAKWETU™ Climate-Based Variable Pricing Project

</div>

### Project Overview

This project aims to develop a sophisticated, data-driven framework for YAKWETU™ Online Ltd.'s MyMovies.Africa™ platform. The core objective is to understand and leverage the influence of external factors, specifically weather patterns, on user content consumption behavior. By analyzing historical viewing and transaction data in conjunction with climate information, we seek to predict periods of high user engagement. These predictive insights are then used to inform the design of a variable pricing model, enabling the platform to dynamically adjust content prices based on shifting demand signals and environmental conditions. Ultimately, this initiative is designed to support more personalized user experiences, optimize monetization strategies, and strategically align content pricing and scheduling with forecasted demand patterns.

---

### 💡 Business Problem / Problem Statement

YAKWETU™ Online Ltd., through its MyMovies.Africa™ platform, distributes African content globally. As the platform scales, the need for data-driven strategic decisions around pricing and content engagement becomes paramount. Global evidence suggests a strong correlation between weather patterns and user mood, which in turn influences content consumption behavior. Without a mechanism to dynamically respond to these external influences, YAKWETU™ may miss opportunities to maximize revenue during peak demand periods or optimize user engagement during lulls. This project addresses the challenge of creating a flexible, responsive pricing and content strategy that capitalizes on climate-driven demand fluctuations.

---

### 🏆 Project Goals

- **Integrate historical weather data** with platform usage data to create a comprehensive dataset.
- **Identify correlations** between various weather conditions (temperature, precipitation, cloud cover, etc.) and specific content engagement metrics (views, completion rates, transactions).
- **Predict high-demand and low-demand periods** for content consumption using machine learning models.
- **Simulate dynamic pricing strategies** based on forecasted conditions to model potential revenue uplift.
- Provide **actionable recommendations** for optimizing content scheduling, marketing campaigns, and personalized user experiences.

---

### ⚙️ Key Features

- **Weather + Usage Correlation:** Discover how weather affects content views, completion, and transactions.
- **Genre-Level Analysis:** Identify which genres spike during certain weather conditions.
- **Predictive Modeling:** Use machine learning to forecast viewership likelihood based on climate features.
- **Variable Pricing Simulation:** Model how dynamic pricing could boost revenue on high-demand days.

---

### 📊 Data Sources

This project leverages two primary data sources:

#### 1. Platform Usage Data:
- **Source:** Existing internal MySQL databases for views, purchases (transactions), users, content, and countries. These were provided as `.sql` dump files.
- **Processing:** The raw MySQL dumps were imported into a `working_db` database in MySQL Workbench. Key tables (`views`, `purchases`, `content`, `users`, `countries`) were pre-merged within MySQL Workbench into a unified `combined_user_activity` table to streamline data access.

#### 2. Weather Data:
- **Source:** Historical climate data obtained from **Open-Meteo**.
- **Format:** Provided as a `.CSV` file (`weather_data.csv`).
- **Content:** Includes daily weather parameters such as `temperature_2m_max`, `precipitation_sum`, `is_rainy`, `weathercode`, etc.
- **Granularity:** Daily weather data, merged with user activity records based on date and location.

---

### 🛠️ Tools & Technologies

- **Programming Language:** Python
- **Data Manipulation & Analysis:** `pandas`, `numpy`
- **Database Connectivity:** `mysql-connector-python`
- **Machine Learning:** `scikit-learn` (XGBoost), `prophet` (for time-series forecasting)
- **Data Visualization:** `seaborn`, `matplotlib`
- **Database Management:** MySQL Workbench
- **Integrated Development Environment (IDE):** Visual Studio Code (VS Code)
- **Environment Management:** `conda` (Anaconda/Miniconda)

---

### 📁 Directory Structure

The project is organized into several key folders and files to maintain clarity and ease of navigation:

```
Yakwetu_project/
├── .idea/                          # PyCharm IDE configuration files
├── .ipynb_checkpoints/            # Jupyter Notebook checkpoint files
├── data/
│   ├── combined_user_activity.csv
│   ├── weather_data.csv
│   └── yakwetu_data.db
├── dump/
│   ├── working_db_combined_user_activity.sql
│   ├── working_db_content.sql
│   ├── working_db_countries.sql
│   ├── working_db_purchases_full_data.sql
│   ├── working_db_purchases_with_content.sql
│   ├── working_db_purchases.sql
│   ├── working_db_users.sql
│   ├── working_db_views_full_data.sql
│   └── working_db_views.sql
├── logs/
│   └── ip_errors.log               # Error logs from IPython/Jupyter sessions
├── notebooks/
│   ├── .ipynb_checkpoints/
│   ├── prophet_xgboost_model.ipynb
│   ├── xgboost_demand_model.pkl
│   ├── yakwetu_demand_forecast_with_predictions.csv
│   ├── yakwetu_demand_forecast.csv
│   └── yakwetu_model.ipynb
├── PDFs/
│   └── 150725_Confidential_YAKWETU_Climate-Based_Variable_Pricing_Project.pdf
├── SQL_Files/
│   ├── updates.sql
│   └── yakwetu_merging.sql
├── weather_demand_api/
│   ├── __pycache__/
│   ├── dynamic_pricing.py
│   ├── label_encoder.pkl
│   ├── main.py
│   ├── model.py
│   ├── requirements.txt
│   └── yakwetu_model.pkl
├── README.md                       # Project documentation
└── requirements.txt                # Python dependencies
```

---

### 🚀 Setup & Installation

To set up and run this project, follow these steps:

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Yakwetu_project.git
cd Yakwetu_project
```

#### 2. Install Dependencies
Ensure you have `conda` installed. Then, create and activate a new environment:
```bash
conda create -n yakwetu_env python=3.9
conda activate yakwetu_env
pip install -r requirements.txt
```

#### 3. Database Setup
- Import the `.sql` dump files into a MySQL database named `working_db`.
- Merge the necessary tables into a unified `combined_user_activity` table in MySQL Workbench.

#### 4. Run Notebooks
- Open `notebooks/yakwetu_model.ipynb` and `notebooks/prophet_xgboost_model.ipynb` in Jupyter Notebook or VS Code.
- Follow the instructions in the notebooks to load data, train models, and generate forecasts.

---

### 🧮 Modeling Process

1. **Data Preparation:**
   - Cleaned and aggregated daily country-level data.
   - Defined demand levels (`Low`, `Medium`, `High`) based on total daily views.
   - Used only forecastable features (e.g., temperature, precipitation, lagged views).

2. **Initial XGBoost Model:**
   - Achieved an accuracy of **~99.9%** due to **data leakage**.
   - Corrected by removing post-engagement metrics like `view_minutes`.

3. **Leakage-Free XGBoost Model:**
   - Achieved an accuracy of **~45%** after fixing leakage.
   - Improved to **77.9%** with feature engineering and hyperparameter tuning.

4. **Prophet Time-Series Forecast:**
   - Captured long-term trends, seasonality, and holidays.
   - Generated forecasts for future periods.

5. **Hybrid Forecast:**
   - Adjusted Prophet’s baseline forecast using XGBoost’s demand-level predictions.
   - Combined trend forecasting with weather-driven classification.

6. **Dynamic Pricing Simulation:**
   - Applied price adjustments based on predicted demand levels.
   - Measured the impact on revenue.

7. **Export and Save:**
   - Exported final predictions for dashboarding.
   - Saved trained models for future use.

---

### 📊 Results & Insights

- **Final Model Performance:**
  - **XGBoost Classification Model:** Accuracy = **77.9%**
  - **Prophet Time-Series Model:** MAE = 28.91, RMSE = 137.61
  - **Hybrid Model:** Improved demand forecasting by combining Prophet’s long-term trend capabilities with XGBoost’s ability to capture non-linear weather patterns.

- **Feature Importance:**
  - Top features included:
    - `temperature_2m_max`
    - `precipitation_sum`
    - `is_rainy`
    - `rolling_7day_avg`

- **Dynamic Pricing Impact:**
  - Simulated **+11.5% revenue uplift** compared to fixed pricing.
  - Statistically significant results confirmed via A/B test simulation.

---

### 💰 Dynamic Pricing Simulation

The dynamic pricing logic adjusts content prices based on real-time demand drivers:
- **Demand-Based Adjustment:**
  - +20% for High demand
  - -10% for Low demand
- **Weather Conditions:**
  - Rainy day pricing boost
  - Cold weather adjustment
- **Day of the Week:**
  - More weight on weekends

This strategy ensures prices align with real-time demand drivers, maximizing revenue while improving customer satisfaction.

---

### 🌐 Deployment & Integration

The final model was deployed to an interactive dashboard: [Live Project](https://yakwetu-weather-dynamic-project.vercel.app/)
- **Real-Time Weather Integration:** Pulls current climate conditions and uses them to forecast demand and price dynamically.
- **7-Day Forecast Table:** Lists predicted weather, temperature, demand classification, and final price.
- **Hybrid Forecast Visuals:**
  - XGBoost demand bar charts
  - Prophet time series predictions
- **Dynamic Pricing Strategy Panel:** Visualizes pricing variation vs. base price.


### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### 📖 References

- **Open-Meteo API:** [https://open-meteo.com](https://open-meteo.com)
- **Prophet Documentation:** [https://facebook.github.io/prophet](https://facebook.github.io/prophet)
- **XGBoost Documentation:** [https://xgboost.readthedocs.io](https://xgboost.readthedocs.io)

---
