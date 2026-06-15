from flask import Blueprint, request, jsonify
from models.college_model import (
    get_all_colleges,
    get_college_by_id,
    search_colleges,
    get_locations,
    get_branches,
    create_student,
    get_student,
    add_favorite,
    remove_favorite,
    get_favorites,
    get_programs_by_ids,
)
from services.recommendation_service import generate_recommendations

colleges_bp = Blueprint('colleges', __name__)


@colleges_bp.route('/colleges', methods=['GET'])
def list_colleges():
    location = request.args.get('location')
    college_type = request.args.get('type')
    search = request.args.get('search')
    colleges = get_all_colleges(location, college_type, search)
    return jsonify({'success': True, 'data': colleges, 'count': len(colleges)})


@colleges_bp.route('/colleges/<int:college_id>', methods=['GET'])
def college_detail(college_id):
    college = get_college_by_id(college_id)
    if not college:
        return jsonify({'success': False, 'message': 'College not found'}), 404
    return jsonify({'success': True, 'data': college})


@colleges_bp.route('/colleges/search', methods=['GET'])
def search():
    results = search_colleges(
        search=request.args.get('q'),
        branch=request.args.get('branch'),
        location=request.args.get('location'),
        min_fee=request.args.get('min_fee', type=float),
        max_fee=request.args.get('max_fee', type=float),
        category=request.args.get('category', 'OC'),
    )
    return jsonify({'success': True, 'data': results, 'count': len(results)})


@colleges_bp.route('/colleges/compare', methods=['POST'])
def compare_colleges():
    data = request.get_json()
    program_ids = data.get('program_ids', [])
    if len(program_ids) < 2:
        return jsonify({'success': False, 'message': 'Select at least 2 colleges to compare'}), 400
    if len(program_ids) > 4:
        return jsonify({'success': False, 'message': 'Maximum 4 colleges can be compared'}), 400

    programs = get_programs_by_ids(program_ids)
    return jsonify({'success': True, 'data': programs})


@colleges_bp.route('/locations', methods=['GET'])
def locations():
    locs = get_locations()
    return jsonify({'success': True, 'data': [l['location'] for l in locs]})


@colleges_bp.route('/branches', methods=['GET'])
def branches():
    brs = get_branches()
    return jsonify({'success': True, 'data': [b['branch'] for b in brs]})


@colleges_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    required = ['eapcet_rank', 'category']
    for field in required:
        if field not in data:
            return jsonify({'success': False, 'message': f'{field} is required'}), 400

    try:
        results = generate_recommendations(data)
        return jsonify({'success': True, 'data': results})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@colleges_bp.route('/students', methods=['POST'])
def register_student():
    data = request.get_json()
    required = ['name', 'email', 'eapcet_rank', 'category', 'gender']
    for field in required:
        if field not in data:
            return jsonify({'success': False, 'message': f'{field} is required'}), 400

    student_id = create_student(data)
    return jsonify({'success': True, 'data': {'student_id': student_id}})


@colleges_bp.route('/students/<int:student_id>', methods=['GET'])
def student_profile(student_id):
    student = get_student(student_id)
    if not student:
        return jsonify({'success': False, 'message': 'Student not found'}), 404
    return jsonify({'success': True, 'data': student})


@colleges_bp.route('/favorites/<int:student_id>', methods=['GET'])
def list_favorites(student_id):
    favorites = get_favorites(student_id)
    return jsonify({'success': True, 'data': favorites})


@colleges_bp.route('/favorites', methods=['POST'])
def add_to_favorites():
    data = request.get_json()
    student_id = data.get('student_id')
    program_id = data.get('program_id')
    if not student_id or not program_id:
        return jsonify({'success': False, 'message': 'student_id and program_id required'}), 400

    result = add_favorite(student_id, program_id)
    if result is None:
        return jsonify({'success': False, 'message': 'Already in favorites'}), 409
    return jsonify({'success': True, 'message': 'Added to favorites'})


@colleges_bp.route('/favorites', methods=['DELETE'])
def remove_from_favorites():
    data = request.get_json()
    student_id = data.get('student_id')
    program_id = data.get('program_id')
    remove_favorite(student_id, program_id)
    return jsonify({'success': True, 'message': 'Removed from favorites'})


@colleges_bp.route('/health', methods=['GET'])
def health():
    return jsonify({'success': True, 'message': 'EAPCET API is running'})
