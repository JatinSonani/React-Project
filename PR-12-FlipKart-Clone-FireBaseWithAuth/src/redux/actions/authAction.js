import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../../server/firebaseConfig"; // Ensure this path is correct
import { db } from "../../server/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Action Types (Use a central constants file to avoid typos)
import {
  SIGNUP_SUCCESS,
  SIGNUP_REJECT,
  SIGNIN_SUCCESS,
  SIGNIN_REJECT,
  LOGOUT
} from "../constants/authConstants";
import {
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL
} from "../constants/cartConstants";

// Action Creators
const signUpSuc = () => {
    return {
        type: "SIGNUP_SUCCESS"
    }
}
const signUpRej = (error) => {
    return {
        type: "SIGNUP_REJECT",
        payload: error
    }
}
const loginSuc = (user) => {
    return {
        type: "SIGNIN_SUCCESS",
        payload: user
    }
}
const loginRej = (error) => {
    return {
        type: "SIGNIN_REJECT",
        payload: error
    }
}
const logout = () => {
    return {
        type: "LOGOUT",
        
    }
}

// ✅ Register User
export const registerUserAsync = (data) => async (dispatch) => {
  try {
      if (!data.email || !data.password) {
          throw new Error("Email and Password are required");
      }

      let newUser = await createUserWithEmailAndPassword(
          auth,
          data.email.trim(),
          data.password.trim()
      );

    //   create a session storage for the user
        sessionStorage.setItem("user", JSON.stringify(newUser.user));

        console.log("New User Created:", newUser);

      dispatch(signUpSuc());
      return newUser.user;
  } catch (error) {
      console.error("Signup Error:", error.message);
      dispatch(signUpRej(error.message));
  }
};

// ✅ Login User with Email & Password
export const loginUserAsync = (data) => async (dispatch) => {
  try {
      let loginUser = await signInWithEmailAndPassword(
          auth,
          data.email.trim(),
          data.password.trim()
      );

        // create a session storage for the user
        sessionStorage.setItem("user", JSON.stringify(loginUser.user)); 

      console.log("Login User:", loginUser);

      dispatch(loginSuc({...loginUser.user, id: loginUser.user.uid}));
  } catch (error) {
      console.log("Login Error:", error);
      dispatch(loginRej(error.message));
  }
};

// ✅ Login with Google

// export const loginWithGoogle = () => async (dispatch) => {
//   try {
//       const provider = new GoogleAuthProvider();
//       let result = await signInWithPopup(auth, provider);

//       console.log("Google Login Result:", result);

//       if (result) {
//           let user = {
//               id: result.user.uid,
//               email: result.user.email,
//               displayName: result.user.displayName,
//           }

//           dispatch(loginSuc(user));
//       }
//   } catch (error) {
//       console.log("Google Login Error:", error);
//       dispatch(loginRej(error.message));
//   }
// };


export const loginWithGoogle = () => async (dispatch) => {
    try {
        const provider = new GoogleAuthProvider();
        let result;
  
        try {
            result = await signInWithPopup(auth, provider); // Try popup first
        } catch (popupError) {
            console.warn("Popup blocked, using redirect instead:", popupError);
            await signInWithRedirect(auth, provider); // Fallback to redirect
            return; // Exit function as redirect reloads the page
        }
  
        if (result?.user) {
            const user = {
                id: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL, // Added profile picture support
            };
  
            sessionStorage.setItem("user", JSON.stringify(user)); // Store user session
            console.log("Google Login Success:", user);
            dispatch(loginSuc(user));
        }
    } catch (error) {
        console.error("Google Login Error:", error);
        dispatch(loginRej(error.message));
    }
  };
  




// ✅ Logout User
export const logOutAsync = () => async (dispatch) => {
  try {
      await signOut(auth);
      dispatch(logout());
  } catch (error) {
      console.log("Logout Error:", error);
      dispatch(loginRej(error.message));
  }
};

// ✅ Keep User Logged In After Refresh
export const checkUserSession = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          const currentUser = {
              id: user.uid,
              email: user.email,
              displayName: user.displayName || "User",
          };
          dispatch(loginSuc(currentUser));
      } else {
          dispatch(logout());
      }
  });
};

// ✅ Fetch User Cart
export const fetchUserCart = (userId) => async (dispatch) => {
  try {
      const cartRef = doc(db, "carts", userId);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
          dispatch({ type: FETCH_CART_SUCCESS, payload: Object.values(cartSnap.data().items) });
      } else {
          dispatch({ type: FETCH_CART_SUCCESS, payload: [] });
      }
  } catch (error) {
      dispatch({ type: FETCH_CART_FAIL, payload: error.message });
  }
};