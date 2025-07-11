import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Container maxWidth="sm">
      {/* Header */}
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bgcolor="white"
        mt={5}
        borderRadius={2}
        boxShadow={3}
      >
        <Typography variant="h4" fontFamily="Work Sans" color="black">
          Chatty
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            icon={<PersonIcon />}
            label="Login"
            iconPosition="start"
            sx={{ fontWeight: 600 }}
          />
          <Tab
            icon={<HowToRegIcon />}
            label="Sign Up"
            iconPosition="start"
            sx={{ fontWeight: 600 }}
          />
        </Tabs>

        {/* Tab Panels */}
        {tabIndex === 0 && (
          <Box mt={3}>
            <Login />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box mt={3}>
            <Signup />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;
