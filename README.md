# YAKWETU™ Climate-Based Variable Pricing Project

## Project Overview

This project aims to develop a sophisticated, data-driven framework for YAKWETU™ Online Ltd.'s MyMovies.Africa™ platform. The core objective is to understand and leverage the influence of external factors, specifically weather patterns, on user content consumption behavior. By analyzing historical viewing and transaction data in conjunction with climate information, we seek to predict periods of high user engagement. These predictive insights are then used to inform the design of a variable pricing model, enabling the platform to dynamically adjust content prices based on shifting demand signals and environmental conditions. Ultimately, this initiative is designed to support more personalized user experiences, optimize monetization strategies, and strategically align content pricing and scheduling with forecasted demand patterns.

## Business Problem / Problem Statement

YAKWETU™ Online Ltd., through its MyMovies.Africa™ platform, distributes African content globally. As the platform scales, the need for data-driven strategic decisions around pricing and content engagement becomes paramount. Global evidence suggests a strong correlation between weather patterns and user mood, which in turn influences content consumption behavior. Without a mechanism to dynamically respond to these external influences, YAKWETUT™ may miss opportunities to maximize revenue during peak demand periods or optimize user engagement during lulls. This project addresses the challenge of creating a flexible, responsive pricing and content strategy that capitalizes on climate-driven demand fluctuations.

## Project Goals

* **Integrate historical weather data** with platform usage data to create a comprehensive dataset.

* **Identify correlations** between various weather conditions (temperature, precipitation, cloud cover, etc.) and specific content engagement metrics (views, completion rates, transactions).

* **Predict high-demand and low-demand periods** for content consumption using machine learning models.

* **Simulate dynamic pricing strategies** based on these forecasted conditions to model potential revenue uplift.

* Provide **actionable recommendations** for optimizing content scheduling, marketing campaigns, and personalized user experiences.

## Key Features

* **Weather + Usage Correlation:** Discover how weather affects content views, completion, and transactions.

* **Genre-Level Analysis:** Identify which genres spike during certain weather conditions.

* **Predictive Modeling:** Use machine learning to forecast viewership likelihood based on climate features.

* **Variable Pricing Simulation:** Model how dynamic pricing could boost revenue on high-demand days.

## Data Sources

This project leverages two primary data sources:

1.  **Platform Usage Data:**

    * **Source:** Existing internal MySQL databases for views, purchases (transactions), users, content, and countries. These were provided as `.sql` dump files.

    * **Processing:** The raw MySQL dumps were imported into a `working_db` database in MySQL Workbench. Key tables (`views`, `purchases`, `content`, `users`, `countries`) were then pre-merged within MySQL Workbench into a unified `combined_user_activity` table to streamline data access and reduce processing overhead in Python.

    * **Database Credentials (for local setup):**

        * Host: `localhost`

        * Port: `3306`

        * User: `root`

        * Password: ``

        * Database: `working_db`

2.  **Weather Data:**

    * **Source:** Historical climate data obtained from **Open-Meteo**.

    * **Format:** Provided as a `.CSV` file (`weather_data.CSV`).

    * **Content:** This dataset includes daily weather parameters such as `temperature_2m` (max/min), `relative_humidity_2m`, `dew_point_2m`, `apparent_temperature`, `precipitation`, `rain`, `weathercode`, `pressure_msl`, `cloudcover`, and `windspeeed_10m`. These parameters are crucial for understanding the environmental context of user activity.

    * **Granularity:** Daily weather data, which will be merged with user activity records based on date and location.

## Tools & Technologies

* **Programming Language:** Python

* **Data Manipulation & Analysis:** `pandas`

* **Database Connectivity:** `mysql-connector-python`

* **Machine Learning:** `scikit-learn` (for predictive modeling)

* **Data Visualization:** `seaborn`, `matplotlib` (recommended for future steps)

* **Database Management:** MySQL Workbench

* **Integrated Development Environment (IDE):** Visual Studio Code (VS Code) with Python extension (for robust development and debugging).

* **Environment Management:** `conda` (Anaconda/Miniconda) for creating isolated Python environments.

## Project Setup & How to Run

To set up and run this project, follow these steps sequentially:

### 1. Database Setup (MySQL Workbench)

* **Import SQL Dumps:** Ensure you have MySQL Server and MySQL Workbench installed. Import the provided `.sql` dump files (`working_db_content.sql`, `working_db_users.sql`, `working_db_views.sql`, `working_db_purchases.sql`, `working_db_countries.sql`, etc.) into a new database named `working_db` in your MySQL Workbench.

* **Run Merge Scripts:** Execute the SQL scripts in MySQL Workbench to create the combined tables. The most important one for this project is `combined_user_activity`, which unifies views and purchases with content and user/country details.

    * *(Refer to the SQL merge scripts provided previously to create `views_with_content`, `purchases_with_content`, `views_full_data`, `purchases_full_data`, and especially `combined_user_activity`.)*

### 2. Python Environment Setup

* **Install Anaconda/Miniconda:** If you don't have it, download and install Miniconda (recommended for a lighter setup) or Anaconda from their official website.

* **Set PowerShell Execution Policy:** This is crucial for `conda` environment activation on Windows.

    1.  Close all PowerShell windows.

    2.  Open **Windows PowerShell as Administrator**.

    3.  Run: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` (type `Y` to confirm).

    4.  Close the Administrator PowerShell window.

* **Create a New Project Folder:** Create an empty folder for your project (e.g., `C:\Users\biggm\OneDrive\Desktop\ClimatePricingProject`). Inside this, create a `data` subfolder for your CSVs.

* **Create & Activate Conda Environment:**

    1.  Open a **NEW, REGULAR PowerShell window** (not as administrator).

    2.  Navigate to your project folder: `cd C:\Users\biggm\OneDrive\Desktop\ClimatePricingProject`

    3.  Initialize Conda for PowerShell (if you haven't done this before): `conda init powershell` (then close and reopen PowerShell).

    4.  Create the environment: `conda create -n climate_env python=3.9` (or desired Python version).

    5.  Activate the environment: `conda activate climate_env` (you should see `(climate_env)` in your prompt).

* **Install Python Libraries:** While `climate_env` is active in your PowerShell, install the necessary libraries:

    ```bash
    pip install mysql-connector-python pandas matplotlib seaborn scikit-learn
    ```

    * *(Note: `requests` and `geopy` are not needed for weather data from CSVs.)*

### 3. Running the Analysis in VS Code

* **Open Project in VS Code:** From your **activated `climate_env` PowerShell window**, type `code .` to open VS Code in your project directory.

* **Select Python Interpreter:** In VS Code, ensure the correct Python interpreter (your `climate_env`) is selected. Look at the bottom-left corner of VS Code; click it and choose `Python 3.9.x ('climate_env': conda)`.

* **Place Weather CSV:** Ensure your `weather_data.CSV` file is placed in the `data` subfolder within your `ClimatePricingProject` directory (i.e., `C:\Users\biggm\OneDrive\Desktop\ClimatePricingProject\data\weather_data.CSV`).

* **Open/Create Jupyter Notebook:**

    1.  Create a new Jupyter Notebook (`.ipynb` file) in VS Code.

    2.  Copy and paste the provided Python code (from the previous conversation, separated into logical cells) into your notebook.

    3.  Run cells sequentially.

## Deliverables

* **Discovery:** Literature review and EDA of weather + viewing data.

* **Setup:** Source weather data and clean platform logs (completed by loading and merging data).

* **Modeling:** Develop a predictive model to forecast content demand.

* **Simulation:** Test pricing simulations under different weather scenarios.

* **Handover:** Present findings, model results, documentation, and strategic next steps.

## Repository Structure
