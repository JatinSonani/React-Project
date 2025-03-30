import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsync } from "../redux/actions/authAction";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Box,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isCreated, error } = useSelector((state) => state.userReducer);

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputData.email.includes("@") || inputData.password.length < 6) {
        alert("Please enter a valid email and a password with at least 6 characters.");
        return;
    }

    dispatch(registerUserAsync(inputData));
};


  useEffect(() => {
    if (isCreated) {
      navigate("/");
    }
  }, [isCreated, navigate]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register User
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          type="email"
          name="email"
          value={inputData.email}
          onChange={handleChanged}
          label="Enter Email"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          value={inputData.password}
          onChange={handleChanged}
          label="Enter Password"
          variant="outlined"
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account? <Link to="/signin">Login</Link>
      </Typography>
    </Container>
  );
};

export default Register;
