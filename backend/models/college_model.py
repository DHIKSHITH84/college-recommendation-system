from database.db import execute_query


def get_all_colleges(location=None, college_type=None, search=None):
    query = """
        SELECT c.*, 
               MIN(cp.fee_per_year) as min_fee,
               MAX(cp.placement_percentage) as max_placement
        FROM colleges c
        LEFT JOIN college_programs cp ON c.id = cp.college_id
        WHERE 1=1
    """
    params = []

    if location:
        query += " AND c.location = %s"
        params.append(location)
    if college_type:
        query += " AND c.college_type = %s"
        params.append(college_type)
    if search:
        query += " AND (c.college_name LIKE %s OR c.college_code LIKE %s)"
        params.extend([f'%{search}%', f'%{search}%'])

    query += " GROUP BY c.id ORDER BY c.college_name"
    return execute_query(query, params, fetch_all=True)


def get_college_by_id(college_id):
    college = execute_query(
        "SELECT * FROM colleges WHERE id = %s",
        (college_id,),
        fetch_one=True,
    )
    if not college:
        return None

    programs = execute_query(
        """
        SELECT * FROM college_programs 
        WHERE college_id = %s 
        ORDER BY branch, category
        """,
        (college_id,),
        fetch_all=True,
    )
    college['programs'] = programs or []
    return college


def get_programs_for_recommendation(rank, category, branch=None, location=None, max_budget=None):
    query = """
        SELECT cp.*, c.college_name, c.college_code, c.location, 
               c.college_type, c.accreditation
        FROM college_programs cp
        JOIN colleges c ON cp.college_id = c.id
        WHERE cp.category = %s
    """
    params = [category]

    if branch:
        query += " AND cp.branch LIKE %s"
        params.append(f'%{branch}%')
    if location:
        query += " AND c.location = %s"
        params.append(location)
    if max_budget:
        query += " AND cp.fee_per_year <= %s"
        params.append(max_budget)

    query += " ORDER BY cp.cutoff_rank ASC"
    return execute_query(query, params, fetch_all=True)


def search_colleges(search=None, branch=None, location=None, 
                    min_fee=None, max_fee=None, category='OC'):
    query = """
        SELECT cp.id as program_id, cp.branch, cp.category, cp.cutoff_rank,
               cp.fee_per_year, cp.placement_percentage, cp.seats_available,
               c.id as college_id, c.college_name, c.college_code, c.location,
               c.college_type, c.accreditation
        FROM college_programs cp
        JOIN colleges c ON cp.college_id = c.id
        WHERE cp.category = %s
    """
    params = [category]

    if search:
        query += " AND (c.college_name LIKE %s OR c.college_code LIKE %s OR cp.branch LIKE %s)"
        params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
    if branch:
        query += " AND cp.branch LIKE %s"
        params.append(f'%{branch}%')
    if location:
        query += " AND c.location = %s"
        params.append(location)
    if min_fee:
        query += " AND cp.fee_per_year >= %s"
        params.append(min_fee)
    if max_fee:
        query += " AND cp.fee_per_year <= %s"
        params.append(max_fee)

    query += " ORDER BY cp.cutoff_rank ASC"
    return execute_query(query, params, fetch_all=True)


def get_locations():
    return execute_query(
        "SELECT DISTINCT location FROM colleges ORDER BY location",
        fetch_all=True,
    )


def get_branches():
    return execute_query(
        "SELECT DISTINCT branch FROM college_programs ORDER BY branch",
        fetch_all=True,
    )


def create_student(data):
    return execute_query(
        """
        INSERT INTO students (name, email, eapcet_rank, category, gender,
                              preferred_branch, preferred_location, max_budget)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            data['name'], data['email'], data['eapcet_rank'], data['category'],
            data['gender'], data.get('preferred_branch'), data.get('preferred_location'),
            data.get('max_budget'),
        ),
    )


def get_student(student_id):
    return execute_query(
        "SELECT * FROM students WHERE id = %s",
        (student_id,),
        fetch_one=True,
    )


def add_favorite(student_id, program_id):
    try:
        return execute_query(
            "INSERT INTO favorites (student_id, college_program_id) VALUES (%s, %s)",
            (student_id, program_id),
        )
    except Exception:
        return None


def remove_favorite(student_id, program_id):
    execute_query(
        "DELETE FROM favorites WHERE student_id = %s AND college_program_id = %s",
        (student_id, program_id),
    )


def get_favorites(student_id):
    return execute_query(
        """
        SELECT f.id as favorite_id, cp.*, c.college_name, c.college_code, 
               c.location, c.college_type
        FROM favorites f
        JOIN college_programs cp ON f.college_program_id = cp.id
        JOIN colleges c ON cp.college_id = c.id
        WHERE f.student_id = %s
        ORDER BY c.college_name
        """,
        (student_id,),
        fetch_all=True,
    )


def save_recommendation_history(student_id, program_id, probability, classification):
    execute_query(
        """
        INSERT INTO recommendation_history 
        (student_id, college_program_id, probability_score, classification)
        VALUES (%s, %s, %s, %s)
        """,
        (student_id, program_id, probability, classification),
    )


def get_programs_by_ids(program_ids):
    if not program_ids:
        return []
    placeholders = ','.join(['%s'] * len(program_ids))
    return execute_query(
        f"""
        SELECT cp.*, c.college_name, c.college_code, c.location,
               c.college_type, c.accreditation
        FROM college_programs cp
        JOIN colleges c ON cp.college_id = c.id
        WHERE cp.id IN ({placeholders})
        """,
        program_ids,
        fetch_all=True,
    )
