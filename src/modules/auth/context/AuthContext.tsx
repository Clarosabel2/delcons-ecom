import { createContext, useEffect, useState, useMemo, ReactNode } from "react";
import { onAuthStateChanged, getIdToken, User } from "firebase/auth";

import { IUser } from "../../user/models/IUser";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { loginWithEmail } from "../services/auth.service";
import { getUserData } from "../../user/services/user.service";
import { auth } from "../../core/services/firebase/firestore";
import LogoutModal from "../components/LogoutModal";

interface AuthContextType {
    user: IUser | null;
    accessToken: string | null;
    login: (credentials: LoginRequest) => void;
    logout: () => void;
    isLogin: boolean;
    isInitialized: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const token = await getIdToken(firebaseUser);
                try {
                    const userData = await getUserData(firebaseUser.uid);

                    const newUser: IUser = {
                        uid: firebaseUser.uid,
                        email: userData.email ?? "",
                        username: userData.username ?? "",
                        photoImage:
                            userData.photoImage ??
                            "https://www.pngall.com/wp-content/uploads/15/User-PNG-Photos.png",
                        firstName: userData.firstName ?? "",
                        lastName: userData.lastName ?? "",
                        gender: userData.gender ?? "",
                        role: userData.role,
                    };

                    setUser(newUser);
                    setAccessToken(token);
                    setIsLogin(true);
                } catch (err) {
                    console.error("Error cargando datos de usuario:", err);
                    setUser(null);
                }
            } else {
                setUser(null);
                setAccessToken(null);
                setIsLogin(false);
            }
            setIsInitialized(true);
        });

        return () => unsubscribe();
    }, []);

    const login = async (credentials: LoginRequest) => {
        const firebaseUser = await loginWithEmail(credentials);
        const token = await firebaseUser.getIdToken();
        const userData = await getUserData(firebaseUser.uid);
        const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

        const user: IUser = {
            uid: firebaseUser.uid,
            email: userData.email ?? "",
            username: userData.username ?? "",
            photoImage:
                userData.photoImage ??
                "https://www.pngall.com/wp-content/uploads/15/User-PNG-Photos.png",
            firstName: userData.firstName ?? "",
            lastName: userData.lastName ?? "",
            gender: userData.gender ?? "",
            role: userData.role,
        };

        setUser(user);
        setAccessToken(token);
        setIsLogin(true);
    };

    const logout = () => {
        setShowLogoutConfirm(true);
    };

    // Confirmación real de logout
    const confirmLogout = async () => {
        setShowLogoutConfirm(false);
        await auth.signOut();
        setUser(null);
        setAccessToken(null);
        setIsLogin(false);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const value = useMemo(
        () => ({
            user,
            accessToken,
            login,
            logout,
            isLogin,
            isInitialized,
        }),
        [user, accessToken, isLogin, isInitialized]
    );

    if (!isInitialized) return <LoadingSpinner />;

    return (
        <AuthContext.Provider value={value}>
            {children}
            {showLogoutConfirm && (
                <LogoutModal
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                />
            )}
        </AuthContext.Provider>
    );
};
