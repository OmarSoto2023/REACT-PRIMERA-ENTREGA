import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import CartItem from './CartItem';
import CheckoutForm from './CheckutForm';
import '../../styles/Cart.css';

function Cart() {
  const { cart, removeFromCart, updateCartItem } = useContext(CartContext);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleUpdateCartItem = (itemId, quantity) => {
    updateCartItem(itemId, quantity);
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemoveFromCart}
                onUpdate={handleUpdateCartItem}
              />
            ))
          )}
        </div>
        <div className="checkout-section">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}

export default Cart;
