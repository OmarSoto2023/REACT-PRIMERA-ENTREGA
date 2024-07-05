// CartWidget.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import '../../styles/CartWidget.css'; 

function CartWidget() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart" className="nav-link">
      <span>Cart</span>
      <div className="cart-widget">
        <i className="fas fa-shopping-cart cart-icon"></i>
        {totalItems > 0 && <span className="badge badge-pill badge-primary cart-badge">{totalItems}</span>}
      </div>
    </Link>
  );
}

export default CartWidget;
