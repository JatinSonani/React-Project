import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../server/firebaseConfig";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";


const auth = getAuth();



export const authenticateSignup = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        email = email.trim();
        password = password.trim();

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;

    } catch (error) {
        console.error("Error during signup:", error.message);

        if (error.code === "auth/email-already-in-use") {
            throw new Error("This email is already registered. Please log in instead.");
        } else if (error.code === "auth/weak-password") {
            throw new Error("Password should be at least 6 characters long.");
        } else if (error.code === "auth/invalid-email") {
            throw new Error("Invalid email format. Please enter a valid email.");
        }

        throw error; 
    }
};


export const authenticateLogin = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
        return userCredential.user;
    } catch (error) {
        console.error("Error during login:", error.message);
        throw error;
    }
};

// ** Add Product to Firestore **
export const addProduct = async (product) => {
    try {
        const docRef = await addDoc(collection(db, "products"), product);
        return { id: docRef.id, ...product };
    } catch (error) {
        console.error("Error adding product:", error.message);
        return null;
    }
};

export const getProductById = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            return { id, ...productSnap.data() };
        } else {
            console.warn("Product not found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching product:", error.message);
        return null;
    }
};

export const addToCart = (id, quantity = 1, userId = user.id) => async (dispatch, getState) => {
    try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            const productData = productSnap.data();

            const cartItem = {
                id,
                title: productData.title || "No Title",
                price: productData.price || 0,
                image: productData.image || "",
                quantity,
                userId,
            };

            dispatch({
                type: "ADD_TO_CART",
                payload: cartItem,
            });

            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
        } else {
            console.error("Product not found!");
        }
    } catch (error) {
        console.error("Error fetching product:", error);
    }
};