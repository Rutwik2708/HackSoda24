// src/components/InfoTooltip.js

import React from 'react';
import styles from '../styles/InfoTooltip.module.css';

function InfoTooltip({ message }) {
  return (
    <div className={styles.tooltipContainer}>
      <span className={styles.tooltipIcon}>?</span>
      <div className={styles.tooltipText}>{message}</div>
    </div>
  );
}

export default InfoTooltip;
