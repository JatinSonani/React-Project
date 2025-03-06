import React, { useState } from "react";
import { Provider } from "react-redux";
import { Container, Typography } from "@mui/material";
import store from "./redux/store";
import NoteInput from "./components/NoteInput";
import NotesList from "./components/NotesList";
import "../src/Style.css"
import Footer from "./components/Footer";

function App() {
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index, noteText) => {
    setEditIndex(index);
    setText(noteText);
  };

  return (
    <Provider store={store}>
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Google Keep Clone
        </Typography>
        <NoteInput 
          text={text} 
          setText={setText} 
          editIndex={editIndex} 
          setEditIndex={setEditIndex} 
        />
        <NotesList onEdit={handleEdit} />
      </Container>
      <Footer /> 
    </Provider>
  );
}

export default App;
