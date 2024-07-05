import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { addPurchaseToFirestore } from '../../services/Firebase'; 
import sendPurchaseConfirmation from '../../services/sendMail'; 
import '../../styles/CheckoutForm.css';

function CheckoutForm() {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    dni: '', 
  });

  const totalPrice = cart.reduce((total, item) => total + item.precio * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in form) {
      if (!form[key]) {
        alert(`Por favor completa el campo ${key}.`);
        return;
      }
    }

    if (cart.length === 0) {
      alert('No hay productos en el carrito.');
      return;
    }

    const purchaseDate = new Date();

    const purchase = {
      ...form,
      totalPrice,
      itemCount: cart.length,
      purchaseDate,
      items: cart, 
    };

    try {
      const purchaseId = await addPurchaseToFirestore(purchase, cart);
      console.log('Compra realizada con éxito, ID:', purchaseId);
      clearCart();
      setForm({ 
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        dni: '',
      });

      await sendPurchaseConfirmation(cart, totalPrice, purchaseDate, form.firstName, form.email);

      alert('¡Compra realizada con éxito! Se ha enviado un correo electrónico con los detalles de tu compra.');

    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Error al realizar la compra, por favor intenta de nuevo');
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <label htmlFor="firstName">Nombre:</label>
      <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />

      <label htmlFor="lastName">Apellidos:</label>
      <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />

      <label htmlFor="email">Correo Electrónico:</label>
      <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />

      <label htmlFor="dni">DNI:</label>
      <input type="text" id="dni" name="dni" value={form.dni} onChange={handleChange} required />

      <label htmlFor="address">Dirección de Envío:</label>
      <textarea id="address" name="address" value={form.address} onChange={handleChange} required></textarea>
      <br></br>

      <h3>Resumen del Pedido</h3>
      <p className="total-price">Precio Total: S/ {totalPrice}</p>

      <button type="submit">Pagar</button>
    </form>
  );
}

export default CheckoutForm;
