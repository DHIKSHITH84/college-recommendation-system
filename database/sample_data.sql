-- Sample Telangana Engineering Colleges Data
USE eapcet_colleges;

INSERT INTO colleges (college_code, college_name, location, college_type, accreditation, website) VALUES
('JNTUH', 'JNTUH College of Engineering Hyderabad', 'Hyderabad', 'Government', 'NAAC A++', 'https://jntuh.ac.in'),
('OUCE', 'Osmania University College of Engineering', 'Hyderabad', 'Government', 'NAAC A', 'https://ou.ac.in'),
('CBIT', 'Chaitanya Bharathi Institute of Technology', 'Hyderabad', 'Private', 'NAAC A+', 'https://cbit.ac.in'),
('VNR', 'VNR Vignana Jyothi Institute of Engineering', 'Hyderabad', 'Private', 'NAAC A+', 'https://vnrvjiet.ac.in'),
('MVSR', 'MVSR Engineering College', 'Hyderabad', 'Private', 'NAAC A', 'https://mvsrec.edu.in'),
('GRIET', 'Gokaraju Rangaraju Institute of Engineering', 'Hyderabad', 'Private', 'NAAC A', 'https://griet.ac.in'),
('SNIST', 'Sreenidhi Institute of Science and Technology', 'Hyderabad', 'Private', 'NAAC A', 'https://sreenidhi.edu.in'),
('KMIT', 'Keshav Memorial Institute of Technology', 'Hyderabad', 'Private', 'NAAC A', 'https://kmit.in'),
('MREC', 'Mahatma Gandhi Institute of Technology', 'Hyderabad', 'Private', 'NAAC A', 'https://mgit.ac.in'),
('CMRIT', 'CMR Institute of Technology', 'Hyderabad', 'Private', 'NAAC A', 'https://cmrit.ac.in'),
('VJIT', 'Vidya Jyothi Institute of Technology', 'Hyderabad', 'Private', 'NAAC B++', 'https://vjit.ac.in'),
('BVRIT', 'BVRIT Hyderabad College of Engineering', 'Hyderabad', 'Private', 'NAAC A', 'https://bvrithyderabad.edu.in'),
('NITW', 'National Institute of Technology Warangal', 'Warangal', 'Government', 'NAAC A++', 'https://nitw.ac.in'),
('KUCE', 'Kakatiya University College of Engineering', 'Warangal', 'Government', 'NAAC A', 'https://kakatiya.ac.in'),
('SRIT', 'SR Engineering College', 'Warangal', 'Private', 'NAAC A', 'https://srecwarangal.ac.in'),
('KITS', 'Kakatiya Institute of Technology and Science', 'Warangal', 'Private', 'NAAC A', 'https://kitsw.ac.in'),
('NITS', 'Nalla Malla Reddy Engineering College', 'Hyderabad', 'Private', 'NAAC B++', 'https://nmrec.edu.in'),
('ACE', 'ACE Engineering College', 'Hyderabad', 'Private', 'NAAC A', 'https://aceec.ac.in'),
('MLRIT', 'MLR Institute of Technology', 'Hyderabad', 'Private', 'NAAC A', 'https://mlrinstitutions.ac.in'),
('SREC', 'Swarna Bharathi Institute of Science and Technology', 'Khammam', 'Private', 'NAAC B++', 'https://srec.ac.in'),
('JNTUK', 'JNTU College of Engineering Kakinada', 'Kakinada', 'Government', 'NAAC A++', 'https://jntuk.edu.in'),
('AUCE', 'Andhra University College of Engineering', 'Visakhapatnam', 'Government', 'NAAC A++', 'https://andhrauniversity.edu.in'),
('GITAM', 'GITAM School of Technology Hyderabad', 'Hyderabad', 'Private', 'NAAC A++', 'https://gitam.edu'),
('IARE', 'Institute of Aeronautical Engineering', 'Hyderabad', 'Private', 'NAAC A', 'https://iare.ac.in'),
('VMEG', 'Vardhaman College of Engineering', 'Hyderabad', 'Private', 'NAAC A', 'https://vardhaman.org');

-- CSE Branch Cutoffs (2024) - Sample data for all categories
-- JNTUH CSE
INSERT INTO college_programs (college_id, branch, category, cutoff_rank, fee_per_year, placement_percentage, seats_available, year) VALUES
(1, 'Computer Science Engineering', 'OC', 850, 35000, 92.5, 120, 2024),
(1, 'Computer Science Engineering', 'BC-A', 1200, 35000, 92.5, 30, 2024),
(1, 'Computer Science Engineering', 'BC-B', 1300, 35000, 92.5, 30, 2024),
(1, 'Computer Science Engineering', 'BC-C', 1400, 35000, 92.5, 15, 2024),
(1, 'Computer Science Engineering', 'BC-D', 1500, 35000, 92.5, 15, 2024),
(1, 'Computer Science Engineering', 'BC-E', 1600, 35000, 92.5, 15, 2024),
(1, 'Computer Science Engineering', 'SC', 3500, 35000, 92.5, 18, 2024),
(1, 'Computer Science Engineering', 'ST', 5000, 35000, 92.5, 9, 2024),
(1, 'Computer Science Engineering', 'EWS', 1100, 35000, 92.5, 12, 2024),
(1, 'Electronics and Communication Engineering', 'OC', 1200, 35000, 88.0, 120, 2024),
(1, 'Electronics and Communication Engineering', 'SC', 4500, 35000, 88.0, 18, 2024),
(1, 'Mechanical Engineering', 'OC', 3500, 35000, 75.0, 60, 2024),
(1, 'Mechanical Engineering', 'SC', 8000, 35000, 75.0, 9, 2024),

-- OUCE CSE
(2, 'Computer Science Engineering', 'OC', 1200, 30000, 90.0, 60, 2024),
(2, 'Computer Science Engineering', 'BC-A', 1800, 30000, 90.0, 15, 2024),
(2, 'Computer Science Engineering', 'SC', 5000, 30000, 90.0, 9, 2024),
(2, 'Computer Science Engineering', 'ST', 7000, 30000, 90.0, 5, 2024),
(2, 'Electronics and Communication Engineering', 'OC', 1800, 30000, 85.0, 60, 2024),
(2, 'Civil Engineering', 'OC', 5000, 30000, 70.0, 60, 2024),

-- CBIT CSE
(3, 'Computer Science Engineering', 'OC', 2500, 135000, 95.0, 180, 2024),
(3, 'Computer Science Engineering', 'BC-A', 3500, 135000, 95.0, 45, 2024),
(3, 'Computer Science Engineering', 'BC-B', 3800, 135000, 95.0, 45, 2024),
(3, 'Computer Science Engineering', 'SC', 8000, 135000, 95.0, 27, 2024),
(3, 'Computer Science Engineering', 'ST', 12000, 135000, 95.0, 14, 2024),
(3, 'Computer Science Engineering', 'EWS', 3200, 135000, 95.0, 18, 2024),
(3, 'Information Technology', 'OC', 3000, 135000, 93.0, 120, 2024),
(3, 'Electronics and Communication Engineering', 'OC', 4000, 135000, 90.0, 120, 2024),
(3, 'Artificial Intelligence and Machine Learning', 'OC', 2800, 145000, 96.0, 60, 2024),

-- VNR CSE
(4, 'Computer Science Engineering', 'OC', 3000, 140000, 94.0, 180, 2024),
(4, 'Computer Science Engineering', 'BC-A', 4200, 140000, 94.0, 45, 2024),
(4, 'Computer Science Engineering', 'SC', 9000, 140000, 94.0, 27, 2024),
(4, 'Computer Science Engineering', 'EWS', 3800, 140000, 94.0, 18, 2024),
(4, 'Electronics and Communication Engineering', 'OC', 4500, 140000, 88.0, 120, 2024),
(4, 'Data Science', 'OC', 3200, 150000, 95.0, 60, 2024),

-- MVSR CSE
(5, 'Computer Science Engineering', 'OC', 5000, 95000, 85.0, 120, 2024),
(5, 'Computer Science Engineering', 'BC-A', 7000, 95000, 85.0, 30, 2024),
(5, 'Computer Science Engineering', 'SC', 15000, 95000, 85.0, 18, 2024),
(5, 'Electronics and Communication Engineering', 'OC', 7000, 95000, 80.0, 120, 2024),
(5, 'Mechanical Engineering', 'OC', 12000, 95000, 72.0, 60, 2024),

-- GRIET CSE
(6, 'Computer Science Engineering', 'OC', 4500, 120000, 88.0, 180, 2024),
(6, 'Computer Science Engineering', 'BC-A', 6500, 120000, 88.0, 45, 2024),
(6, 'Computer Science Engineering', 'SC', 14000, 120000, 88.0, 27, 2024),
(6, 'Information Technology', 'OC', 5500, 120000, 86.0, 120, 2024),
(6, 'Electrical and Electronics Engineering', 'OC', 8000, 120000, 78.0, 60, 2024),

-- SNIST CSE
(7, 'Computer Science Engineering', 'OC', 5500, 110000, 87.0, 180, 2024),
(7, 'Computer Science Engineering', 'BC-A', 7500, 110000, 87.0, 45, 2024),
(7, 'Computer Science Engineering', 'SC', 16000, 110000, 87.0, 27, 2024),
(7, 'Electronics and Communication Engineering', 'OC', 8000, 110000, 82.0, 120, 2024),

-- KMIT CSE
(8, 'Computer Science Engineering', 'OC', 6000, 90000, 84.0, 120, 2024),
(8, 'Computer Science Engineering', 'BC-A', 8500, 90000, 84.0, 30, 2024),
(8, 'Computer Science Engineering', 'SC', 18000, 90000, 84.0, 18, 2024),
(8, 'Information Technology', 'OC', 7000, 90000, 82.0, 60, 2024),

-- MREC CSE
(9, 'Computer Science Engineering', 'OC', 7000, 85000, 82.0, 120, 2024),
(9, 'Computer Science Engineering', 'SC', 20000, 85000, 82.0, 18, 2024),
(9, 'Electronics and Communication Engineering', 'OC', 10000, 85000, 78.0, 120, 2024),

-- CMRIT CSE
(10, 'Computer Science Engineering', 'OC', 8000, 100000, 80.0, 180, 2024),
(10, 'Computer Science Engineering', 'BC-A', 11000, 100000, 80.0, 45, 2024),
(10, 'Computer Science Engineering', 'SC', 22000, 100000, 80.0, 27, 2024),
(10, 'Artificial Intelligence and Machine Learning', 'OC', 7500, 110000, 85.0, 60, 2024),

-- NIT Warangal CSE
(13, 'Computer Science Engineering', 'OC', 500, 80000, 98.0, 120, 2024),
(13, 'Computer Science Engineering', 'BC-A', 800, 80000, 98.0, 30, 2024),
(13, 'Computer Science Engineering', 'BC-B', 900, 80000, 98.0, 30, 2024),
(13, 'Computer Science Engineering', 'SC', 2500, 80000, 98.0, 18, 2024),
(13, 'Computer Science Engineering', 'ST', 4000, 80000, 98.0, 9, 2024),
(13, 'Computer Science Engineering', 'EWS', 700, 80000, 98.0, 12, 2024),
(13, 'Electronics and Communication Engineering', 'OC', 800, 80000, 95.0, 120, 2024),
(13, 'Mechanical Engineering', 'OC', 2000, 80000, 90.0, 60, 2024),

-- KUCE Warangal CSE
(14, 'Computer Science Engineering', 'OC', 3500, 35000, 85.0, 60, 2024),
(14, 'Computer Science Engineering', 'SC', 10000, 35000, 85.0, 9, 2024),
(14, 'Electronics and Communication Engineering', 'OC', 5000, 35000, 80.0, 60, 2024),

-- SR Engineering Warangal
(15, 'Computer Science Engineering', 'OC', 9000, 75000, 78.0, 120, 2024),
(15, 'Computer Science Engineering', 'SC', 25000, 75000, 78.0, 18, 2024),
(15, 'Mechanical Engineering', 'OC', 15000, 75000, 70.0, 60, 2024),

-- KITS Warangal CSE
(16, 'Computer Science Engineering', 'OC', 10000, 70000, 75.0, 120, 2024),
(16, 'Computer Science Engineering', 'SC', 28000, 70000, 75.0, 18, 2024),

-- VJIT CSE
(11, 'Computer Science Engineering', 'OC', 12000, 80000, 76.0, 120, 2024),
(11, 'Computer Science Engineering', 'SC', 30000, 80000, 76.0, 18, 2024),

-- BVRIT CSE
(12, 'Computer Science Engineering', 'OC', 11000, 85000, 77.0, 120, 2024),
(12, 'Computer Science Engineering', 'SC', 28000, 85000, 77.0, 18, 2024),

-- NITS CSE
(17, 'Computer Science Engineering', 'OC', 15000, 65000, 72.0, 120, 2024),
(17, 'Computer Science Engineering', 'SC', 35000, 65000, 72.0, 18, 2024),

-- ACE CSE
(18, 'Computer Science Engineering', 'OC', 13000, 75000, 74.0, 120, 2024),
(18, 'Computer Science Engineering', 'SC', 32000, 75000, 74.0, 18, 2024),

-- MLRIT CSE
(19, 'Computer Science Engineering', 'OC', 14000, 70000, 73.0, 120, 2024),
(19, 'Computer Science Engineering', 'SC', 33000, 70000, 73.0, 18, 2024),

-- SREC Khammam CSE
(20, 'Computer Science Engineering', 'OC', 18000, 60000, 68.0, 60, 2024),
(20, 'Computer Science Engineering', 'SC', 40000, 60000, 68.0, 9, 2024),

-- JNTUK CSE
(21, 'Computer Science Engineering', 'OC', 2000, 35000, 88.0, 120, 2024),
(21, 'Computer Science Engineering', 'SC', 6000, 35000, 88.0, 18, 2024),
(21, 'Electronics and Communication Engineering', 'OC', 3000, 35000, 82.0, 120, 2024),

-- GITAM Hyderabad CSE
(23, 'Computer Science Engineering', 'OC', 4000, 200000, 92.0, 180, 2024),
(23, 'Computer Science Engineering', 'BC-A', 6000, 200000, 92.0, 45, 2024),
(23, 'Computer Science Engineering', 'SC', 12000, 200000, 92.0, 27, 2024),
(23, 'Data Science', 'OC', 4500, 210000, 94.0, 60, 2024),

-- IARE CSE
(24, 'Computer Science Engineering', 'OC', 16000, 90000, 70.0, 120, 2024),
(24, 'Computer Science Engineering', 'SC', 38000, 90000, 70.0, 18, 2024),

-- Vardhaman CSE
(25, 'Computer Science Engineering', 'OC', 10000, 95000, 79.0, 180, 2024),
(25, 'Computer Science Engineering', 'BC-A', 14000, 95000, 79.0, 45, 2024),
(25, 'Computer Science Engineering', 'SC', 30000, 95000, 79.0, 27, 2024),
(25, 'Artificial Intelligence and Machine Learning', 'OC', 9000, 105000, 83.0, 60, 2024);

-- Sample student
INSERT INTO students (name, email, eapcet_rank, category, gender, preferred_branch, preferred_location, max_budget) VALUES
('Demo Student', 'demo@student.com', 5000, 'OC', 'Male', 'Computer Science Engineering', 'Hyderabad', 150000);
