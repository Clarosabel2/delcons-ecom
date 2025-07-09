import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../core/services/firebase/firestore";

export const loginWithEmail = async (credentials: LoginRequest) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.username,
            credentials.password
        );
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const register = async (credentials: LoginRequest) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.username,
        credentials.password
    );
    return userCredential;
};
