import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudent, getFavorites } from '../services/api';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const studentId = localStorage.getItem('studentId');
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('studentProfile') || 'null');

    if (studentId) {
      getStudent(studentId)
        .then(res => setProfile(res.data.data))
        .catch(() => setProfile(stored));

      getFavorites(studentId)
        .then(res => setFavorites(res.data.data || []))
        .catch(() => {});
    } else {
      setProfile(stored);
    }
  }, [studentId]);

  if (!profile) {
    return (
      <div>
        <div className="page-header">
          <h1>Student Dashboard</h1>
          <p>Your personalized admission dashboard.</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No profile found. Get started by entering your EAPCET details.</p>
          <Link to="/recommend" className="btn btn-primary" style={{ marginTop: '1rem' }}>Get Recommendations</Link>
        </div>
      </div>
    );
  }

  const data = profile;

  return (
    <div>
      <div className="page-header">
        <h1>Student Dashboard</h1>
        <p>Welcome back, {data.name || 'Student'}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{data.eapcet_rank?.toLocaleString()}</div>
          <div className="stat-label">EAPCET Rank</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.category}</div>
          <div className="stat-label">Category</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{favorites.length}</div>
          <div className="stat-label">Saved Colleges</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.max_budget ? `₹${(data.max_budget / 1000).toFixed(0)}K` : 'N/A'}</div>
          <div className="stat-label">Max Budget</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Profile Details</h3>
          <div className="info-row"><span className="label">Name</span><span>{data.name}</span></div>
          <div className="info-row"><span className="label">Email</span><span>{data.email}</span></div>
          <div className="info-row"><span className="label">Gender</span><span>{data.gender}</span></div>
          <div className="info-row"><span className="label">Preferred Branch</span><span>{data.preferred_branch || 'Any'}</span></div>
          <div className="info-row"><span className="label">Preferred Location</span><span>{data.preferred_location || 'Any'}</span></div>
          <Link to="/recommend" className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>Update Profile</Link>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/results" className="btn btn-primary">View Recommendations</Link>
            <Link to="/search" className="btn btn-secondary">Search Colleges</Link>
            <Link to="/compare" className="btn btn-secondary">Compare Colleges</Link>
            <Link to="/favorites" className="btn btn-secondary">My Favorites ({favorites.length})</Link>
          </div>
        </div>
      </div>

      {favorites.length > 0 && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Recent Favorites</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>College</th>
                  <th>Branch</th>
                  <th>Cutoff</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {favorites.slice(0, 5).map(f => (
                  <tr key={f.favorite_id || f.id}>
                    <td>{f.college_name}</td>
                    <td>{f.branch}</td>
                    <td>{f.cutoff_rank?.toLocaleString()}</td>
                    <td>₹{f.fee_per_year?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
