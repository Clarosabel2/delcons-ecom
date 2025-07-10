import {
    collection,
    addDoc,
    setDoc,
    getDocs,
    where,
    query,
    getDoc,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../core/services/firebase/firestore";
import { IProduct } from "../models/IProduct";

export async function getAllProducts(): Promise<IProduct[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products: IProduct[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data() as Omit<IProduct, "id">;
            products.push({ ...data, id: doc.id });
        });

        return products;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
}

export async function getAllProductsByCurrentUser(): Promise<IProduct[]> {
    try {
        const productsRef = collection(db, "products");
        const q = query(
            productsRef,
            where("ownerId", "==", auth.currentUser?.uid)
        );
        const querySnapshot = await getDocs(q);

        const products: IProduct[] = querySnapshot.docs.map((doc) => {
            const data = doc.data() as IProduct;
            return {
                ...data,
                id: doc.id,
            };
        });

        return products;
    } catch (error) {
        console.error("Error al obtener productos por ownerId:", error);
        throw error;
    }
}

export async function getAllProductsByOwnerId(): Promise<IProduct[]> {
    try {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error("Usuario no autenticado");

        const q = query(
            collection(db, "products"),
            where("ownerId", "==", uid)
        );
        const snapshot = await getDocs(q);

        const products: IProduct[] = [];

        snapshot.forEach((doc) => {
            const data = doc.data() as Omit<IProduct, "id">;
            products.push({ ...data, id: doc.id });
        });

        return products;
    } catch (error) {
        console.error("Error al obtener productos del usuario:", error);
        return [];
    }
}

export async function getProductById(id: string): Promise<IProduct> {
    try {
        const docRef = doc(db, "products", id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            throw new Error("Producto no encontrado");
        }

        const data = snapshot.data() as Omit<IProduct, "id">;
        return { ...data, id: snapshot.id };
    } catch (error) {
        console.error("Error al obtener producto:", error);
        throw error;
    }
}

export async function getProductsByCategories(categoriesSelected: string[]): Promise<IProduct[]> {
    if (categoriesSelected.length === 0) return [];
    const q = query(
        collection(db, "products"),
        where("category", "in", categoriesSelected.slice(0, 10))
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<IProduct, "id">),
    }));
}

export async function addProduct(
    product: Omit<IProduct, "id">
): Promise<string> {
    try {
        const ownerId = auth.currentUser?.uid;
        if (!ownerId) throw new Error("Usuario no autenticado");

        const productWithOwner = {
            ...product,
            ownerId,
        };

        const docRef = await addDoc(
            collection(db, "products"),
            productWithOwner
        );
        console.log("Producto creado con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
    }
}

export async function deleteProductById(id: string): Promise<void> {
    try {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
        console.log(`Producto con ID ${id} eliminado correctamente.`);
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        throw error;
    }
}

export async function updateProductById(
    id: string,
    product: IProduct
): Promise<void> {
    try {
        const docRef = doc(db, "products", id);
        const { id: _, ...productData } = product; // quitamos el id antes de actualizar
        await updateDoc(docRef, productData);
        console.log(`Producto con ID ${id} actualizado correctamente.`);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        throw error;
    }
}
