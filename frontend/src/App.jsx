import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ text: 'Error fetching products', type: 'error' });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      setMessage({ text: 'Please fill all fields', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ text: data.message || 'Product added successfully', type: 'success' });
        setNewProduct({ name: '', price: '', stock: '' });
        setShowAddForm(false);
        fetchProducts();
      } else {
        const data = await response.json();
        setMessage({ text: `Failed: ${data.message}`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error adding product', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (product) => {
    const quantity = parseInt(prompt(`Enter quantity for ${product.name}:`, "1"));
    if (isNaN(quantity) || quantity <= 0) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: product.name, quantity })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: `Success! ${data.message}`, type: 'success' });
        fetchProducts(); // Refresh stock
      } else {
        setMessage({ text: `Failed: ${data.message}`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred while placing order', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1 >Grocery 🛒 Hub</h1>
        <p>Premium quality ingredients delivered to your door</p>
        <button className="btn-add-toggle" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close Form' : '➕ Add New Product'}
        </button>
      </header>

      <main className="container">
        {message.text && (
          <div className={`alert ${message.type}`}>
            {message.text}
          </div>
        )}

        {showAddForm && (
          <section className="add-product-section">
            <div className="card glass-card">
              <h2>Add New Product</h2>
              <form onSubmit={handleAddProduct} className="add-product-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Organic Bananas"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Initial Stock</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-submit">
                  {loading ? 'Adding...' : 'Confirm Add Product'}
                </button>
              </form>
            </div>
          </section>
        )}

        {products.length === 0 && !loading && (
          <div className="alert error">No products available at the moment.</div>
        )}

        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <div>
                <h3>{product.name}</h3>
                <div className="price-tag">${parseFloat(product.price).toFixed(2)}</div>
                <div className="stock-info">
                  <span className={`stock-dot ${product.stock < 5 ? 'low' : ''}`}></span>
                  {product.stock} items available in stock
                </div>
              </div>
              <button
                onClick={() => handlePlaceOrder(product)}
                disabled={loading || product.stock <= 0}
              >
                {product.stock <= 0 ? 'Out of Stock' : '🛍️ Order Now'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
