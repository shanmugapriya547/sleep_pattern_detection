import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const SleepForm = () => {
  const [formData, setFormData] = useState({
    
    caffeineIntakes: '',
    sleepQuality: '',
    stressLevel: '',
    screenTime: '',
    sleepDuration: '',
    moodBeforeSleep: 'Neutral',
  });

  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,                 // ✅ Send user name to backend
          caffeineIntake: formData.caffeineIntakes,
          sleepDuration: formData.sleepDuration,
          sleepQuality: formData.sleepQuality,
          stressLevel: formData.stressLevel,
          screenTime: formData.screenTime,
          mood: formData.moodBeforeSleep,
        }),
      });

      const data = await response.json();
      setResult(data); 
      navigate("/result", { state: { result: data } });

      console.log("✔️ Backend Response:", data);
    } catch (error) {
      console.error("❌ Error submitting data:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Sleep Pattern Detection</h2>
      <form onSubmit={handleSubmit}>

        

        <div className="input-group">
          <label>Number of Caffeine Intakes:</label>
          <input
            type="number"
            name="caffeineIntakes"
            value={formData.caffeineIntakes}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Sleep Quality (1-10):</label>
          <input
            type="number"
            name="sleepQuality"
            value={formData.sleepQuality}
            onChange={handleChange}
          />
          <small style={{ fontSize: "12px", color: "gray" }}>
            1 = very poor sleep, 10 = excellent sleep (based on how you felt)
          </small>
        </div>

        <div className="input-group">
          <label>Stress Level (1 to 10):</label>
          <input
            type="number"
            name="stressLevel"
            min="1"
            max="10"
            placeholder="e.g., 5 for moderate stress"
            value={formData.stressLevel}
            onChange={handleChange}
          />
          <small style={{ fontSize: "12px", color: "gray" }}>
            1 = very calm, 10 = extremely stressed
          </small>
        </div>

        <div className="input-group">
          <label>Screen Time Before Bed (minutes):</label>
          <input
            type="number"
            name="screenTime"
            value={formData.screenTime}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Sleep Duration (hours):</label>
          <input
            type="number"
            name="sleepDuration"
            placeholder="e.g., 7.5 for 7 hours 30 minutes"
            value={formData.sleepDuration}
            onChange={handleChange}
            step="0.1"
            min="0"
          />
        </div>

        <div className="input-group">
          <label>Mood Before Sleep:</label>
          <select
            name="moodBeforeSleep"
            value={formData.moodBeforeSleep}
            onChange={handleChange}
          >
            <option value="Happy">Happy</option>
            <option value="Neutral">Neutral</option>
            <option value="Sad">Sad</option>
            <option value="Anxious">Anxious</option>
          </select>
        </div>

        <button type="submit">Submit Data</button>
      </form>

      {/* Show Results below if result is available */}
      {result && (
        <div style={{ marginTop: "20px", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "10px" }}>
          <h3>Predicted Sleep Quality: {result.prediction}</h3>
          <p><strong>Why?</strong> {result.reasons}</p>
          <p><strong>Suggestions:</strong> {result.suggestions}</p>
        </div>
      )}

    </div>
  );
};

export default SleepForm;
