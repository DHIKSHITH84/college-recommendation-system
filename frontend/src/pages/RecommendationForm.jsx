import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocations, getBranches } from '../services/api';

const CATEGORIES = ['OC', 'BC-A', 'BC-B', 'BC-C', 'BC-D', 'BC-E', 'SC', 'ST', 'EWS'];
const GENDERS = ['Male', 'Female', 'Other'];

export default function RecommendationForm() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    eapcet_rank: '',
    category: 'OC',
    gender: 'Male',
    preferred_branch: '',
    preferred_location: '',
    max_budget: '',
  });

  useEffect(() => {
    getLocations().then(res => setLocations(res.data.data || [])).catch(() => {});
    getBranches().then(res => setBranches(res.data.data || [])).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      ...form,
      eapcet_rank: parseInt(form.eapcet_rank, 10),
      max_budget: form.max_budget ? parseFloat(form.max_budget) : null,
    };

    localStorage.setItem('studentProfile', JSON.stringify(studentData));
    navigate('/results', { state: { studentData } });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Get College Recommendations</h1>
        <p>Enter your EAPCET details to receive AI-powered college recommendations.</p>
      </div>

      <div className="card" style={{ maxWidth: 800, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="eapcet_rank">EAPCET Rank *</label>
              <input
                id="eapcet_rank"
                name="eapcet_rank"
                type="number"
                min="1"
                value={form.eapcet_rank}
                onChange={handleChange}
                placeholder="e.g. 5000"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select id="category" name="category" value={form.category} onChange={handleChange} required>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select id="gender" name="gender" value={form.gender} onChange={handleChange} required>
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="preferred_branch">Preferred Branch</label>
              <select id="preferred_branch" name="preferred_branch" value={form.preferred_branch} onChange={handleChange}>
                <option value="">All Branches</option>
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="preferred_location">Preferred Location</label>
              <select id="preferred_location" name="preferred_location" value={form.preferred_location} onChange={handleChange}>
                <option value="">All Locations</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="max_budget">Maximum Budget (₹/year)</label>
              <input
                id="max_budget"
                name="max_budget"
                type="number"
                min="0"
                step="1000"
                value={form.max_budget}
                onChange={handleChange}
                placeholder="e.g. 150000"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Get AI Recommendations
          </button>
        </form>
      </div>
    </div>
  );
}
