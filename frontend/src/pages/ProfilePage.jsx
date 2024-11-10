import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Camera from "@mui/icons-material/Camera";
import Phone from "@mui/icons-material/Phone";
import LocationOn from "@mui/icons-material/LocationOn";
import useAPI from "../hooks/useAPI";

const TravelProfilePage = () => {
  const { GET, POST } = useAPI();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [isWorking, setIsWorking] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [gender, setGender] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setProfileImage(file);
    }
  };

  const handlePhoneNumber = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      if (input.length <= 10) {
        setPhoneNumber(input);
      }
    }
  };

  const updateProfile = async () => {
    if (
      name === "" ||
      phoneNumber.length !== 10 ||
      address === "" ||
      gender === ""
    ) {
      return;
    }

    setLoading(true);

    const profileData = {
      fullName: name,
      phoneNumber,
      address,
      gender,
      profileImage,
    };

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("username", userName);
    // formData.append("email", email);
    // formData.append("contact", phoneNumber);
    // formData.append("address", address);
    // formData.append("location", location);
    // formData.append("birthdate", birthdate);
    // formData.append("gender", gender);

    // if (profileImage) {
    //   formData.append("profileImage", profileImage);
    // }

    try {
      
      const response = await POST("/api/user/update", profileData, { userId: userName });

      // const response = await fetch("/update-profile", {
      //   method: "POST",
      //   body: formData,
      // });

        toast.success("Profile updated successfully!");
    } catch (err) {
      console.log("Error ->", err);
      toast.error("Server Problem, Failed to Update user data.");
    }

    setLoading(false);
  };

  const getUser = async () => {
    try {

      const response = await GET("/api/user/myProfile");
      console.log(response.data);

      // const response = await fetch("/profile", {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      //   },
      // });

      if (response.data.success) {
        const { user } = await response.data;
        setName(user?.fullName || "");
        setUserName(user?.userId || "");
        setEmail(user?.email || "");
        setPhoneNumber(user?.phoneNumber || "");
        setAddress(user?.address || "");
        setLocation(user?.location || "");
        setIsWorking(user?.working || true);
        setBirthdate(user?.birthdate || "");
        setGender(user?.gender || "");
        setPreviewImage(user?.profileImage || "");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      console.log("Error ->", err);
      toast.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?nature,travel')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(8px)",
        transition: "background 0.5s ease",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "3rem",
          borderRadius: "20px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                padding: "2rem",
                textAlign: "center",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                  transform: "scale(1.02)",
                },
              }}
            >
              <label htmlFor="icon-button-file">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                  onChange={handleImageUpload}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "4px solid #FF5A5F",
                      margin: "0 auto",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <img
                      src={previewImage || "https://via.placeholder.com/120"}
                      alt="profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "all 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                </IconButton>
              </label>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", mt: 2, color: "#333" }}
              >
                {name || "No Name"}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                {userName}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                {email}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                <Phone /> {phoneNumber ? `+91 ${phoneNumber}` : ""}
              </Typography>
              {address && (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  <LocationOn /> {address}
                </Typography>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card
              sx={{
                bgcolor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                padding: "2rem",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Update Profile
              </Typography>

              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  },
                }}
              />
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={handlePhoneNumber}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                onClick={updateProfile}
                disabled={loading}
                sx={{
                  mt: 2,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TravelProfilePage;
