import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/crm/sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <Link to="/retail/main">Home</Link>
          </li>
          <li>
            <Link to="/retail/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/retail/product">Product</Link>
          </li>
          <li>
            <Link to="/retail/customer">Customer</Link>
          </li>
          <li>
            <Link to="/retail/order">Order</Link>
          </li>
          {/* <li>
            <Link to="/crm/projects">Projects</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;