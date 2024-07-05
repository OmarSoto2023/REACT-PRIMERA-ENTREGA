import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemlist/ItemListContainer';
import ItemDetailContainer from './components/itemlist/ItemDetailContainer';
import Cart from './components/cart/Cart';
import CheckoutForm from './components/cart/CheckutForm';
import { CartProvider } from './contexts/CartContext';
import { loadProductsToFirestore } from './services/Firebase'; // Importa la función para cargar productos


function App() {

  useEffect(() => {
    // Carga los productos en Firebase al inicio de la aplicación
    loadProductsToFirestore();
  }, []);

  return (
    <Router>
      <CartProvider>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/catalog" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
