import React from 'react';
import '../static/css/ItemListContainer.css'; 

function ItemListContainer({ greeting }) {

  const products = [
    { id: 1, name: 'Producto 1', price: 10.99, imageUrl: 'https://hmperu.vtexassets.com/arquivos/ids/4491038-600-900?v=638514489979200000&width=600&height=900&aspect=true' },
    { id: 2, name: 'Producto 2', price: 19.99, imageUrl: 'https://hmperu.vtexassets.com/arquivos/ids/3813211-600-900?v=638274336319000000&width=600&height=900&aspect=true' },
    { id: 3, name: 'Producto 3', price: 15.99, imageUrl: 'https://hmperu.vtexassets.com/arquivos/ids/4221147-600-900?v=638419934725530000&width=600&height=900&aspect=true' },
    { id: 4, name: 'Producto 4', price: 8.99, imageUrl: 'https://hmperu.vtexassets.com/arquivos/ids/4244616-600-900?v=638420348419000000&width=600&height=900&aspect=true' },
    { id: 5, name: 'Producto 5', price: 12.99, imageUrl: 'https://hmperu.vtexassets.com/arquivos/ids/3782364-600-900?v=638262264474400000&width=600&height=900&aspect=true' },
    { id: 6, name: 'Producto 6', price: 14.99, imageUrl: 'https://hmperu.vtexassets.com/arquivos/ids/3811521-600-900?v=638274310928100000&width=600&height=900&aspect=true' },
    { id: 7, name: 'Producto 7', price: 9.99, imageUrl: 'https://hmperu.vtexassets.com/arquivos/ids/4312983-600-900?v=638443643033630000&width=600&height=900&aspect=true' },
    { id: 8, name: 'Producto 8', price: 17.99, imageUrl: 'https://hmperu.vtexassets.com/arquivos/ids/4079152-483-725?v=638328769583170000&width=483&height=725&aspect=true' },
    { id: 9, name: 'Producto 9', price: 11.99, imageUrl: 'https://hmperu.vtexassets.com/arquivos/ids/4251733-600-900?v=638422057584800000&width=600&height=900&aspect=true' },
  ];

  return (
    <div className="container mt-4">
      <h2>{greeting}</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card my-card">
              <img src={product.imageUrl} className="card-img-top" alt={product.name} />
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Precio: ${product.price}</p>
                <button className="btn btn-primary">Comprar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ItemListContainer;
