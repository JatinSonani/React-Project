import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote } from "../redux/actions/actions";
import { Card, TextField, Button, Typography, Box } from "@mui/material";

function NoteInput({ text, setText, editIndex, setEditIndex }) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const [showModifyNote, setShowModifyNote] = React.useState(false);

  const handleCreateOrUpdateNote = () => {
    if (text.trim()) {
      if (editIndex !== null) {
        dispatch(editNote(editIndex, text));
        setEditIndex(null);
        setShowModifyNote(false);
      } else {
        if (!notes.includes(text)) {
          dispatch(addNote(text));
        } else {
          alert("Note already exists!");
        }
      }
      setText("");
    }
  };

  React.useEffect(() => {
    setShowModifyNote(editIndex !== null);
  }, [editIndex]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Card sx={{ maxWidth: 500, width: "100%", p: 2, boxShadow: 3 }}>
        {showModifyNote && (
          <Typography variant="h6" textAlign="center" gutterBottom>
            Modify Note
          </Typography>
        )}
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          placeholder="Take a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            {text.length}/200
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCreateOrUpdateNote} 
            disabled={!text.trim()}
          >
            {editIndex !== null ? "Update Note" : "Create Note"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default NoteInput;
