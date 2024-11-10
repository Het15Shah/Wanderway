import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const styles = {
  section: {
    background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
    padding: '60px 20px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    maxWidth: '850px',
    margin: '40px auto',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  heading: {
    fontSize: '2.8rem',
    color: '#2c3e50',
    marginBottom: '25px',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '600',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#6c757d',
    lineHeight: '1.7',
    marginBottom: '35px',
    fontFamily: "'Roboto', sans-serif",
  },
  button: {
    padding: '12px 35px',
    background: 'linear-gradient(135deg, #6dd5ed, #2193b0)',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1.1rem',
    fontWeight: '500',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
  },
  buttonHover: {
    background: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
    transform: 'scale(1.1)',
  },
};

const AboutUs = () => {
  const [buttonHovered, setButtonHovered] = React.useState(false);

  return (
    <div className="container">
      <section
        className="text-center p-4"
        style={{
          ...styles.section,
          transform: buttonHovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: buttonHovered ? '0 12px 36px rgba(0, 0, 0, 0.3)' : styles.section.boxShadow,
        }}
      >
        <h2 style={styles.heading}>About Us</h2>
        <p style={styles.paragraph}>
          We help you find the best travel plans and experiences tailored to your budget and preferences. Whether you're looking for adventure, relaxation, or cultural immersion, we have something for everyone.
        </p>
        <button
          style={{
            ...styles.button,
            ...(buttonHovered ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          Learn More
        </button>
      </section>
    </div>
  );
};

export default AboutUs;