import React from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import FOOTER from "../components/Footer";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Box,
} from "@mui/material";

import Neel from "../assets/Team Photos/Neel.jpg";
import het from "../assets/Team Photos/het.jpg";
import kavit from "../assets/Team Photos/kavit.jpg";
import ram from "../assets/Team Photos/ram.jpg";
import shrey from "../assets/Team Photos/shrey.jpg";
import darpan from "../assets/Team Photos/Darpan.jpg";
import jinay from "../assets/Team Photos/jinay.jpg";
import divy from "../assets/Team Photos/divy.jpg";
import meet from "../assets/Team Photos/meet.jpg";
import priyank from "../assets/Team Photos/priyank.jpg";

const teamData = {
  team: [
    {
      name: "Kavit Patel",
      photo: kavit,
      instagram: "https://instagram.com/kavit007",
      github: "https://github.com/alicesmith",
      linkedin: "https://linkedin.com/in/kavit-patel-78a4b1268/",
    },
    {
      name: "Divy Patel",
      photo: divy,
      instagram: "https://instagram.com/divypatel473",
      github: "https://github.com/ddpatel123",
      linkedin: "https://linkedin.com/in/divy-patel-1a1b32250/",
    },
    {
      name: "Darpan Lunagariya",
      photo: darpan,
      instagram: "https://instagram.com/darpan_1405",
      github: "https://github.com/bobjones",
      linkedin: "https://linkedin.com/in/darpan-lunagariya-264481288/",
    },
    {
      name: "Het Shah",
      photo: het,
      instagram: "https://instagram.com/hetshah_3030",
      github: "https://github.com/Het15Shah",
      linkedin: "https://linkedin.com/in/het-shah-867893242/",
    },
    {
      name: "Ram Patel",
      photo: ram,
      instagram: "https://instagram.com/ram_patel_10",
      github: "https://github.com/ramppatel",
      linkedin: "https://www.linkedin.com/in/ram-patel-5a8607257/",
    },
    
    {
      name: "Shrey Bhavishi",
      photo: shrey,
      instagram: "https://instagram.com/shrey.bavishi",
      github: "https://github.com/ShreyBavishi",
      linkedin: "https://linkedin.com/in/bobjones",
    },
    {
      name: "Meet Zalavadiya",
      photo: meet,
      instagram: "https://instagram.com/meet.patel6154",
      github: "https://github.com/Meet-Zalavadiya",
      linkedin: "https://linkedin.com/in/meet-zalavadiya-45270b284/",
    },
    {
      name: "Neel Patel",
      photo: Neel,
      instagram: "https://instagram.com/_neel_05__",
      github: "https://github.com/Neel075",
      linkedin: "https://linkedin.com/in/neel-patel-550493253/",
    },
    
    {
      name: "Priyank Ramani",
      photo: priyank,
      instagram: "https://instagram.com/priyank.ramani",
      github: "https://github.com/priyankramani",
      linkedin: "https://linkedin.com/in/priyank-ramani-1",
    },
    {
      name: "Jinay Vora",
      photo: jinay,
      instagram: "https://instagram.com/jinayvora_",
      github: "https://github.com/Jinay-Vora123",
      linkedin: "https://linkedin.com/in/colewright22",
    },
    
  ],
};

const AboutUs = () => {
  return (
    <Box sx={{ backgroundColor: "#F9F9F9" }}>
      {/* About Us Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#444",
          textAlign: "center",
          mb: 6,
          textDecoration: "underline",
        }}
      >
        About Us
      </Typography>

      {/* About Website */}
      <Box
        sx={{
          background: "linear-gradient(to right, #FFEBB7, #FFE3F4)",
          mx: "auto",
          // p: 4,
          width: "95%",
          height: "170px",
          borderRadius: "16px",
          boxShadow: 4,
          mb: 6,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "#333" }}
        >
          Wanderways
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#666",marginLeft:"30px", marginBottom:"5px" }}>
          <p>
            At WanderWays, we are dedicated to making your travel dreams come
            true by offering personalized trip planning that caters to your
            unique preferences. Whether you're looking to explore new
            destinations or create a completely customized itinerary, WanderWays
            helps you design the perfect journey. From budget and activities to
            ,we take care of every detail,
            ensuring a seamless experience. With easy booking options and a
            tailored approach, we bring the world to your fingertips, so you can
            wander with confidence and make every trip unforgettable. 🌍✈️
          </p>
        </Typography>
      </Box>

      {/* Team Section */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            color: "#444",
          }}
        >
          Meet Our Team
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {teamData.team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  backgroundColor: "#fff",
                  borderRadius: "32px",
                  boxShadow: 100,
                  padding: "16px",
                  // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  height: 330, // Reduce card height
                  width: 270, // Reduce card width

                  marginTop: 2,
                  marginBottom: 2,
                  marginLeft: 5,
                  marginRight: 10,
                }}
              >
                <Avatar
                  src={member.photo}
                  alt={member.name}
                  sx={{
                    width: 160, // Adjust avatar size if necessary
                    height: 170,
                    margin: "0 auto 30px ",
                    boxShadow: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mt: 1,
                    fontSize: "0.9rem", // Reduce font size
                  }}
                >
                  {member.name}
                </Typography>
                {/* Social Media Icons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1, // Adjust gap between icons
                    mt: 1.5, // Adjust spacing between card content and icons
                  }}
                >
                  <IconButton
                    href={member.instagram}
                    target="_blank"
                    sx={{ color: "#E1306C" }}
                  >
                    <i className="fab fa-instagram"></i>
                  </IconButton>
                  <IconButton
                    href={member.github}
                    target="_blank"
                    sx={{ color: "#333" }}
                  >
                    <i className="fab fa-github"></i>
                  </IconButton>
                  <IconButton
                    href={member.linkedin}
                    target="_blank"
                    sx={{ color: "#0077B5" }}
                  >
                    <i className="fab fa-linkedin"></i>
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tech Stack Section */}
      <Box
        sx={{
          backgroundColor: "#f0f8ff",
          mt: 6,
          mx: "auto",
          p: 3,
          maxWidth: 800,
          borderRadius: "16px",
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, color: "#333", textAlign: "center" }}
        >
          Technologies Used in the Project
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "JavaScript", icon: "fab fa-js" },
            { name: "React.js", icon: "fab fa-react" },
            { name: "Node.js", icon: "fab fa-node-js" },
            { name: "MongoDB", icon: "fas fa-database" },
            { name: "Express.js", icon: "fas fa-server" },
            { name: "HTML", icon: "fab fa-html5" },
            { name: "CSS", icon: "fab fa-css3-alt" },
            { name: "Material-UI", icon: "fab fa-react" },
            { name: "Bootstrap", icon: "fab fa-bootstrap" },
          ].map((tech, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  backgroundColor: "#0275d8",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              >
                <i className={tech.icon}></i>
                <Typography sx={{ fontSize: "0.9rem" }}>{tech.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 6 }}>
        <FOOTER />
      </Box>
    </Box>
  );
};

const TeamCard = ({ member }) => (
  <Card
    sx={{
      textAlign: "center",
      backgroundColor: "#F5F5F5",
      borderRadius: "16px",
      padding: 2,
      boxShadow: 2,
      width: "200px",
      height: "260px",
      // marginRight: 100,
    }}
  >
    <Avatar
      src={member.photo}
      alt={member.name}
      sx={{ width: 100, height: 100, margin: "0 auto", boxShadow: 2 }}
    />
    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
      {member.name}
    </Typography>

    {/* Social Media Icons */}
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
      <IconButton
        href={member.instagram}
        target="_blank"
        sx={{ color: "#E1306C" }}
      >
        <i className="fab fa-instagram"></i>
      </IconButton>
      <IconButton href={member.github} target="_blank" sx={{ color: "#333" }}>
        <i className="fab fa-github"></i>
      </IconButton>
      <IconButton
        href={member.linkedin}
        target="_blank"
        sx={{ color: "#0077B5" }}
      >
        <i className="fab fa-linkedin"></i>
      </IconButton>
    </Box>
  </Card>
);

export default AboutUs;
