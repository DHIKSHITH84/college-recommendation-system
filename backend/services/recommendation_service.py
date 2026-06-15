from models.college_model import (
    get_programs_for_recommendation,
    save_recommendation_history,
    search_colleges,
)
from ml.recommendation_engine import get_predictor


def generate_recommendations(student_data):
    rank = int(student_data['eapcet_rank'])
    category = student_data['category']
    branch = student_data.get('preferred_branch')
    location = student_data.get('preferred_location')
    max_budget = student_data.get('max_budget')

    if max_budget:
        max_budget = float(max_budget)

    programs = get_programs_for_recommendation(
        rank, category, branch, location, max_budget
    )

    if not programs:
        programs = get_programs_for_recommendation(rank, category)

    predictor = get_predictor()

    if not predictor.is_trained and programs:
        predictor.train(programs)

    recommendations = []
    for prog in programs:
        probability = predictor.predict_probability(rank, prog)
        classification = predictor.classify(probability)

        recommendations.append({
            'program_id': prog['id'],
            'college_id': prog['college_id'],
            'college_name': prog['college_name'],
            'college_code': prog['college_code'],
            'branch': prog['branch'],
            'category': prog['category'],
            'cutoff_rank': prog['cutoff_rank'],
            'fee_per_year': float(prog['fee_per_year']),
            'placement_percentage': float(prog['placement_percentage']),
            'location': prog['location'],
            'college_type': prog['college_type'],
            'accreditation': prog.get('accreditation', ''),
            'seats_available': prog['seats_available'],
            'probability_score': probability,
            'classification': classification,
        })

    recommendations.sort(key=lambda x: x['probability_score'], reverse=True)

    student_id = student_data.get('student_id')
    if student_id:
        for rec in recommendations[:20]:
            save_recommendation_history(
                student_id, rec['program_id'],
                rec['probability_score'], rec['classification']
            )

    safe = [r for r in recommendations if r['classification'] == 'Safe']
    target = [r for r in recommendations if r['classification'] == 'Target']
    dream = [r for r in recommendations if r['classification'] == 'Dream']

    return {
        'total': len(recommendations),
        'safe_colleges': safe,
        'target_colleges': target,
        'dream_colleges': dream,
        'all_recommendations': recommendations,
        'student_profile': {
            'rank': rank,
            'category': category,
            'branch': branch,
            'location': location,
            'max_budget': max_budget,
        },
    }
