import React from 'react';
import { Box, Grid, TextField, Button, Typography, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const nevigate = useNavigate();
    return (
        <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', bgcolor: '#f0f2f5' }}>
            <Paper elevation={3} sx={{ width: '80%', maxWidth: 900, p: 4, display: 'flex', borderRadius: 2 }}>
                {/* Left Side - Form */}
                <Box sx={{ flex: 1, p: 3 }}>
                    <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
                        Login
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            sx={{ bgcolor: 'background.default', borderRadius: 1 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            sx={{ bgcolor: 'background.default', borderRadius: 1 }}
                        />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            sx={{ mt: 2 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                fontWeight: 'bold',
                                bgcolor: 'primary.main',
                                '&:hover': { bgcolor: 'primary.dark' },
                            }}
                        >
                            Login
                        </Button>
                        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                            Don't have an account? <Button variant="text" color="primary" onClick={()=>{nevigate("/signup")}}>Sign Up</Button>
                        </Typography>
                    </Box>
                </Box>

                {/* Right Side - Illustration */}
                <Box
                    sx={{
                        flex: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 3,
                    }}
                >
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/007/509/090/small_2x/a-flying-paper-airplane-origami-a-symbol-of-a-startup-development-and-undertaking-doodle-hand-drawn-black-and-white-illustration-the-design-elements-are-isolated-on-a-white-background-vector.jpg" // Replace with your own image URL or local path
                        alt="Illustration"
                        style={{ width: '80%', maxWidth: '350px' }}
                    />
                </Box>
            </Paper>
        </Grid>
    );
}

export default LoginPage;
