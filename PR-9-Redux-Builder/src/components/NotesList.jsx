import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, restoreNote, permDeleteNote } from "../redux/actions/actions";
import { Card, Typography, Button, Grid, Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from "@mui/icons-material/Restore"; 

function NotesList({ onEdit }) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const trash = useSelector((state) => state.trash);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      {/* Notes Section */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Notes
      </Typography>
      {notes.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No notes available. Start adding some!
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {notes.map((note, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ p: 2, boxShadow: 2 }}>
                <Typography variant="body1">{note}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button size="small" onClick={() => onEdit(index, note)}>
                    ✏️ Edit
                  </Button>
                  <Button 
                    size="small" 
                    color="error" 
                    startIcon={<DeleteForeverIcon />} 
                    onClick={() => dispatch(deleteNote(index))}
                  >
                    Trash
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Trash Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Trash
      </Typography>
      {trash.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No notes in trash.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {trash.map((note, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ p: 2, boxShadow: 2, bgcolor: "grey.100" }}>
                <Typography variant="body1">{note}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button 
                    size="small" 
                    color="primary" 
                    startIcon={<RestoreIcon />} 
                    onClick={() => dispatch(restoreNote(index))}
                  >
                    Restore
                  </Button>
                  <Button 
                    size="small" 
                    color="error" 
                    startIcon={<DeleteForeverIcon />}
                    onClick={() => dispatch(permDeleteNote(index))}
                  >
                    Delete Forever
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default NotesList;
