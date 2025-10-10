import React, { useState, useEffect } from 'react';
import './ProductList.css';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // useEffect untuk fetch data sekali saat component mount
    useEffect(() => {
        console.log('🔍 useEffect running - fetching data...');
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                // Fetch data dari backend
                const response = await
                    fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                if (result.success) {
                    setProducts(result.data);
                } else {
                    throw new Error(result.error || 'Failed to fetch products');
                }
            } catch (err) {
                console.error('❌ Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
        // Cleanup function (optional untuk contoh sederhana)
        return () => {
            console.log('🧹 Cleanup: Component will unmount');
        };
    }, []); // Empty dependency array = run sekali saat mount
    // Tampilkan loading state
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading products from backend...</p>
                <p className="loading-note">⏳ Connecting to Node.js
                    server</p>
            </div>
        );
    }
    // Tampilkan error state
    if (error) {
        return (
            <div className="error-container">
                <div className="error-icon">❌</div>
                <h3>Failed to Load Products</h3>
                <p>{error}</p>
                <p className="error-help">
                    Make sure the backend server is running on port 5000
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="retry-button"
                >
                    🔄 Try Again
                </button>
            </div>
        );
    }
    // Tampilkan data products
    return (
        <div className="product-list-container">
            <div className="list-header">
                <h2>📦 Our Products ({products.length} items)</h2>
                <p>Data fetched from Node.js backend using useEffect</p>
            </div>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-id">#{product.id}</div>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">Rp
                            {product.price.toLocaleString()}</p>
                        <span className="product-
category">{product.category}</span>
                    </div>
                ))}
            </div>
            <div className="footer-note">
                <p>✨ Data successfully loaded from backend API</p>
                <p>🔄 useEffect hook ran once when component mounted</p>
            </div>
        </div>
    );
};
export default ProductList;
