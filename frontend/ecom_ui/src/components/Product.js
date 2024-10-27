import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Product.css';  // Import the CSS file for styling

function Product() {
    const location = useLocation();
    const { productId, userId } = location.state; // Extracting from the state
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1); // State for quantity

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/product-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: productId, user_id: userId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setProduct(data))
        .catch(error => {
            console.error('Error fetching product details:', error);
            setError('Failed to load product details. Please try again later.');
        });
    }, [productId, userId]);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="product-details">
            <header>
                <h1>{product.product_name}</h1>
            </header>
            <img src={product.image_url || 'https://via.placeholder.com/400'} alt={product.product_name} />
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <p>Restocking Fee: ${product.restocking_fee}</p>
            {/* <div>
                <h2>Reviews</h2>
                {product.product_reviews.map((review, index) => (
                    <div key={index}>
                        <p>{review}</p>
                    </div>
                ))}
            </div> */}
            <p>Rating: {product.product_rating} / 5</p>
            <div className="buy-options">
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} min="1" max="10" />
                <button className="button">Add to Cart</button>
                <button className="button buy-now">Buy Now</button>
            </div>
        </div>
    );
}

export default Product;
