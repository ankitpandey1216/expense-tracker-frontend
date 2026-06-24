import "../styles/WelcomePage.css";
import dashboardIcon from "../images/dashboard.svg";
import expensesIcon from "../images/expenses.svg";
import groupIcon from "../images/group.svg";

export default function WelcomePage() {
  return (
    <div className="page">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <span className="hero-eyebrow">Shared spending, settled clearly</span>

          <h1>
            Split expenses <br />
            without confusion.
          </h1>

          <p>
            Track shared expenses, split bills fairly, and settle balances
            instantly with friends, roommates, or travel groups.
          </p>

          <div className="cta">
            <button className="btn primary large">Get Started</button>
            <button className="btn outline large">Learn More</button>
          </div>

          <div className="feature-strip">
            <div className="feature-item">
              <span className="feature-icon">
                <img src={groupIcon} alt="" aria-hidden="true" />
              </span>
              <span>Group bills</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <img src={expensesIcon} alt="" aria-hidden="true" />
              </span>
              <span>Smart splits</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <img src={dashboardIcon} alt="" aria-hidden="true" />
              </span>
              <span>Live balances</span>
            </div>
          </div>

          <div className="stats">
            <div>
              <h3>100%</h3>
              <p>Transparent Splits</p>
            </div>
            <div>
              <h3>Fast</h3>
              <p>Balance Tracking</p>
            </div>
            <div>
              <h3>Simple</h3>
              <p>Easy UI</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="preview-shell">
            <div className="preview-header">
              <div>
                <span className="preview-label">Weekend Trip</span>
                <h3>Group overview</h3>
              </div>
              <span className="preview-badge">Active</span>
            </div>

            <div className="preview-total">
              <span>Total spent</span>
              <strong>₹8,420</strong>
            </div>

            <div className="card">
              <h3>Balances</h3>
              <div className="row">
                <span>Aryan owes you</span>
                <b>₹450</b>
              </div>
              <div className="row">
                <span>You owe Chandan</span>
                <b className="red">₹120</b>
              </div>
              <div className="row">
                <span>Rohit owes you</span>
                <b>₹780</b>
              </div>
            </div>

            <div className="preview-actions">
              <span>Dinner</span>
              <span>Cab</span>
              <span>Hotel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2026 ExpenseTrackr • Built for learning
      </footer>

    </div>
  );
}
