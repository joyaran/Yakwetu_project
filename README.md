# YAKWETUT™ Climate-Based Variable Pricing Project

## Project Overview

This project aims to develop a climate-driven analytics framework for YAKWETUT™. The core idea is to analyze how weather patterns influence user content consumption behavior and to predict periods of high engagement. These insights will then inform the design of a variable pricing model, allowing the platform to dynamically adjust content prices based on shifting demand signals and external factors like weather conditions.

Ultimately, this project seeks to support more personalized user experiences and optimize monetization strategies by aligning content pricing and scheduling with forecasted demand patterns.

## Project Goals

* **Integrate historical weather data** with platform usage data.
* **Identify correlations** between weather conditions and content engagement.
* **Predict high-demand and low-demand periods** using machine learning.
* **Simulate pricing strategies** based on forecasted conditions.
* Provide **actionable recommendations** for content scheduling and marketing.

## Data Sources

This project leverages two primary data sources:

1.  **Platform Usage Data:**
    * **Source:** Existing internal MySQL databases for views, transactions, and content completions, provided as `.sql` dump files.
    * **Files:** Located in the `data/` directory:
        * `working_db_content.sql`
        * `working_db_countries.sql`
        * `working_db_purchases.sql`
        * `working_db_routines.sql`
        * `working_db_users.sql`
        * `working_db_views.sql`
    * **Processing:** These MySQL dumps require cleansing and conversion to a single SQLite database (`my_project_data.db`) for easier analysis within Python.

2.  **Weather Data:**
    * **Source:** OpenWeather API and potentially other historical climate datasets.
    * **Granularity:** **Hourly weather data is preferred** to capture fine-grained correlations with user behavior throughout the day, which is crucial for dynamic pricing and time-of-day recommendations.
    * **Acquisition:** This data will need to be fetched and integrated separately.

## Tools & Technologies

* **Programming Language:** Python
* **Data Manipulation & Analysis:** `pandas`, `sqlite3`
* **Machine Learning:** `scikit-learn` (for predictive modeling)
* **Data Visualization:** `seaborn`, `matplotlib`
* **Database:** SQLite (for combined internal data)
* **Business Intelligence:** Power BI (for potential final dashboards/reporting)
* **Version Control:** Git / GitHub

## Repository Structure
