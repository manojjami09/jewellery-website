import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'; // adjust path if needed
import ProductCard from '../../components/ProductCard';
import './index.css';
import Navbar from '../../components/Navbar'; // adjust path if needed
import ProductsHeader from '../../components/ProductsHeader'; // adjust path if needed

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

   const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'Products'));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(items);
    setFilteredProducts(items);
  };

  const [activeOptionId, setActiveOptionId] = useState(
    sortbyOptions[0].optionId,
  )

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleSearch = (e) => {
      const searchTerm = e.detail;
      const matched = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(matched);
    };

    window.addEventListener('shop-search', handleSearch);

    return () => {
      window.removeEventListener('shop-search', handleSearch);
    };
  }, [products]);

  useEffect(() => {
  let sortedProducts = [...filteredProducts];

  if (activeOptionId === 'PRICE_HIGH') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (activeOptionId === 'PRICE_LOW') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  setFilteredProducts(sortedProducts);
}, [activeOptionId]);

   const updateActiveOptionId = activeOptionId => {
    setActiveOptionId(activeOptionId)
  }

  return (
    <>
    <Navbar />
      <div className="shop-container">
        <div className="filter-bar">
          <div className="filters">
            <h3>Filters</h3>
            <p>Product type:</p>
            <p>Price:</p>
            <p>Color:</p>
            <p>Size:</p>
          </div>
        </div>

        <div className="all-products">
          <ProductsHeader 
            sortbyOptions={sortbyOptions}
            activeOptionId={activeOptionId}
            updateActiveOptionId={updateActiveOptionId}
          />
          <div className="products-bar">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );

}
