// src/components/ProductListing.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ProductListing.module.css';
import InfoTooltip from './InfoTooltip';

function ProductListing() {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [productMedia, setProductMedia] = useState([]);
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [minPenalty, setMinPenalty] = useState('');
  const [maxPenalty, setMaxPenalty] = useState('');
  const [algorithmThreshold, setAlgorithmThreshold] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productName,
      productDetails,
      productMedia,
      productCategory,
      productPrice,
      stockQuantity,
      minPenalty,
      maxPenalty,
      algorithmThreshold,
    };
    console.log('Product Listed:', productData);
  };

  return (
    <div className={styles.productListing}>
      <h2 className={styles.title}>List a New Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          {/* Basic Product Information Section */}
          <div className={styles.basicFields}>
            <h3 className={styles.sectionTitle}>Basic Details</h3>
            <label className={styles.label}>
              Product Name
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className={styles.input} />
            </label>

            <label className={styles.label}>
              Product Details
              <textarea value={productDetails} onChange={(e) => setProductDetails(e.target.value)} className={styles.textarea} />
            </label>

            <label className={styles.label}>
              Product Media
              <input type="file" multiple onChange={(e) => setProductMedia([...e.target.files])} className={styles.fileInput} />
            </label>

            <label className={styles.label}>
              Product Category
              <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className={styles.input} />
            </label>

            <label className={styles.label}>
              Product Price
              <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className={styles.input} />
            </label>

            <label className={styles.label}>
              Stock Quantity
              <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} className={styles.input} />
            </label>
          </div>

          <div className={styles.divider}></div>

          {/* Penalty Information Section */}
          <div className={styles.penaltyBox}>
            <h3 className={styles.sectionTitle}>Penalty Information</h3>
            <label className={styles.label}>
              Minimum Penalty
              <InfoTooltip message="The lowest penalty applied if the product is returned." />
              <input type="number" value={minPenalty} onChange={(e) => setMinPenalty(e.target.value)} className={styles.input} />
            </label>

            <label className={styles.label}>
              Maximum Penalty
              <InfoTooltip message="The highest penalty applied if the product is returned." />
              <input type="number" value={maxPenalty} onChange={(e) => setMaxPenalty(e.target.value)} className={styles.input} />
            </label>

            <label className={styles.label}>
              Algorithm Threshold
              <InfoTooltip message="Defines the threshold to automatically trigger a penalty calculation." />
              <input type="number" value={algorithmThreshold} onChange={(e) => setAlgorithmThreshold(e.target.value)} className={styles.input} />
            </label>

            {/* Link to the informational page */}
            <Link to="/restocking-info" className={styles.infoLink}>Learn how restocking fees are calculated</Link>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>List Product</button>
      </form>
    </div>
  );
}

export default ProductListing;
