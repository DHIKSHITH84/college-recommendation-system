import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getRecommendations, registerStudent, addFavorite } from '../services/api';
import CollegeCard from '../components/CollegeCard';
import { ProbabilityChart, ClassificationChart } from '../components/Charts';

export default function Results() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [studentId, setStudentId] = useState(localStorage.getItem('studentId'));
  const [favorites, setFavorites] = useState(new Set());
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (college) => {
    setCompareList(prev => {
      const exists = prev.find(c => c.program_id === college.program_id);
      let updated;
      if (exists) {
        updated = prev.filter(c => c.program_id !== college.program_id);
      } else if (prev.length < 4) {
        updated = [...prev, college];
      } else {
        return prev;
      }
      localStorage.setItem('compareList', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const studentData = location.state?.studentData
      || JSON.parse(localStorage.getItem('studentProfile') || 'null');

    if (!studentData) {
      setError('No student data found. Please fill the form first.');
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        if (!studentId && studentData.name && studentData.email) {
          const regRes = await registerStudent(studentData);
          const id = regRes.data.data.student_id;
          setStudentId(id);
          localStorage.setItem('studentId', id);
          studentData.student_id = id;
        } else if (studentId) {
          studentData.student_id = parseInt(studentId, 10);
        }

        const res = await getRecommendations(studentData);
        setData(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch recommendations. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [location.state, studentId]);

  const handleFavorite = async (college) => {
    if (!studentId) return;
    try {
      await addFavorite(parseInt(studentId, 10), college.program_id);
      setFavorites(prev => new Set([...prev, college.program_id]));
    } catch {
      /* already favorited */
    }
  };

  if (loading) return <div className="loading">Analyzing your profile with AI...</div>;
  if (error) return (
    <div>
      <div className="error-msg">{error}</div>
      <Link to="/recommend" className="btn btn-primary">Go to Form</Link>
    </div>
  );
  if (!data) return null;

  const tabs = [
    { key: 'all', label: `All (${data.total})`, items: data.all_recommendations },
    { key: 'safe', label: `Safe (${data.safe_colleges.length})`, items: data.safe_colleges },
    { key: 'target', label: `Target (${data.target_colleges.length})`, items: data.target_colleges },
    { key: 'dream', label: `Dream (${data.dream_colleges.length})`, items: data.dream_colleges },
  ];

  const activeItems = tabs.find(t => t.key === activeTab)?.items || [];

  return (
    <div>
      <div className="page-header">
        <h1>Your College Recommendations</h1>
        <p>
          Rank: <strong>{data.student_profile.rank}</strong> | Category: <strong>{data.student_profile.category}</strong>
          {data.student_profile.branch && <> | Branch: <strong>{data.student_profile.branch}</strong></>}
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{data.safe_colleges.length}</div>
          <div className="stat-label">Safe Colleges</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.target_colleges.length}</div>
          <div className="stat-label">Target Colleges</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.dream_colleges.length}</div>
          <div className="stat-label">Dream Colleges</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.total}</div>
          <div className="stat-label">Total Matches</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div className="card">
          <ClassificationChart
            safe={data.safe_colleges}
            target={data.target_colleges}
            dream={data.dream_colleges}
          />
        </div>
        <div className="card">
          <ProbabilityChart recommendations={data.all_recommendations} />
        </div>
      </div>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {compareList.length > 0 && (
        <div className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
          {compareList.length} college(s) selected for comparison.
          <a href="/compare" className="btn btn-primary btn-sm" style={{ marginLeft: '1rem' }}>Go to Compare</a>
        </div>
      )}

      {activeItems.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No colleges found in this category. Try adjusting your preferences.</p>
        </div>
      ) : (
        <div className="card-grid">
          {activeItems.map(college => (
            <CollegeCard
              key={college.program_id}
              college={college}
              onFavorite={handleFavorite}
              isFavorite={favorites.has(college.program_id)}
              showCompare
              onCompare={toggleCompare}
              isCompared={compareList.some(c => c.program_id === college.program_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
