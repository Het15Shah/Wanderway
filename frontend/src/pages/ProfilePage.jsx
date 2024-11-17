import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Camera from "@mui/icons-material/Camera";
import Phone from "@mui/icons-material/Phone";
import LocationOn from "@mui/icons-material/LocationOn";
import Home from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import useAPI from "../hooks/useAPI";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKey from "@mui/icons-material/VpnKey";
import ExitToApp from "@mui/icons-material/ExitToApp";
import axios from "axios";

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

  const handleRemoveImage = () => {
    setPreviewImage("");
    setProfileImage(null);
  };

  const handlePhoneNumber = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 10) {
      setPhoneNumber(input);
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
    // const profileData = {
    //   fullName: name,
    //   phoneNumber,
    //   address,
    //   gender,
    //   profileImage,
    // };

    const userData = new FormData();
    userData.append("fullName", name);
    userData.append("phoneNumber", phoneNumber);
    userData.append("address", address);
    userData.append("gender", gender);
    userData.append("profileImage", profileImage);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/update?userId=${userName}`,
        userData,
        { headers }
      );
      toast.success("Profile updated successfully!");
      console.log("response", response);
    } catch (err) {
      console.log("Error ->", err);
      toast.error("Server Problem, Failed to Update user data.");
    }
    setLoading(false);
  };

  const getUser = async () => {
    try {
      const response = await GET("/api/user/myProfile");
      if (response.data.success) {
        const { user } = response.data;
        setName(user?.fullName || "");
        setUserName(user?.userId || "");
        setEmail(user?.email || "");
        setPhoneNumber(user?.phoneNumber || "");
        setAddress(user?.address || "");
        setIsWorking(user?.working || true);
        setBirthdate(user?.birthdate || "");
        setGender(user?.gender || "");
        setPreviewImage(user?.profileImageURL || "");
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

  // Common styles for text fields and select
  const commonInputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      backgroundColor: "#ffffff",
      border: "1px  #ffcc00",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 0 100px rgba(255, 204, 0, 0.6)",
        "& > fieldset": {
          borderColor: "#ffcc00 !important",
        },
      },
      "&.Mui-focused": {
        boxShadow: "0 0 100px rgba(255, 204, 0, 0.6)",
        "& > fieldset": {
          borderColor: "#ffcc00 !important",
          borderWidth: "2px",
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: "#666666",
      "&.Mui-focused": {
        color: "#000000",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  };

  return (
    <Box
      sx={{
        height: "auto",
      }}
    >
      <Box
        sx={{
          // minHeight: "100vh",
          height: "800px",
          display: "flex",
          bgcolor: "#f8f9fa",
          // bgcolor:"red",
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: "280px",
            bgcolor: "transparent",
            height: "80vh",
            mt: 5,
          }}
        >
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Box
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                margin: "0 auto",
                mb: 2,
              }}
            >
              <label htmlFor="icon-button-file">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <Box
                  component="img"
                  src={
                    previewImage ||
                    "https://i.pinimg.com/originals/0b/92/d1/0b92d122704719c982d182c0f19f4513.png"
                  }
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    cursor: "pointer",
                    objectFit: "cover",
                    bgcolor: "#fff",
                    border: "1px solid #e9ecef",
                  }}
                />
              </label>
              {previewImage && (
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    bgcolor: "white",
                    border: "1px solid #e9ecef",
                    "&:hover": { bgcolor: "#f8f9fa" },
                  }}
                  onClick={handleRemoveImage}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Typography sx={{ fontWeight: 500, color: "#495057" }}>
              {name || "John Doe"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#6c757d", mt: 0.5 }}>
              {email || "john@example.com"}
            </Typography>
          </Box>

          <List sx={{ p: 2 }}>
            <ListItem
              button
              component="a"
              href="/"
              sx={{
                bgcolor: "#fff",
                boxShadow: "none",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                mb: 1,
                color: "#495057",
                fontSize: "1rem",
                fontWeight: "500",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                "&.Mui-selected, &:hover": {
                  bgcolor: "#007bff",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#007bff" }}>
                <Home fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="/login"
              sx={{
                mb: 1,
                bgcolor: "#fff",
                boxShadow: "none",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                color: "#495057",
                fontSize: "1rem",
                fontWeight: "500",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                "&.Mui-selected, &:hover": {
                  bgcolor: "#007bff",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#1976d2" }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="/signup"
              sx={{
                mb: 1,
                bgcolor: "#fff",
                boxShadow: "none",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                color: "#495057",
                fontSize: "1rem",
                fontWeight: "500",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                "&.Mui-selected, &:hover": {
                  bgcolor: "#007bff",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#1976d2" }}>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Delete Account" />
            </ListItem>
          </List>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "700px",
            flex: 1,
            p: 3,
          }}
        >
          <Card
            sx={{
              p: 3,
              width: "100%",
              bgcolor: "#fff",
              boxShadow: "none",
              border: "1px solid #e9ecef",
              borderRadius: "8px",
              bgcolor: "#fff5e6",
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", mb: 4, color: "#ffcc00" }}
            >
              Update Profile
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  size="small"
                  margin="normal"
                  sx={commonInputStyles}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Username"
                  value={userName}
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={commonInputStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={email}
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={commonInputStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                  sx={commonInputStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  sx={commonInputStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: "#666666" }}>Gender</InputLabel>
                  <Select
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    sx={commonInputStyles}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={updateProfile}
                  disabled={loading}
                  sx={{
                    bgcolor: "#ffcc00",
                    color: "#000000",
                    textTransform: "none",
                    py: 1,
                    borderRadius: 1,
                    "&:hover": {
                      bgcolor: "#e6b800",
                    },
                  }}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default TravelProfilePage;
