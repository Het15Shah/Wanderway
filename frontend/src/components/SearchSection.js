import React from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import { blue, orange, grey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import useAPI from '../hooks/useAPI';
import { useEffect } from "react";

// const searchedPlans = () => {
//   const {GET,POST} = useAPI();
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   useEffect(()=>{
//     const getSearchedPlans = async () =>{
//       try{
//         const {data} = await GET("/api/trip");
//         console.log("Data:- ",data);
//         setPlans(data);
//       }
//       catch(err){
//         console.log("Error:- ",err);
//       }
//     }
//     getSearchedPlans();
//   },[]);
// }

const SearchSection = () => {
  return (
    <section className="search-section" style={{
      backgroundColor: blue[50],
      padding: '80px 20px',
      textAlign: 'center',
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        style={{
          marginBottom: '40px',
          fontWeight: 600,
          color: blue[900],
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        Find Your Next Adventure
      </Typography>
      
      <Box className="search-form" style={{
        maxWidth: 900,
        margin: '0 auto',
        borderRadius: '12px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
        backgroundColor: '#ffffff',
        padding: '40px',
      }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Destination"
              InputProps={{
                startAdornment: (
                  <i className="fas fa-map-marker-alt" style={{ color: orange[500], marginRight: '8px' }} />
                ),
                style: {
                  backgroundColor: '#f8f8f8',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  paddingLeft: '16px',
                },
              }}
              style={{
                borderColor: blue[500],
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Budget"
              type="number"
              InputProps={{
                startAdornment: (
                  <i className="fas fa-dollar-sign" style={{ color: orange[500], marginRight: '8px' }} />
                ),
                style: {
                  backgroundColor: '#f8f8f8',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  paddingLeft: '16px',
                },
              }}
              style={{
                borderColor: blue[500],
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Days"
              type="number"
              InputProps={{
                startAdornment: (
                  <i className="fas fa-calendar-alt" style={{ color: orange[500], marginRight: '8px' }} />
                ),
                style: {
                  backgroundColor: '#f8f8f8',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  paddingLeft: '16px',
                },
              }}
              style={{
                borderColor: blue[500],
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{
                height: '100%',
                borderRadius: '8px',
                fontWeight: 600,
                backgroundColor: orange[500],
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: orange[600],
                },
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default SearchSection;
