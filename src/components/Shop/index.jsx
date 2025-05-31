import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseconfig'; // Adjust if your path is different
import ProductCard from '../../components/ProductCard';
import './index.css';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'Products'));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    };

    fetchProducts();
  }, []);

  return (
    <div className="shop-container">

      <div className="filter-bar">
        <h3 className="filter-bar">Filters</h3>
        <div className="filters">
          <p className="p">Product type:</p>
          <p className="p">Price:</p>
          <p className="p">Color:</p>
          <p className="p">Size:</p>
        </div>
      </div>

      <div className="all-products">
        <h3 className="products">Products</h3>
        <div className="products-bar">
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
