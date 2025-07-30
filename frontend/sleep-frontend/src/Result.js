import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <div>No result to show 😢</div>;
  }

  return (
  <div style={styles.container}>
    <h1 style={styles.title}>😴 Sleep Analysis Result</h1>
    
    <p><strong>🌟 Predicted Sleep Quality:</strong> {result.prediction}</p>
    <p><strong>📊 Sleep Efficiency:</strong> {result.sleep_efficiency}</p>
    <p><strong>🕐 Total Sleep Hours:</strong> {result.total_sleep_hours}</p>
    <p><strong>🔍 Analysis:</strong> {result.analysis}</p>
    <p><strong>⚠️ Reasons:</strong> {result.reasons}</p>
    <p><strong>💡 Suggestions:</strong> {result.suggestions}</p>
  </div>
);

};

const styles = {
  container: {
    margin: '40px auto',
    padding: '30px',
    borderRadius: '20px',
    maxWidth: '500px',
    backgroundColor: '#f0f8ff',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    lineHeight: '1.6',
  },
  title: {
    textAlign: 'center',
    fontSize: '26px',
    marginBottom: '20px',
    color: '#333',
  }
};

export default Result;
