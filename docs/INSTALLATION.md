# Installation Guide

Complete setup instructions for running the Telangana EAPCET College Recommendation System locally using **VS Code** or **Cursor AI**.

---

## Prerequisites

Install the following before starting:

| Software | Version | Download |
|----------|---------|----------|
| Node.js | 18+ | https://nodejs.org |
| Python | 3.9+ | https://python.org |
| MySQL | 8.0+ | https://dev.mysql.com/downloads |
| Git (optional) | Latest | https://git-scm.com |

Verify installations:
```bash
node --version
python --version
mysql --version
```

---

## Step 1: Open Project in VS Code / Cursor

1. Open **VS Code** or **Cursor AI**
2. Go to **File → Open Folder**
3. Select the `College Recommendation System` folder
4. The project will load with `backend/`, `frontend/`, and `database/` folders

---

## Step 2: Setup MySQL Database

### Start MySQL Server

- **Windows:** Start MySQL from Services or XAMPP/WAMP control panel
- **Mac:** `brew services start mysql`
- **Linux:** `sudo systemctl start mysql`

### Create Database and Load Data

Open a terminal in VS Code/Cursor (**Terminal → New Terminal**) and run:

```bash
# Login to MySQL (enter your root password when prompted)
mysql -u root -p

# Inside MySQL shell, or run as one-liners:
```

**Option A — From MySQL shell:**
```sql
SOURCE D:/College Recommendation System/database/schema.sql;
SOURCE D:/College Recommendation System/database/sample_data.sql;
EXIT;
```

**Option B — From terminal (Windows PowerShell):**
```powershell
Get-Content "D:\College Recommendation System\database\schema.sql" | mysql -u root -p
Get-Content "D:\College Recommendation System\database\sample_data.sql" | mysql -u root -p
```

**Option B — From terminal (Mac/Linux):**
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/sample_data.sql
```

Verify:
```sql
USE eapcet_colleges;
SELECT COUNT(*) FROM colleges;
SELECT COUNT(*) FROM college_programs;
```

---

## Step 3: Configure Backend

### Create Python Virtual Environment

```bash
cd backend
python -m venv venv
```

**Activate virtual environment:**
- **Windows PowerShell:** `.\venv\Scripts\Activate.ps1`
- **Windows CMD:** `venv\Scripts\activate.bat`
- **Mac/Linux:** `source venv/bin/activate`

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

```bash
# Copy example env file
copy .env.example .env    # Windows
cp .env.example .env      # Mac/Linux
```

Edit `.env` with your MySQL credentials:
```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DB=eapcet_colleges
MYSQL_PORT=3306
FLASK_ENV=development
SECRET_KEY=your-secret-key
```

### Start Flask Backend

```bash
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
```

Test the API: Open http://localhost:5000/api/health in your browser.

---

## Step 4: Setup Frontend

Open a **new terminal** (keep backend running):

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:3000/
```

---

## Step 5: Use the Application

1. Open **http://localhost:3000** in your browser
2. Click **Get Recommendations** on the home page
3. Fill in your EAPCET rank, category, and preferences
4. View AI-powered Safe, Target, and Dream college lists
5. Explore Search, Compare, Dashboard, and Favorites

---

## Running with Cursor AI

Cursor AI can help you run and debug the project:

1. **Open the project folder** in Cursor
2. Use the integrated terminal for all commands above
3. Ask Cursor to:
   - "Start the Flask backend"
   - "Run npm dev for frontend"
   - "Fix any import errors"
   - "Add more sample college data"

### Recommended Cursor Workflow

```
Terminal 1: cd backend && python app.py
Terminal 2: cd frontend && npm run dev
```

Use **Cursor's AI chat** to troubleshoot errors by pasting terminal output.

---

## Troubleshooting

### MySQL Connection Error
```
Can't connect to MySQL server
```
- Ensure MySQL is running
- Verify credentials in `backend/.env`
- Check if database `eapcet_colleges` exists

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
netstat -ano | findstr :5000    # Windows
lsof -i :5000                   # Mac/Linux

# Or change port in app.py: app.run(port=5001)
```

### CORS / API Not Found
- Ensure backend is running on port 5000
- Frontend proxy is configured in `vite.config.js`
- Check browser console for errors

### ML Model Training
The Random Forest model trains automatically on first recommendation request using cutoff data. The trained model is saved to `backend/ml/admission_model.pkl`.

### Module Import Errors (Python)
Always run Flask from the `backend/` directory:
```bash
cd backend
python app.py
```

---

## Production Build

```bash
# Frontend production build
cd frontend
npm run build

# Serve with a static server or configure Flask to serve dist/
```

---

## Project Ports

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |
