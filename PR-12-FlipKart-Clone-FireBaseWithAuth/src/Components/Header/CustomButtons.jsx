import React, { useState } from "react";
import { Box, Typography, Badge, Button, Menu, MenuItem, styled } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginDialog from "../Login/LoginDialog";
import { logOutAsync } from "../../redux/actions/authAction";

const Container = styled(Link)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: { display: "block" },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  margin: "0 3% 0 auto",
  display: "flex",
  alignItems: "center",
  "& > *": {
    marginRight: "40px !important",
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: 12,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      color: "#2874f0",
      display: "flex",
      flexDirection: "column",
      marginTop: 10,
    },
  },
  [theme.breakpoints.down("sm")]: { display: "block" },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: "#2874f0",
  background: "#FFFFFF",
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 2,
  padding: "5px 40px",
  height: 32,
  boxShadow: "none",
  [theme.breakpoints.down("sm")]: {
    background: "#2874f0",
    color: "#FFFFFF",
  },
}));

const CustomButtons = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartDetails = useSelector((state) => state.cart);
  const { cartItems } = cartDetails;

  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  // ✅ Open Login Dialog
  const openDialog = () => {
    setOpen(true);
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    dispatch(logOutAsync());
    setMenuAnchor(null);
  };

  // ✅ Toggle Menu Open
  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  return (
    <Wrapper>
      {/* ✅ Show Login button when user is not logged in */}
      {!user ? (
        <LoginButton variant="contained" onClick={openDialog}>
          Login
        </LoginButton>
      ) : (
        <>
          {/* ✅ Email Button (Opens Menu) */}
          <Button
            onClick={handleMenuOpen}
            variant="contained"
            sx={{ background: "#FFFFFF", color: "#2874f0", textTransform: "none" }}
          >
            {user.displayName || user.email}
          </Button>

          {/* ✅ Logout Menu */}
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      )}

      <Typography component={Link} to="/addproduct" sx={{ marginTop: 0, whiteSpace: "nowrap" }}>
        Add Product
      </Typography>
      <Typography sx={{ marginTop: 0 }}>More</Typography>

      {/* ✅ Cart Section */}
      <Container to="/cart">
        <Badge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCart />
        </Badge>
        <Typography sx={{ marginLeft: 1 }}>Cart</Typography>
      </Container>

      {/* ✅ Login Dialog */}
      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default CustomButtons;
