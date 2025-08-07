# api/dynamic_pricing.py

def get_price_multiplier(demand_level):
    """
    Return price multiplier based on predicted demand.
    """
    multipliers = {
        "Low": 0.9,
        "Medium": 1.0,
        "High": 1.2
    }
    return multipliers.get(demand_level, 1.0)

def recommend_genres(is_rainy, temperature_bin):
    """
    Recommend genres based on weather.
    Matches your notebook logic.
    """
    if is_rainy:
        if temperature_bin == "cold":
            return ["Drama", "Romance", "Chick Flick"]
        elif temperature_bin == "mild":
            return ["Drama", "Romantic Comedy", "Family"]
        else:
            return ["Comedy", "Short & Sweet", "Kenyan Favourites"]
    else:
        if temperature_bin == "cold":
            return ["Action", "Thriller", "Crime"]
        elif temperature_bin == "mild":
            return ["Action", "Adventure", "Movies by Women"]
        else:
            return ["Sports", "Reality", "Documentary"]

def recommend_purchase_types(demand_level, is_rainy):
    if demand_level == "High" and is_rainy:
        return ["PVOD", "RENTAL", "EST"]
    elif demand_level == "High":
        return ["RENTAL", "SVOD"]
    else:
        return ["RENTAL", "View"]