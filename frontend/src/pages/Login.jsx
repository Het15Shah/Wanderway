import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import { toast } from "react-hot-toast";
import { isValidEmail } from "../utils/validators";
import Cookies from "js-cookie";


function LoginPage() {
  const navigate = useNavigate();
  const { POST } = useAPI();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [justVerify, setJustVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setJustVerify(true);

    if (!isValidEmail(email) || password.length < 8) return;

    setLoading(true);

    const loginCredentials = { email, password };

    try {
      const response = await POST("/api/user/signin", loginCredentials);

      if (response.data.success === true) {
        Cookies.set("token", response.data.token);

        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error signing up:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f0f2f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "80%",
          maxWidth: 900,
          p: 4,
          display: "flex",
          borderRadius: 2,
        }}
      >
        {/* Left Side - Form */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            gutterBottom
          >
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={justVerify && !isValidEmail(email)}
              helperText={
                justVerify && !isValidEmail(email) && "Email is not valid"
              }
              variant="outlined"
              sx={{ bgcolor: "background.default", borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              error={justVerify && password.length < 8}
              helperText={
                justVerify &&
                password.length < 8 &&
                "passoword must contain atleast 8 characters"
              }
              onChange={(e) => setPassword(e.target.value)}
              sx={{ bgcolor: "background.default", borderRadius: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: "bold",
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              {loading ? "Login..." : "Login"}
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Illustration */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/007/509/090/small_2x/a-flying-paper-airplane-origami-a-symbol-of-a-startup-development-and-undertaking-doodle-hand-drawn-black-and-white-illustration-the-design-elements-are-isolated-on-a-white-background-vector.jpg" // Replace with your own image URL or local path
            alt="Illustration"
            style={{ width: "80%", maxWidth: "350px" }}
          />
        </Box>
      </Paper>
    </Grid>
  );
}

export default LoginPage;
