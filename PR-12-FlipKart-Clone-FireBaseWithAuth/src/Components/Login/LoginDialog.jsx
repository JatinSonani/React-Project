import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Button,
  Typography,
  styled,
} from "@mui/material";
import {
  registerUserAsync,
  loginUserAsync,
  loginWithGoogle,
} from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const Component = styled(DialogContent)`
  height: 70vh;
  width: 90vh;
  padding: 0;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const CreateAccount = styled(Typography)`
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Error = styled(Typography)`
  font-size: 12px;
  color: #ff6161;
  margin-top: 10px;
  font-weight: 600;
`;

const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center no-repeat;
  width: 40%;
  height: 100%;
  padding: 45px 35px;
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 600;
  }
`;

const loginInitialValues = { email: "", password: "" };
const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const accountInitialValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here",
    subHeading: "Signup to get started",
  },
};

const LoginDialog = ({ open, setOpen, setAccount }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState("");
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const dispatch = useDispatch();

  useEffect(() => {
    setError("");
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    if (!login.email || !login.password) {
      setError("Please fill in all fields");
      return;
    }
    const response = await dispatch(loginUserAsync(login));
    if (!response) setError("Invalid email or password");
    else {
      setError("");
      handleClose();
      setAccount(login.email);
    }
  };

  const signupUser = async () => {
    if (!signup.email || !signup.password) {
      setError("Please fill in all fields");
      return;
    }
    await dispatch(registerUserAsync(signup));
    handleClose();
    setAccount(signup.username);
  };

  const toggleSignup = () => toggleAccount(accountInitialValues.signup);
  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
};

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.subHeading}
            </Typography>
          </Image>
          {account.view === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                name="email"
                label="Enter Email"
                onChange={onValueChange}
              />
              <TextField
                variant="standard"
                type="password"
                name="password"
                label="Enter Password"
                onChange={onValueChange}
              />
              {error && <Error>{error}</Error>}
              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Text>
              <LoginButton onClick={loginUser}>Login</LoginButton>
              <Text style={{ textAlign: "center" }}>OR</Text>
              <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
              <CreateAccount onClick={toggleSignup}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                name="firstname"
                label="Enter Firstname"
                onChange={onInputChange}
              />
              <TextField
                variant="standard"
                name="lastname"
                label="Enter Lastname"
                onChange={onInputChange}
              />
              <TextField
                variant="standard"
                name="username"
                label="Enter Username"
                onChange={onInputChange}
              />
              <TextField
                variant="standard"
                name="email"
                label="Enter Email"
                onChange={onInputChange}
              />
              <TextField
                variant="standard"
                type="password"
                name="password"
                label="Enter Password"
                onChange={onInputChange}
              />
              <TextField
                variant="standard"
                name="phone"
                label="Enter Phone"
                onChange={onInputChange}
              />
              {error && <Error>{error}</Error>}
              <LoginButton onClick={signupUser}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
