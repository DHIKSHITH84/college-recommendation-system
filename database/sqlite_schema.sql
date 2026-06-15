-- SQLite schema for local development (USE_SQLITE=true)

CREATE TABLE IF NOT EXISTS colleges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    college_code TEXT NOT NULL UNIQUE,
    college_name TEXT NOT NULL,
    location TEXT NOT NULL,
    college_type TEXT DEFAULT 'Private',
    accreditation TEXT DEFAULT 'NAAC A',
    website TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS college_programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    college_id INTEGER NOT NULL,
    branch TEXT NOT NULL,
    category TEXT NOT NULL,
    cutoff_rank INTEGER NOT NULL,
    fee_per_year REAL NOT NULL,
    placement_percentage REAL DEFAULT 0,
    seats_available INTEGER DEFAULT 60,
    year INTEGER DEFAULT 2024,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    eapcet_rank INTEGER NOT NULL,
    category TEXT NOT NULL,
    gender TEXT NOT NULL,
    preferred_branch TEXT,
    preferred_location TEXT,
    max_budget REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    college_program_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (college_program_id) REFERENCES college_programs(id) ON DELETE CASCADE,
    UNIQUE (student_id, college_program_id)
);

CREATE TABLE IF NOT EXISTS recommendation_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    college_program_id INTEGER NOT NULL,
    probability_score REAL NOT NULL,
    classification TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (college_program_id) REFERENCES college_programs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_branch ON college_programs(branch);
CREATE INDEX IF NOT EXISTS idx_category ON college_programs(category);
CREATE INDEX IF NOT EXISTS idx_cutoff ON college_programs(cutoff_rank);
