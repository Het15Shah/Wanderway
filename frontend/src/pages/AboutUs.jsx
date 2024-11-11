// AboutUs.js

import React from 'react';
import '../CSS/AboutUs.css';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Neel from '../assets/Team Photos/Neel.jpg' 
import het from '../assets/Team Photos/het.jpg'
import kavit from '../assets/Team Photos/kavit.jpg'
import ram from '../assets/Team Photos/ram.jpg'
import shrey from '../assets/Team Photos/shrey.jpg'
import darpan from '../assets/Team Photos/shrey.jpg'
import jinay from '../assets/Team Photos/jinay.jpg'
import divy from '../assets/Team Photos/divy.jpg'
import meet from '../assets/Team Photos/meet.jpg'
import priyank from '../assets/Team Photos/shrey.jpg'


const teamData = {
  team: [

    {
      name: 'Kavit Patel',
      //id: '202201290',
      photo: kavit, 
      instagram: 'https://instagram.com/kavit007',
      github: 'https://github.com/alicesmith',
      linkedin: 'https://linkedin.com/in/kavit-patel-78a4b1268/',
    },

    {
      name: 'Darpan Lunagariya',
      //id: '202201462',
      photo: darpan,
      instagram: 'https://instagram.com/darpan_1405',
      github: 'https://github.com/bobjones',
      linkedin: 'https://linkedin.com/in/darpan-lunagariya-264481288/',
    },

    {
      name: 'Jinay Vora',
      //id: '202201473',
      photo: jinay,
      instagram: 'https://instagram.com/jinayvora_',
      github: 'https://github.com/Jinay-Vora123',
      linkedin: 'https://linkedin.com/in/colewright22',
    },


    {
      name: 'Shrey Bhavishi',
      //id: '202201478',
      photo: shrey,
      instagram: 'https://instagram.com/shrey.bavishi',
      github: 'https://github.com/ShreyBavishi',
      linkedin: 'https://linkedin.com/in/bobjones',
    },


    {
      name: 'Meet Zalavadiya',
      //id: '202201482',
      photo: meet,
      instagram: 'https://instagram.com/meet.patel6154',
      github: 'https://github.com/Meet-Zalavadiya',
      linkedin: 'https://linkedin.com/in/meet-zalavadiya-45270b284/',
    },

    {
      name: 'Neel Patel',
      //id: '202201494',
      photo: Neel, 
      instagram: 'https://instagram.com/_neel_05__',
      github: 'https://github.com/Neel075',
      linkedin: 'https://linkedin.com/in/neel-patel-550493253/',
    },

    {
      name: 'Divy Patel',
      //id: '202201495',
      photo: divy,
      instagram: 'https://instagram.com/divypatel473',
      github: 'https://github.com/ddpatel123',
      linkedin: 'https://linkedin.com/in/divy-patel-1a1b32250/',
    },

    {
      name: 'Priyank Ramani',
     // id: '202201497',
      photo: priyank,
      instagram: 'https://instagram.com/priyank.ramani',
      github: 'https://github.com/priyankramani',
      linkedin: 'https://linkedin.com/in/priyank-ramani-1',
    },

    {
      name: 'Ram Patel',
      //id: '202201509',
      photo: ram,
      instagram: 'https://instagram.com/bobjones',
      github: 'https://github.com/bobjones',
      linkedin: 'https://linkedin.com/in/ram-patel-5a8607257/',
    },

    {
      name: 'Het Shah',
      //id: '202201515',
      photo: het, 
      instagram: 'https://instagram.com/hetshah_3030',
      github: 'https://github.com/Het15Shah',
      linkedin: 'https://linkedin.com/in/het-shah-867893242/',
    },
  ],
};

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-page">
      <header className="navbar">
        <h1>About Us</h1>
        <button onClick={() => navigate('/')} className="back-home-button">Back to Home</button>
      </header>

      {/* Card for About Website */}
      <div className="card about-website">
        <h2>About the Website</h2>
        <p>
          We help you find the best travel plans and experiences tailored to
          your budget and preferences. Whether you're looking for adventure,
          relaxation, or cultural immersion, we have something for everyone.
        </p>
      </div>

      {/* Card for About Team */}
      <div className="card about-team">
        <h2>Meet Our Team</h2>

        {/*The Team*/}
        <div className='team-grid'>
          {teamData.team.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>

      </div>

      
    </div>
  );
};

const TeamCard = ({ member }) => (
  <div className="team-card">
    <img src={member.photo} alt={member.name} className="team-photo" />
    <h3>{member.name}</h3>
    <div className="social-links">
      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
        <i className="fab fa-instagram"></i>
      </a>

      <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link github">
        <i className="fab fa-github"></i>
      </a>

      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
  </div>
);

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "40px 0",
  },

  footerSection: {
    padding: "0 15px",
    marginBottom: "30px", // Added margin for spacing between sections
  },

  heading: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "1rem",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  link: {
    color: "#ddd",
    textDecoration: "none",
    display: "block",
    padding: "5px 0",
  },

  text: {
    color: "#bbb",
    fontSize: "0.9rem",
    lineHeight: "1.5",
  },

  galleryImages: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px", // Reduced gap for a more compact layout
  },

  galleryImage: {
    width: "100%",
    height: "80px", // Decreased height of images
    objectFit: "cover", // Ensures images fill the space without distortion
    borderRadius: "5px",
  },

  footerBottom: {
    borderTop: "1px solid #444",
    paddingTop: "15px",
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "-40px", // Adjusted margin for spacing
  },

  footerText: {
    fontSize: "0.9rem",
    color: "#bbb",
  },

  backToTop: {
    color: "#28a745",
    fontSize: "1.2rem",
    textDecoration: "none",
    marginLeft: "10px",
  },
};

export default AboutUs;