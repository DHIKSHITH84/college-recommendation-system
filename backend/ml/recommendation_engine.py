import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'admission_model.pkl')

CATEGORY_ENCODING = {
    'OC': 0, 'BC-A': 1, 'BC-B': 2, 'BC-C': 3, 'BC-D': 4,
    'BC-E': 5, 'SC': 6, 'ST': 7, 'EWS': 8
}


class AdmissionPredictor:
    def __init__(self):
        self.model = None
        self.is_trained = False

    def _generate_training_data(self, programs):
        """Generate synthetic training data from historical cutoff patterns."""
        rows = []
        for prog in programs:
            cutoff = prog['cutoff_rank']
            category = prog.get('category', 'OC')
            fee = float(prog.get('fee_per_year', 100000))
            placement = float(prog.get('placement_percentage', 70))
            seats = int(prog.get('seats_available', 60))

            for rank in range(max(1, cutoff - 5000), cutoff + 8000, 200):
                rank_diff = cutoff - rank
                admitted = 1 if rank <= cutoff else 0

                if rank <= cutoff * 0.5:
                    admitted = 1
                elif rank <= cutoff:
                    admitted = 1 if np.random.random() > 0.1 else 0
                elif rank <= cutoff * 1.3:
                    admitted = 1 if np.random.random() > 0.7 else 0
                else:
                    admitted = 0

                rows.append({
                    'student_rank': rank,
                    'cutoff_rank': cutoff,
                    'rank_difference': rank_diff,
                    'category_encoded': CATEGORY_ENCODING.get(category, 0),
                    'fee_per_year': fee,
                    'placement_percentage': placement,
                    'seats_available': seats,
                    'rank_ratio': rank / max(cutoff, 1),
                    'admitted': admitted,
                })

        return pd.DataFrame(rows)

    def train(self, programs):
        if not programs:
            return False

        df = self._generate_training_data(programs)
        if len(df) < 50:
            return False

        features = [
            'student_rank', 'cutoff_rank', 'rank_difference',
            'category_encoded', 'fee_per_year', 'placement_percentage',
            'seats_available', 'rank_ratio'
        ]
        X = df[features]
        y = df['admitted']

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            n_jobs=-1
        )
        self.model.fit(X_train, y_train)
        self.is_trained = True

        joblib.dump(self.model, MODEL_PATH)
        return True

    def load_model(self):
        if os.path.exists(MODEL_PATH):
            self.model = joblib.load(MODEL_PATH)
            self.is_trained = True
            return True
        return False

    def predict_probability(self, student_rank, program):
        if not self.is_trained or self.model is None:
            return self._rule_based_probability(student_rank, program)

        cutoff = program['cutoff_rank']
        category = program.get('category', 'OC')
        fee = float(program.get('fee_per_year', 100000))
        placement = float(program.get('placement_percentage', 70))
        seats = int(program.get('seats_available', 60))

        features = np.array([[
            student_rank,
            cutoff,
            cutoff - student_rank,
            CATEGORY_ENCODING.get(category, 0),
            fee,
            placement,
            seats,
            student_rank / max(cutoff, 1),
        ]])

        prob = self.model.predict_proba(features)[0][1]
        return round(float(prob) * 100, 2)

    def _rule_based_probability(self, student_rank, program):
        cutoff = program['cutoff_rank']
        ratio = student_rank / max(cutoff, 1)

        if student_rank <= cutoff * 0.7:
            prob = 95 - (ratio * 10)
        elif student_rank <= cutoff:
            prob = 85 - ((ratio - 0.7) * 50)
        elif student_rank <= cutoff * 1.2:
            prob = 50 - ((ratio - 1) * 100)
        elif student_rank <= cutoff * 1.5:
            prob = 25 - ((ratio - 1.2) * 50)
        else:
            prob = max(5, 15 - (ratio - 1.5) * 10)

        return round(max(1, min(99, prob)), 2)

    def classify(self, probability):
        if probability >= 70:
            return 'Safe'
        elif probability >= 40:
            return 'Target'
        return 'Dream'


_predictor = None


def get_predictor():
    global _predictor
    if _predictor is None:
        _predictor = AdmissionPredictor()
        _predictor.load_model()
    return _predictor
