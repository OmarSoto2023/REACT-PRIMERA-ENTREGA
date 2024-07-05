// ItemDetailContainer.js

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/Firebase';
import { CartContext } from '../../contexts/CartContext';
import '../../styles/ItemDetailContainer.css';

function ItemDetailContainer() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 }); 
    console.log(`Añadir al carrito: ${product.id}`);
  };

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="item-detail-container">
      <div className="product-card">
        <div className="product-image">
          <img src={product.imagenProducto} alt={product.nombre} />
        </div>
        <div className="product-details">
          <h2>{product.nombre}</h2>
          <p>Precio: S/ {product.precio}</p>
          <p>{product.descripción}</p>
          <button onClick={() => handleAddToCart(product)}>Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
