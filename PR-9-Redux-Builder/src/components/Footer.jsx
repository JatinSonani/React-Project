import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box 
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        textAlign: "center",
        py: 1,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Google Keep Clone | Built with ❤️ by [ Jatin Sonani ]
      </Typography>
    </Box>
  );
}

export default Footer;
