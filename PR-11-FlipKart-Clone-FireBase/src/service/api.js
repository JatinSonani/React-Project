import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../server/firebaseConfig";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";


// Initialize Firebase Auth
const auth = getAuth();

// ** User Signup (Firebase Authentication) **
export const authenticateSignup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error during signup:", error.message);
    }
};

// ** User Login (Firebase Authentication) **
export const authenticateLogin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error during login:", error.message);
    }
};

// ** Get Product by ID (Firestore) **
// export const getProductById = async (id) => {
//     try {
//         const productRef = doc(db, "products", id);
//         const productSnap = await getDoc(productRef);

//         if (productSnap.exists()) {
//             return { id, ...productSnap.data() };
//         } else {
//             console.warn("Product not found");
//             return null;
//         }
//     } catch (error) {
//         console.error("Error while getting product by id:", error.message);
//     }
// };

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

export const addToCart = (id, quantity = 1) => async (dispatch, getState) => {
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