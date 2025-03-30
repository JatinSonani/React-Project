import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  fetchCart,
} from "../../redux/actions/cartActions";
import { auth } from "../../server/firebaseConfig";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import { useLocation } from "react-router-dom";
import { getProductById } from "../../service/api";

const Component = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    padding: "15px 0",
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 15,
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cartDetails.cartItems || []);

  const [userID, setUserId] = useState(null);

  const location = useLocation(); // Get location object
  const productId = location.state?.productId; // Retrieve productId from state

  console.log("cartItems :>> ", cartItems, cartDetails, productId);

  useEffect(() => {
    // Fetch authenticated user ID from Firebase
    setUserId(auth.currentUser ? auth.currentUser.uid : null); // Get user ID from Firebase Auth
  }, [productId]);

  console.log("userID :>> ", userID);

  // const data = getCartFromFirebase(userID);
  // console.log("data :>> ", data);


  
  // useEffect(() => {
  //   if (productId) {
  //     const fetchProduct = async () => {
  //       const data = await getProductById(productId);
  //       console.log("data :>> ", data);
  //       if (data) {
  //         setCartItems(...cartItems, data);
  //       }
  //     };
  //     fetchProduct();
  //   }
  // }, [productId, cartItems]);

  useEffect(() => {
    if (userID) {
      dispatch(fetchCart(userID));
    }
  }, [dispatch, userID]);

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id, userID));
  };

  const buyNow = () => {
    alert("Proceeding to Checkout!");
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <Component container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                My Cart ({cartItems.length})
              </Typography>
            </Header>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeItemFromCart={removeItemFromCart}
              />
            ))}
            <BottomWrapper>
              <StyledButton onClick={buyNow} variant="contained">
                Place Order
              </StyledButton>
            </BottomWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView cartItems={cartItems} />
          </Grid>
        </Component>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
