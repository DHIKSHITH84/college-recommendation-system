-- Telangana EAPCET College Recommendation System
-- MySQL Database Schema

CREATE DATABASE IF NOT EXISTS eapcet_colleges;
USE eapcet_colleges;

-- Colleges master table
CREATE TABLE IF NOT EXISTS colleges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_code VARCHAR(20) NOT NULL UNIQUE,
    college_name VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    college_type ENUM('Government', 'Private', 'Autonomous') DEFAULT 'Private',
    accreditation VARCHAR(50) DEFAULT 'NAAC A',
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Branch-wise cutoff and fee data
CREATE TABLE IF NOT EXISTS college_programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_id INT NOT NULL,
    branch VARCHAR(100) NOT NULL,
    category ENUM('OC', 'BC-A', 'BC-B', 'BC-C', 'BC-D', 'BC-E', 'SC', 'ST', 'EWS') NOT NULL,
    cutoff_rank INT NOT NULL,
    fee_per_year DECIMAL(10, 2) NOT NULL,
    placement_percentage DECIMAL(5, 2) DEFAULT 0,
    seats_available INT DEFAULT 60,
    year INT DEFAULT 2024,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
    INDEX idx_branch (branch),
    INDEX idx_category (category),
    INDEX idx_cutoff (cutoff_rank)
);

-- Student profiles for dashboard
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    eapcet_rank INT NOT NULL,
    category ENUM('OC', 'BC-A', 'BC-B', 'BC-C', 'BC-D', 'BC-E', 'SC', 'ST', 'EWS') NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    preferred_branch VARCHAR(100),
    preferred_location VARCHAR(100),
    max_budget DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorite colleges
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    college_program_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (college_program_id) REFERENCES college_programs(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (student_id, college_program_id)
);

-- Recommendation history
CREATE TABLE IF NOT EXISTS recommendation_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    college_program_id INT NOT NULL,
    probability_score DECIMAL(5, 2) NOT NULL,
    classification ENUM('Safe', 'Target', 'Dream') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (college_program_id) REFERENCES college_programs(id) ON DELETE CASCADE
);
