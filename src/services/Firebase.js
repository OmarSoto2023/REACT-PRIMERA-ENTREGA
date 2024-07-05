import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc , query, where, Timestamp ,doc } from "firebase/firestore";
import { products } from "./data";

const firebaseConfig = {
  apiKey: "AIzaSyDGlX6b4NQl0D-RbySiZiUTXWNg-kZ579s",
  authDomain: "proyectofinalsotoquintanilla.firebaseapp.com",
  projectId: "proyectofinalsotoquintanilla",
  storageBucket: "proyectofinalsotoquintanilla.appspot.com",
  messagingSenderId: "816421138580",
  appId: "1:816421138580:web:5b795f1a5572022e0c4481",
  measurementId: "G-4ZEJRLR8LW"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export const getItemsFromDatabase = async () => {
  try {
    const itemsRef = collection(db, 'products');
    const snapshot = await getDocs(itemsRef);
    const itemsData = snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data() 
    }));
    console.log("Datos obtenidos de Firestore:", itemsData);
    return itemsData;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const loadProductsToFirestore = async () => {
  try {
    const docRef = doc(db, 'products', 'products');
    const snapshot = await getDoc(docRef);

    if (snapshot.data()) {
      const itemsRef = collection(db, 'products');

      if (!snapshot.exists) {
        console.log("El documento 'products' no existe en Firestore. Se van a agregar productos.");
      } else {
        console.log("El documento 'products' existe en Firestore pero está vacío. Se van a agregar productos.");
      }

      // Agregar productos
      for (const product of products) {
        await addDoc(itemsRef, product);
        console.log("Producto añadido:", product);
      }

      console.log("Se han agregado todos los productos correctamente.");
    } else {
      console.log("El documento 'products' ya existe y no está vacío en Firestore, no se han agregado nuevos productos.");
    }
  } catch (error) {
    console.error("Error al cargar productos en Firestore:", error);
    throw error;
  }
};


export const getProductById = async (productId) => {
  try {
    const itemsRef = collection(db, 'products');
    const q = query(itemsRef, where('id', '==', productId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return null;
    }

    const docSnapshot = querySnapshot.docs[0];
    return { id: docSnapshot.id, ...docSnapshot.data() };
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const addPurchaseToFirestore = async (compra, itemsCarrito) => {
  try {
    const compraRef = await addDoc(collection(db, 'compras'), {
      ...compra,
      fechaCompra: Timestamp.fromDate(new Date())
    });

    const idCompra = compraRef.id;

    for (const item of itemsCarrito) {
      await addDoc(collection(db, `compras/${idCompra}/detalles`), {
        idProducto: item.id,
        nombreProducto: item.nombre,
        precioProducto: item.precio,
        cantidad: item.quantity,
        subtotal: item.precio * item.quantity,
        dniCliente: compra.dni
      });
    }

    return idCompra;
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    throw error;
  }
};

export default db;
