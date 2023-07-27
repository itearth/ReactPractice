


import React from 'react';
import styles from '../../pages/HomePage/Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <header>
        <nav className={`navbar navbar-expand-md navbar-dark fixed-top ${styles.navbar}`}>
          <a className="navbar-brand" href="#">Company Name</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarCollapse">
            <ul className={`navbar-nav mr-auto ${styles.navbarNav}`}>
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main role="main" className={`flex-shrink-0 ${styles.main}`}>
        <div className={`container ${styles.mainContainer}`}>
          <h1 className={`mt-5 ${styles.heading}`}>Welcome to our Company</h1>
          <p className={`lead ${styles.subheading}`}>We provide high-quality services to clients around the globe.</p>
          <button type="button" className={`btn btn-primary btn-lg ${styles.btn}`}>Get Started</button>
        </div>
      </main>

      <footer className={`footer mt-auto py-3 ${styles.footer}`}>
        <div className="container">
          <span className={`text-muted ${styles.footerText}`}>&copy; {new Date().getFullYear()} Company Name</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
