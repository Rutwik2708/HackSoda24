import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCatalog.css';  // Import the CSS file for styling

function ProductCatalog({ userId }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
            });
    }, []);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div>
            <header>
                <h1>Product Catalog</h1>
            </header>
            <div className="product-grid">
                {products.map((product) => (
                    <Link key={product.product_id}
                        to={`/product`}
                        state={{ productId: product.product_id, userId: userId }}
                        className="product-card">
                        <div>
                            <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.product_name} />
                            <h3>{product.product_name}</h3>
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductCatalog;
