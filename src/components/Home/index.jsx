import ProductCard from '../../components/ProductCard';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseconfig';
import './index.css';
import Navbar from '../../components/Navbar'; // adjust path if needed


export default function Home() {
  
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

    const showProducts = () => {
      window.location.href = '/products'; // Redirect to the products page
    }


  return (
    <>
      <Navbar />
      <section>
        <div className='carousel-container'>
          <div id="carouselExampleSlidesOnly" class="carousel slide caro" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://res.cloudinary.com/dobgclr9v/image/upload/v1747204495/84770f_e069f1bf22464052b666a284d3f458fb_mv2_fj0dhs.avif" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="https://res.cloudinary.com/dobgclr9v/image/upload/v1747204495/84770f_bb57e5518bbd43e8870325b93c908cee_mv2_y0srim.avif" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="https://res.cloudinary.com/dobgclr9v/image/upload/v1747204495/84770f_ca183cbde2e54902bb15671ac5b117dd_mv2_ehnsb1.avif" class="d-block w-100" alt="..." />
              </div>
            </div>
          </div>
          <div class="overlay-content">
            <h1 class="fw-lighter">The New Minimal<br/>Jewelry Collection</h1>
            <button class="btn-warning shop-btn" onClick={showProducts}>Shop Collection</button>
          </div>
        </div>
        <h3 class="fw-lighter text-center heading-bestSell">Best Sellers</h3>
        <div class="carousel-container">
          
            <button class="arrow left" onClick="scrollCarousel(-1)">&#10094;</button>
          
            <div class="carousel" id="productCarousel">
              {products.map(product => (
                <ProductCard product={product} />
              ))}
              
            </div>
          
            <button class="arrow right" onClick="scrollCarousel(1)">&#10095;</button>
        </div>
        <div class="insta-promo">
              <h3 class="heading-promo">Follow</h3>
              <h3 class="heading-promo">Adalene On Instagram</h3>
              <p class="para-promo">@adaleneShop</p>
              <div class="images-insta">
                <img src="https://res.cloudinary.com/dobgclr9v/image/upload/v1747212802/157553_1244b96056e84b759931705533c8390a_va93xc.avif" alt="insta1" class="img-insta"/>
                <img src="https://res.cloudinary.com/dobgclr9v/image/upload/v1747212802/157553_e1822d6ccef54c91a6e01f9220c0b5a1_wcza46.avif" alt="insta2" class="img-insta"/>
                <img src="https://res.cloudinary.com/dobgclr9v/image/upload/v1747212802/157553_9bd1176d767b4d159892d0fe8353e855_b50pzk.avif" alt="insta3" class="img-insta"/>
                <img src="https://res.cloudinary.com/dobgclr9v/image/upload/v1747212802/157553_981b23afab4a4ae89a3900753b98e378_noof0i.avif" alt="insta3" class="img-insta"/>
                <img src="https://res.cloudinary.com/dobgclr9v/image/upload/v1747212802/157553_c026677d330b4b809c04d07d1d7abee6_vcbwvq.avif" alt="insta3" class="img-insta"/>
                <img src="https://res.cloudinary.com/dobgclr9v/image/upload/v1747212802/157553_9bd1176d767b4d159892d0fe8353e855_b50pzk.avif" alt="insta3" class="img-insta"/>
              </div>
              <div class="advantages">   
                  <p class="para-promo1">Free Shipping</p>
                  <p class="para-promo1">Easy 30 Days Return</p>
                  <p class="para-promo1">12 Months Warranty</p>
              </div>
        </div>   
      </section>
    </>
  );
}
