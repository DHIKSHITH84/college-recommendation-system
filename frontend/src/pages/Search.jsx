import { useState, useEffect } from 'react';
import { searchColleges, getLocations, getBranches } from '../services/api';
import CollegeCard from '../components/CollegeCard';

const CATEGORIES = ['OC', 'BC-A', 'BC-B', 'BC-C', 'BC-D', 'BC-E', 'SC', 'ST', 'EWS'];

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [branches, setBranches] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [filters, setFilters] = useState({
    q: '',
    branch: '',
    location: '',
    category: 'OC',
    min_fee: '',
    max_fee: '',
  });

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
    getLocations().then(res => setLocations(res.data.data || [])).catch(() => {});
    getBranches().then(res => setBranches(res.data.data || [])).catch(() => {});
    handleSearch();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const params = { ...filters };
      if (params.min_fee) params.min_fee = parseFloat(params.min_fee);
      if (params.max_fee) params.max_fee = parseFloat(params.max_fee);
      Object.keys(params).forEach(k => { if (!params[k]) delete params[k]; });

      const res = await searchColleges(params);
      setResults(res.data.data.map(r => ({
        ...r,
        program_id: r.program_id,
      })));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Search Colleges</h1>
        <p>Find Telangana engineering colleges with advanced filters.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="q">Search</label>
              <input id="q" name="q" value={filters.q} onChange={handleChange} placeholder="College name or code..." />
            </div>
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <select id="branch" name="branch" value={filters.branch} onChange={handleChange}>
                <option value="">All Branches</option>
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <select id="location" name="location" value={filters.location} onChange={handleChange}>
                <option value="">All Locations</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={filters.category} onChange={handleChange}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="min_fee">Min Fee (₹)</label>
              <input id="min_fee" name="min_fee" type="number" value={filters.min_fee} onChange={handleChange} placeholder="30000" />
            </div>
            <div className="form-group">
              <label htmlFor="max_fee">Max Fee (₹)</label>
              <input id="max_fee" name="max_fee" type="number" value={filters.max_fee} onChange={handleChange} placeholder="200000" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>

      {loading ? (
        <div className="loading">Searching...</div>
      ) : (
        <>
          <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
            Found <strong>{results.length}</strong> results
          </p>
          {compareList.length > 0 && (
            <div className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
              {compareList.length} college(s) selected for comparison.
              <a href="/compare" className="btn btn-primary btn-sm" style={{ marginLeft: '1rem' }}>Go to Compare</a>
            </div>
          )}
          <div className="card-grid">
            {results.map(college => (
              <CollegeCard
                key={college.program_id}
                college={college}
                showCompare
                onCompare={toggleCompare}
                isCompared={compareList.some(c => c.program_id === college.program_id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
