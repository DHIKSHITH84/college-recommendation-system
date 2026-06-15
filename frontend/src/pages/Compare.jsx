import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { compareColleges } from '../services/api';
import { CompareChart } from '../components/Charts';

export default function Compare() {
  const [selected, setSelected] = useState([]);
  const [compareData, setCompareData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('compareList') || '[]');
    if (stored.length > 0) setSelected(stored);
  }, []);

  const toggleSelect = (college) => {
    setSelected(prev => {
      const exists = prev.find(c => c.program_id === college.program_id);
      let updated;
      if (exists) {
        updated = prev.filter(c => c.program_id !== college.program_id);
      } else if (prev.length >= 4) {
        return prev;
      } else {
        updated = [...prev, college];
      }
      localStorage.setItem('compareList', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCompare = async () => {
    if (selected.length < 2) return;
    setLoading(true);
    try {
      const ids = selected.map(c => c.program_id);
      const res = await compareColleges(ids);
      setCompareData(res.data.data);
    } catch {
      setCompareData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Compare Colleges</h1>
        <p>Select up to 4 colleges to compare side-by-side.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Selected Colleges ({selected.length}/4)</h3>
        {selected.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>
            Go to <Link to="/search">Search</Link> or <Link to="/results">Results</Link> and use the Compare button on college cards.
          </p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>College</th>
                  <th>Branch</th>
                  <th>Cutoff</th>
                  <th>Fee</th>
                  <th>Placements</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selected.map(c => (
                  <tr key={c.program_id}>
                    <td><strong>{c.college_name}</strong><br /><small>{c.college_code}</small></td>
                    <td>{c.branch}</td>
                    <td>{c.cutoff_rank?.toLocaleString()}</td>
                    <td>₹{c.fee_per_year?.toLocaleString()}</td>
                    <td>{c.placement_percentage}%</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => toggleSelect(c)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
          onClick={handleCompare}
          disabled={selected.length < 2 || loading}
        >
          {loading ? 'Comparing...' : 'Compare Selected'}
        </button>
      </div>

      {compareData && (
        <>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <CompareChart colleges={compareData} />
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  {compareData.map(c => (
                    <th key={c.id}>{c.college_code}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>College Name</strong></td>
                  {compareData.map(c => <td key={c.id}>{c.college_name}</td>)}
                </tr>
                <tr>
                  <td><strong>Location</strong></td>
                  {compareData.map(c => <td key={c.id}>{c.location}</td>)}
                </tr>
                <tr>
                  <td><strong>Branch</strong></td>
                  {compareData.map(c => <td key={c.id}>{c.branch}</td>)}
                </tr>
                <tr>
                  <td><strong>Cutoff Rank</strong></td>
                  {compareData.map(c => <td key={c.id}>{c.cutoff_rank?.toLocaleString()}</td>)}
                </tr>
                <tr>
                  <td><strong>Fee/Year</strong></td>
                  {compareData.map(c => <td key={c.id}>₹{c.fee_per_year?.toLocaleString()}</td>)}
                </tr>
                <tr>
                  <td><strong>Placements</strong></td>
                  {compareData.map(c => <td key={c.id}>{c.placement_percentage}%</td>)}
                </tr>
                <tr>
                  <td><strong>College Type</strong></td>
                  {compareData.map(c => <td key={c.id}>{c.college_type}</td>)}
                </tr>
                <tr>
                  <td><strong>Seats</strong></td>
                  {compareData.map(c => <td key={c.id}>{c.seats_available}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
