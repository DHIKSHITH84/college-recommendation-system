import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, removeFavorite } from '../services/api';
import CollegeCard from '../components/CollegeCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    getFavorites(studentId)
      .then(res => {
        setFavorites(res.data.data.map(f => ({
          ...f,
          program_id: f.id,
          classification: null,
        })));
      })
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, [studentId]);

  const handleRemove = async (college) => {
    try {
      await removeFavorite(parseInt(studentId, 10), college.program_id);
      setFavorites(prev => prev.filter(f => f.program_id !== college.program_id));
    } catch {
      /* ignore */
    }
  };

  if (!studentId) {
    return (
      <div>
        <div className="page-header">
          <h1>My Favorites</h1>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Please get recommendations first to save favorite colleges.</p>
          <Link to="/recommend" className="btn btn-primary" style={{ marginTop: '1rem' }}>Get Started</Link>
        </div>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading favorites...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>My Favorite Colleges</h1>
        <p>{favorites.length} college{favorites.length !== 1 ? 's' : ''} saved</p>
      </div>

      {favorites.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No favorites yet. Save colleges from your recommendation results.</p>
          <Link to="/results" className="btn btn-primary" style={{ marginTop: '1rem' }}>View Recommendations</Link>
        </div>
      ) : (
        <div className="card-grid">
          {favorites.map(college => (
            <CollegeCard
              key={college.program_id}
              college={college}
              onFavorite={handleRemove}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
