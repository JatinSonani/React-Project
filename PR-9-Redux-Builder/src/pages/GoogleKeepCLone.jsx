import React from "react";
import { Provider } from "react-redux";
import { Container, Typography } from "@mui/material"; // ✅ Import MUI components
import store from "./redux/store";
import NoteInput from "./components/NoteInput";
import NotesList from "./components/NotesList";

function GoogleKeepClone() {
  return (
    <Provider store={store}>
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Google Keep Clone
        </Typography>
        <NotesList />
      </Container>
    </Provider>
  );
}

export default GoogleKeepClone;
