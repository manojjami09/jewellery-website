import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseconfig';
import './index.css';

const ProductItem = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

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

  const product = products.find(
    (product) => product.id === id || product.id === parseInt(id)
  );

  if (!product) return (
  <div className='loading-container'>
    <p>Loading product...</p>
  </div>
  );

  const { name, price, image } = product;

  return (
    <div className="product-item-container">
      <div className="product-item">
        <img src={image} alt={name} className='product-image'/>
        <div className='product-details'>
          <h2 className='product-name'>{name}</h2>
          <p className='price-tag'>₹ {price}</p>
          <p className='product-tax'>Inclusive of all taxes</p>
          <hr/>
          <p className='product-offer'>
             Buy 3 at 3003 Use Code : MID3003 at checkout.<br/>Buy 1 Get 1 Free Use Code : B1G1 at checkout.
          </p>
          <hr/>
          <p className='product-stock'>In stock - ready to ship</p>
          <button className='add-to-cart-btn'>Add to Cart</button>

        </div>
        
      </div>
    </div>
  );
};

export default ProductItem;
