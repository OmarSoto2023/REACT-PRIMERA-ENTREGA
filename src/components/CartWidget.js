import React from 'react';
import PropTypes from 'prop-types'; 
import '../static/css/CartWidget.css'; 

function CartWidget({ quantity }) {
  return (
    <div className="cart-widget">
      <i className="fas fa-shopping-cart cart-icon"></i>
      <span className="badge badge-pill badge-primary cart-badge">{quantity}</span> 
    </div>
  );
}

CartWidget.propTypes = {
  quantity: PropTypes.number.isRequired 
};

export default CartWidget;
