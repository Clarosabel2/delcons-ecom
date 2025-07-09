import { doc, getDoc } from "firebase/firestore";
import { db } from "../../core/services/firebase/firestore";
import { IUser } from "../models/IUser";

export const getUserData = async (uid: string): Promise<Partial<IUser>> => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Usuario no encontrado");
  }
  return docSnap.data() as Partial<IUser>;
};
