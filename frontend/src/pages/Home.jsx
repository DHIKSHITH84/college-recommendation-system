import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const features = [
    { icon: '🤖', title: 'AI-Powered Predictions', desc: 'Random Forest ML model predicts admission chances using historical cutoff data.' },
    { icon: '🎯', title: 'Smart Classification', desc: 'Colleges categorized into Safe, Target, and Dream based on your rank.' },
    { icon: '🔍', title: 'Advanced Search', desc: 'Filter colleges by branch, location, fee, and category.' },
    { icon: '📊', title: 'Visual Analytics', desc: 'Interactive charts showing admission probability and comparisons.' },
    { icon: '⚖️', title: 'College Comparison', desc: 'Compare up to 4 colleges side-by-side on key metrics.' },
    { icon: '❤️', title: 'Save Favorites', desc: 'Bookmark colleges and access them from your dashboard.' },
  ];

  const categories = ['OC', 'BC-A', 'BC-B', 'BC-C', 'BC-D', 'BC-E', 'SC', 'ST', 'EWS'];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Telangana EAPCET College Recommendation System</h1>
          <p className="hero-subtitle">
            AI-powered college recommendations for Telangana engineering aspirants.
            Get personalized Safe, Target, and Dream college lists based on your EAPCET rank and category.
          </p>
          <div className="hero-actions">
            <Link to="/recommend" className="btn btn-primary btn-lg">Get My Recommendations</Link>
            <Link to="/search" className="btn btn-secondary btn-lg">Browse Colleges</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">25+</span>
            <span className="stat-text">Colleges</span>
          </div>
          <div className="hero-stat">
            <span className="stat-num">100+</span>
            <span className="stat-text">Programs</span>
          </div>
          <div className="hero-stat">
            <span className="stat-num">9</span>
            <span className="stat-text">Categories</span>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Enter Your Details</h3>
            <p>Provide your EAPCET rank, category, preferred branch, location, and budget.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>AI Analysis</h3>
            <p>Our Random Forest model analyzes historical cutoffs and predicts admission probability.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Get Recommendations</h3>
            <p>Receive classified lists of Safe, Target, and Dream colleges sorted by probability.</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2>Supported Reservation Categories</h2>
        <div className="category-tags">
          {categories.map(cat => (
            <span key={cat} className="category-tag">{cat}</span>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Find Your Perfect College?</h2>
        <p>Start with your EAPCET rank and let AI guide your admission journey.</p>
        <Link to="/recommend" className="btn btn-primary btn-lg">Start Now →</Link>
      </section>
    </div>
  );
}
