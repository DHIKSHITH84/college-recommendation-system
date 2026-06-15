# Telangana EAPCET College Recommendation System

AI-powered full-stack web application that recommends Telangana engineering colleges based on EAPCET rank, category, and preferences using a Random Forest machine learning model.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Vite, Chart.js, React Router |
| Backend | Python Flask, REST APIs |
| Database | MySQL |
| ML | scikit-learn Random Forest Classifier |

## Project Structure

```
College Recommendation System/
├── backend/                 # Flask API server
│   ├── app.py              # Application entry point
│   ├── config.py           # Configuration
│   ├── requirements.txt    # Python dependencies
│   ├── database/db.py      # MySQL connection
│   ├── models/             # Data access layer
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── ml/                 # ML recommendation engine
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── services/       # API client
│   └── package.json
├── database/
│   ├── schema.sql          # MySQL schema
│   └── sample_data.sql     # Sample college data
└── docs/
    ├── API.md              # API documentation
    └── INSTALLATION.md     # Setup guide
```

## Features

- **AI Recommendations** — Random Forest predicts admission probability
- **Smart Classification** — Safe, Target, and Dream college lists
- **College Search** — Filter by branch, location, fee, category
- **Comparison Tool** — Compare up to 4 colleges side-by-side
- **Charts** — Visual admission probability and classification analytics
- **Student Dashboard** — Profile and quick actions
- **Favorites** — Save and manage preferred colleges

## Quick Start

See [docs/INSTALLATION.md](docs/INSTALLATION.md) for detailed setup instructions.

```bash
# 1. Setup MySQL database
mysql -u root -p < database/schema.sql
mysql -u root -p < database/sample_data.sql

# 2. Start backend
cd backend
pip install -r requirements.txt
copy .env.example .env   # Edit with your MySQL credentials
python app.py

# 3. Start frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

## API Documentation

See [docs/API.md](docs/API.md) for full REST API reference.

## License

MIT — For educational and project purposes.
