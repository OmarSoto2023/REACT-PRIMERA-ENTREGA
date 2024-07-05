import emailjs from 'emailjs-com';

const serviceId = 'service_alv5415';
const templateId = 'template_u0iihtf';
const userId = 'n7EgLytjdjLOIss2R';

async function sendPurchaseConfirmation(items, totalPrice, purchaseDate, firstName, email) {
  try {
    let htmlItems = '';
    items.forEach(item => {
      htmlItems += `
        <p><strong>Producto:</strong> ${item.nombre}</p>
        <p><strong>Cantidad:</strong> ${item.quantity}</p>
        <p><strong>Precio Unitario:</strong> S/ ${item.precio}</p>
        <p><strong>Subtotal:</strong> S/ ${item.precio * item.quantity}</p>
        <br>
      `;
    });


    const templateParams = {
      firstName: firstName,
      html_items: htmlItems,
      totalPrice: totalPrice,
      purchaseDate: purchaseDate,
      to_email: email
    };

    const response = await emailjs.send(serviceId, templateId, templateParams, userId);

    console.log('Correo electrónico enviado correctamente:', response);
    return { success: true, data: response };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error: error };
  }
}

export default sendPurchaseConfirmation;
