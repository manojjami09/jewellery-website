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
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

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

  useEffect(() => {
    let filtered = products.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    if (activeOptionId === 'PRICE_HIGH') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeOptionId === 'PRICE_LOW') {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, activeOptionId]);



   const updateActiveOptionId = activeOptionId => {
    setActiveOptionId(activeOptionId)
  }

  return (
    <>
    <Navbar />
      <div className="shop-container">
        <div className="filter-bar">
          <h3>Filters</h3>
          <div className="filters">
            
            <div>
              <label className="range">Price Range:</label>
              <select onChange={(e) => {
                const value = e.target.value;
                switch (value) {
                  case '0-1000':
                    setPriceRange({ min: 0, max: 1000 });
                    break;
                  case '1000-3000':
                    setPriceRange({ min: 1000, max: 3000 });
                    break;
                  case '3000-5000':
                    setPriceRange({ min: 3000, max: 5000 });
                    break;
                  case '5000+':
                    setPriceRange({ min: 5000, max: Infinity });
                    break;
                  default:
                    setPriceRange({ min: 0, max: Infinity });
                }
              }}>
                <option value="">All</option>
                <option value="0-1000">₹0 - ₹1000</option>
                <option value="1000-3000">₹1000 - ₹3000</option>
                <option value="3000-5000">₹3000 - ₹5000</option>
                <option value="5000+">₹5000+</option>
              </select>
            </div>
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
