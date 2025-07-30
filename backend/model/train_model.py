def predict_sleep_quality(data):
    # Dummy calculation
    hours = data.get("hours", 7)
    interruptions = data.get("interruptions", 2)
    
    # Dummy logic: sleep quality = 100 - (interruptions * 10) + (hours * 5)
    score = 100 - (interruptions * 10) + (hours * 5)
    
    # Clamp between 0–100
    score = max(0, min(100, score))
    
    recommendation = "Great job!" if score > 80 else "Try to improve sleep consistency."
    
    return {
        "predicted_quality": round(score, 2),
        "recommendation": recommendation
    }
