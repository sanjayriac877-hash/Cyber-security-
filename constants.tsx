
import { ModelMetric, FeatureImportance } from './types';

export const MODEL_METRICS: ModelMetric[] = [
  { name: 'Logistic Regression', accuracy: 0.88, precision: 0.87, recall: 0.89, f1: 0.88 },
  { name: 'Random Forest', accuracy: 0.94, precision: 0.95, recall: 0.93, f1: 0.94 },
  { name: 'SVM', accuracy: 0.91, precision: 0.92, recall: 0.90, f1: 0.91 }
];

export const FEATURE_IMPORTANCES: FeatureImportance[] = [
  { feature: 'HTTPS Presence', importance: 0.35 },
  { feature: 'URL Length', importance: 0.22 },
  { feature: 'Dots Count', importance: 0.18 },
  { feature: 'Suspicious Char (@)', importance: 0.12 },
  { feature: 'Subdomains', importance: 0.08 },
  { feature: 'IP Usage', importance: 0.05 }
];

export const PYTHON_CODE_SNIPPETS = {
  data_loading: `import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv('phishing_dataset.csv')

# Basic cleaning
df.dropna(inplace=True)
print(f"Dataset loaded with {len(df)} rows.")`,

  feature_extraction: `import re
from urllib.parse import urlparse

def extract_features(url):
    features = {}
    features['length'] = len(url)
    features['dots'] = url.count('.')
    features['has_at'] = 1 if '@' in url else 0
    features['has_hyphen'] = 1 if '-' in url else 0
    features['has_double_slash'] = 1 if '//' in url[8:] else 0
    features['is_https'] = 1 if url.startswith('https') else 0
    
    # Check for IP address in domain
    domain = urlparse(url).netloc
    features['is_ip'] = 1 if re.match(r'^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$', domain) else 0
    
    return features`,

  model_training: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import job_lib

# Split data
X = df.drop('label', axis=1)
y = df['label']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train Random Forest
rf = RandomForestClassifier(n_estimators=100)
rf.fit(X_train, y_train)

# Save model
joblib.dump(rf, 'phishing_detector_rf.pkl')`,

  flask_app: `from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('phishing_detector_rf.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    url = request.json['url']
    features = extract_features(url)
    prediction = model.predict([list(features.values())])
    return jsonify({'phishing': bool(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)`
};
