import { useDispatch } from "react-redux";
import { auth } from "../server/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setCurrentUser(user);
            }
        });

        return unsubscribe;
    }, []);

    return {currentUser};
}

export default useAuth;