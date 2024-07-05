import React, { useState } from 'react';
import '../../styles/CartItem.css';

function CartItem({ item, onRemove, onUpdate }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    onUpdate(item.id, newQuantity);
  };

  const subtotal = item.precio * quantity;

  return (
    <div className="cart-item">
      <div className="item-details">
        <h3 className="item-name">{item.nombre}</h3>
        <div className="item-info">
          <img src={item.imagenProducto} alt={item.nombre} className="cart-item-image" />
          <p className="item-price">Precio Unitario: S/ {item.precio}</p>
          <div className="item-quantity">
            <label htmlFor={`quantity-${item.id}`}>Cantidad:</label>
            <input
              type="number"
              id={`quantity-${item.id}`}
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <p className="item-subtotal">Subtotal: S/ {subtotal}</p>
        </div>
      </div>
      <button onClick={() => onRemove(item.id)} className="remove-button">Eliminar</button>
    </div>
  );
}

export default CartItem;
