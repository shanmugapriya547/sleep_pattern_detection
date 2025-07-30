import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# ✅ Create a bigger balanced dataset
data = {
    'hours_slept': [
        3, 3.5, 4, 4.2, 4.5, 5, 5.3, 5.5, 6, 6.2, 6.5, 6.8, 7, 7.4, 7.5, 8, 8.1, 8.5, 9, 9.3, 9.5, 10
    ],
    'bed_time': [
        11, 11, 12, 12, 1, 11, 10, 9, 10, 10, 11, 10, 9, 9, 10, 9, 9, 10, 8, 8, 9, 9
    ],
    'wake_time': [
        6, 7, 6, 7, 8, 6, 7, 7, 7, 8, 7, 8, 7, 8, 8, 8, 8, 8, 7, 8, 8, 8
    ],
    'caffeine': [
        3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    'screen_time': [
        180, 160, 140, 120, 100, 100, 90, 80, 80, 70, 70, 60, 50, 50, 40, 30, 30, 20, 15, 15, 15, 15
    ],
    'stress_level': [
        9, 9, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1
    ],
    'sleep_quality': [
        'Poor', 'Poor', 'Poor', 'Poor', 'Poor', 'Poor', 'Poor', 'Average', 'Average', 'Average', 
        'Average', 'Average', 'Average', 'Average', 'Average', 'Good', 'Good', 'Good', 'Good', 'Good', 'Good', 'Good'
    ]
}

df = pd.DataFrame(data)
df['sleep_quality'] = df['sleep_quality'].map({'Poor': 0, 'Average': 1, 'Good': 2})

X = df.drop('sleep_quality', axis=1)
y = df['sleep_quality']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, 'sleep_model.pkl')

print("🎉 Model trained!")
print("Accuracy:", model.score(X_test, y_test))
