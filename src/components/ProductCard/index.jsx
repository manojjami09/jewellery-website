import './index.css';
import { Link } from 'react-router';
function ProductCard(props) {
  const { product } = props;
  
  return (
    <Link to={`/products/${product.id}`}>
      <div className="card-container">
        <div class="card">
            {/* <span class="tag">Best Seller</span> */}
            <img src={product.image} alt="img" />
            <p className='Name'>{product.name}</p>
            <p class="Price">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;