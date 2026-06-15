import './CollegeCard.css';

export default function CollegeCard({ college, onFavorite, isFavorite, showCompare, onCompare, isCompared }) {
  const badgeClass = {
    Safe: 'badge-safe',
    Target: 'badge-target',
    Dream: 'badge-dream',
  }[college.classification] || 'badge-target';

  return (
    <div className="college-card">
      <div className="college-card-header">
        <div>
          <span className="college-code">{college.college_code}</span>
          <h3>{college.college_name}</h3>
        </div>
        {college.classification && (
          <span className={`badge ${badgeClass}`}>{college.classification}</span>
        )}
      </div>

      <div className="college-card-body">
        <div className="info-row">
          <span className="label">Branch</span>
          <span>{college.branch}</span>
        </div>
        <div className="info-row">
          <span className="label">Location</span>
          <span>{college.location}</span>
        </div>
        <div className="info-row">
          <span className="label">Cutoff Rank</span>
          <span>{college.cutoff_rank?.toLocaleString()}</span>
        </div>
        <div className="info-row">
          <span className="label">Fee/Year</span>
          <span>₹{college.fee_per_year?.toLocaleString()}</span>
        </div>
        <div className="info-row">
          <span className="label">Placements</span>
          <span>{college.placement_percentage}%</span>
        </div>
      </div>

      {college.probability_score !== undefined && (
        <div className="probability-bar">
          <div className="probability-header">
            <span>Admission Chance</span>
            <strong>{college.probability_score}%</strong>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${college.probability_score}%`,
                background: college.probability_score >= 70 ? '#10b981'
                  : college.probability_score >= 40 ? '#f59e0b' : '#8b5cf6',
              }}
            />
          </div>
        </div>
      )}

      <div className="college-card-actions">
        {showCompare && (
          <button
            className={`btn btn-sm ${isCompared ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onCompare?.(college)}
          >
            {isCompared ? '✓ Selected' : 'Compare'}
          </button>
        )}
        {onFavorite && (
          <button
            className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => onFavorite(college)}
          >
            {isFavorite ? '♥ Saved' : '♡ Save'}
          </button>
        )}
      </div>
    </div>
  );
}
