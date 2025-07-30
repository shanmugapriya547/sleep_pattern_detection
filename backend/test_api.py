import requests

url = "http://127.0.0.1:5000/predict"
data = {
    "hours": 6.5,
    "interruptions": 3
}

response = requests.post(url, json=data)
print("Prediction Response:", response.json())
