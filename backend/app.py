from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import mysql.connector

app = Flask(__name__)
CORS(app)

# ✅ Load the ML model
model = joblib.load('sleep_model.pkl')
label_map = {0: 'Poor', 1: 'Average', 2: 'Good'}

# ✅ Connect to MySQL Database
db = mysql.connector.connect(
    host="localhost",
    user="root",        # change if your MySQL user is different
    password="1692005", # put your MySQL password here
    database="sleepdb"
)
cursor = db.cursor()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("📦 Data received from frontend:", data)

        # ✅ Extract input values (keys must match frontend form.js)
        sleep_hours = float(data.get('sleepDuration', 0))
        caffeine = float(data.get('caffeineIntakes', 0))
        screen_time = float(data.get('screenTime', 0))
        stress_level = float(data.get('stressLevel', 0))
        sleep_quality = int(data.get('sleepQuality', 0))  # user self-rating
        mood = data.get('moodBeforeSleep', '')

        wake_time = 7
        bed_time = 11

        # ✅ ML Prediction
        input_features = [[sleep_hours, bed_time, wake_time, caffeine, screen_time, stress_level]]
        prediction_num = model.predict(input_features)[0]
        prediction_label = label_map[prediction_num]

        # 🔒 Override prediction with simple realistic rules
        if sleep_hours < 6:
            prediction_label = "Poor"
        elif 6 <= sleep_hours < 8:
            prediction_label = "Average"
        else:
            prediction_label = "Good"

        # ✅ Reasons and suggestions
        reasons = []
        suggestions = []

        if sleep_hours < 6:
            reasons.append("Sleep duration is too short")
            suggestions.append("Try to sleep at least 7-8 hours regularly.")
        if screen_time > 60:
            reasons.append("High screen time before bed")
            suggestions.append("Reduce screen time before sleep for better rest.")
        if stress_level > 7:
            reasons.append("You reported high stress levels")
            suggestions.append("Practice relaxation techniques like meditation or deep breathing.")
        if caffeine > 5:
            reasons.append("Too much caffeine intake")
            suggestions.append("Reduce caffeine, especially in the evening.")

        reason_text = "; ".join(reasons) if reasons else "No major issues detected."
        suggestion_text = "\n".join(suggestions) if suggestions else "Keep up the good sleep habits!"

        # ✅ Sleep efficiency
        if bed_time > wake_time:
            time_in_bed = (24 - bed_time) + wake_time
        else:
            time_in_bed = wake_time - bed_time

        sleep_efficiency = round((sleep_hours / time_in_bed) * 100, 2) if time_in_bed > 0 else 0
        analysis_text = f"You slept for {sleep_hours} hours out of {time_in_bed} hours in bed."

        # ✅ Save results in MySQL database
        cursor.execute("""
            INSERT INTO sleep_data 
            (caffeine_intake, sleep_duration, sleep_quality, stress_level, screen_time, mood, prediction, sleep_efficiency, analysis, suggestions)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            caffeine, sleep_hours, sleep_quality, stress_level, screen_time,
            mood, prediction_label, f"{sleep_efficiency}%", analysis_text, suggestion_text
        ))
        db.commit()

        # ✅ Send response back to frontend
        return jsonify({
            'prediction': prediction_label,
            'reasons': reason_text,
            'suggestions': suggestion_text,
            'sleep_efficiency': f"{sleep_efficiency}%",
            'total_sleep_hours': f"{sleep_hours} hrs",
            'analysis': analysis_text
        })

    except Exception as e:
        print("❌ Backend error:", str(e))
        return jsonify({'prediction': 'Error occurred while predicting.'}), 500
  

if __name__ == '__main__':
    app.run(debug=True)
