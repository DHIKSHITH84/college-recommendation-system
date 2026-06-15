import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask
from flask_cors import CORS
from routes.college_routes import colleges_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.register_blueprint(colleges_bp, url_prefix='/api')

    @app.route('/')
    def index():
        return {
            'message': 'Telangana EAPCET College Recommendation API',
            'version': '1.0.0',
            'endpoints': '/api/health, /api/colleges, /api/recommend',
        }

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
