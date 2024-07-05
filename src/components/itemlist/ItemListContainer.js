// ItemListContainer.js

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getItemsFromDatabase } from '../../services/Firebase'; 
import { CartContext } from '../../contexts/CartContext';
import '../../styles/catalogo.css'; 

function ItemListContainer() {
  const { addToCart } = useContext(CartContext); 
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
  
    const fetchItems = async () => {
      try {
        const itemsData = await getItemsFromDatabase();
        setItems(itemsData);
        setFilteredItems(itemsData); 
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);


  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === null) {
      setFilteredItems(items); 
    } else {
      const filtered = items.filter(item => item.categoria === category);
      setFilteredItems(filtered);
    }
  };


  const filterBySearchTerm = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredItems(items); 
    } else {
      const filtered = items.filter(item => 
        item.nombre.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };


  const handleAddToCart = (item, e) => {
    e.stopPropagation(); 
    addToCart({ ...item, quantity: 1 }); 
    console.log(`Añadir al carrito: ${item.id}`);
  };

  return (
    <div className="item-list-container">
      <h1>Catálogo de Productos</h1>
      <div className="filters">
        <button onClick={() => filterByCategory(null)} className={selectedCategory === null ? 'active' : ''}>
          <i className="fas fa-th"></i> Todos
        </button>
        <button onClick={() => filterByCategory('Casacas y chalecos')} className={selectedCategory === 'Casacas y chalecos' ? 'active' : ''}>
          <i className="fas fa-jacket"></i> Casacas y chalecos
        </button>
        <button onClick={() => filterByCategory('Chompas')} className={selectedCategory === 'Chompas' ? 'active' : ''}>
          <i className="fas fa-tshirt"></i> Chompas
        </button>
        <button onClick={() => filterByCategory('Blusas')} className={selectedCategory === 'Blusas' ? 'active' : ''}>
          <i className="fas fa-blouse"></i> Blusas
        </button>
        <button onClick={() => filterByCategory('Vestidos')} className={selectedCategory === 'Vestidos' ? 'active' : ''}>
          <i className="fas fa-dress"></i> Vestidos
        </button>
      </div>
      <div className="search">
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={searchTerm} 
          onChange={(e) => filterBySearchTerm(e.target.value)} 
        />
      </div>
      <div className="cards-container">
        {filteredItems.length === 0 ? (
          <p className="no-results-message">No se encontraron resultados.</p>
        ) : (
          filteredItems.map(item => (
            <div className="card" key={item.id}>
              <Link to={`/item/${item.id}`} className="card-link">
                <div className="card-content">
                  <img src={item.imagenProducto} alt={item.nombre} />
                  <div className="card-body">
                    <h2 className="card-title">{item.nombre}</h2>
                    <p className="card-text">Precio: S/ {item.precio}</p>
                  </div>
                </div>
              </Link>
              <div className="card-buttons">
                <button onClick={(e) => handleAddToCart(item, e)}>Añadir al carrito</button>
                <Link to={`/item/${item.id}`} className="view-details-link">Ver detalles</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ItemListContainer;
