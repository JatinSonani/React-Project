import React from "react";
import { Container, Grid, Typography, Link, Box } from "@mui/material";
import { Facebook, Twitter, YouTube, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#172337", color: "white", padding: "20px 0" }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>About</Typography>
            <Link href="#" color="inherit" display="block" underline="none">Contact Us</Link>
            <Link href="#" color="inherit" display="block" underline="none">About Us</Link>
            <Link href="#" color="inherit" display="block" underline="none">Careers</Link>
            <Link href="#" color="inherit" display="block" underline="none">Flipkart Stories</Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Help</Typography>
            <Link href="#" color="inherit" display="block" underline="none">Payments</Link>
            <Link href="#" color="inherit" display="block" underline="none">Shipping</Link>
            <Link href="#" color="inherit" display="block" underline="none">Cancellation</Link>
            <Link href="#" color="inherit" display="block" underline="none">Returns</Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Consumer Policy</Typography>
            <Link href="#" color="inherit" display="block" underline="none">Terms of Use</Link>
            <Link href="#" color="inherit" display="block" underline="none">Security</Link>
            <Link href="#" color="inherit" display="block" underline="none">Privacy</Link>
            <Link href="#" color="inherit" display="block" underline="none">Sitemap</Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Follow Us</Typography>
            <Box>
              <Link href="#" color="inherit" sx={{ mr: 2 }}><Facebook /></Link>
              <Link href="#" color="inherit" sx={{ mr: 2 }}><Twitter /></Link>
              <Link href="#" color="inherit" sx={{ mr: 2 }}><YouTube /></Link>
              <Link href="#" color="inherit"><Instagram /></Link>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: "center", marginTop: 3, borderTop: "1px solid gray", paddingTop: 2 }}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} Flipkart Clone. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
