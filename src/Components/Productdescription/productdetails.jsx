import styled from "styled-components";
import star from "./Images/Star11.png";
import warranty from "./Images/image 116.png";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/AddToCart/actions";
import { useToast } from "../../Context/ToastContext";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  top: 88px;
  left: 0px;
  background: linear-gradient(184.1deg, #292929 -0.53%, #010101 108.73%);
  min-height: calc(100vh - 88px);
  padding-bottom: 40px;
  overflow-x: hidden;
  box-sizing: border-box;

  & .main {
    width: 100%;
    max-width: 100%;
    display: flex;
    margin-top: 5%;
    padding: 0 5%;
    gap: 5%;
    box-sizing: border-box;
    overflow-x: hidden;
    
    @media (max-width: 968px) {
      flex-direction: column;
      align-items: center;
      gap: 30px;
      padding: 0 20px;
    }
  }
  
  & .topImage {
    width: 45%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    flex-shrink: 0;
    
    @media (max-width: 968px) {
      width: 100%;
      max-width: 100%;
    }
  }
  
  & .imageDiv {
    width: 100%;
    max-width: 100%;
    background: #1a1a1a;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    overflow: hidden;
    box-sizing: border-box;
    
    @media (max-width: 968px) {
      min-height: 300px;
      padding: 15px;
    }
  }

  & .imageDiv img {
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: contain;
    -webkit-animation: mover 1s infinite alternate;
    animation: mover 1s infinite alternate;
    transition: transform 0.3s ease;
    box-sizing: border-box;
  }
  
  & .imageDiv img:hover {
    transform: scale(1.02);
  }
  
  & .imagePlaceholder {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2a2a2a;
    color: #999;
    font-size: 1.2rem;
    border-radius: 10px;
  }
  
  & .imageThumbnails {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    width: 100%;
    max-width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
  
  & .thumbnail {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
    overflow: hidden;
    transition: all 0.3s ease;
    flex-shrink: 0;
    box-sizing: border-box;
    
    @media (max-width: 968px) {
      width: 60px;
      height: 60px;
    }
  }
  
  & .thumbnail:hover {
    border-color: #ff0000;
    transform: scale(1.05);
  }
  
  & .thumbnail.active {
    border-color: #ff0000;
  }
  
  & .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @-webkit-keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }

  & .rigthSection {
    width: 50%;
    max-width: 100%;
    margin-top: 5%;
    box-sizing: border-box;
    flex-shrink: 0;
    
    @media (max-width: 968px) {
      width: 100%;
      max-width: 100%;
      margin-top: 0;
    }
  }
  
  & .name {
    font-weight: 600;
    font-size: 2.5rem;
    line-height: 120%;
    color: #ffffff;
    margin-bottom: 10px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: 968px) {
      font-size: 2rem;
    }
  }
  
  & .type {
    margin-top: 10px;
    font-weight: 500;
    font-size: 1.2rem;
    color: #7c7c7c;
    margin-bottom: 20px;
  }
  
  & .productId {
    font-size: 0.9rem;
    color: #999;
    margin-bottom: 15px;
  }
  
  & .description {
    color: #b4b4b4;
    font-size: 1rem;
    line-height: 1.6;
    margin: 20px 0;
  }
  
  & .colorInfo {
    color: #9b9b9b;
    font-size: 0.95rem;
    margin: 10px 0;
  }
  
  & .pricing {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  
  & .price {
    font-weight: 600;
    font-size: 2.5rem;
    color: #ff0000;
    white-space: nowrap;
    
    @media (max-width: 968px) {
      font-size: 2rem;
    }
  }
  
  & .discountPrice {
    font-size: 1.5rem;
    font-weight: 500;
    text-decoration-line: line-through;
    color: #b4b4b4;
    white-space: nowrap;
    
    @media (max-width: 968px) {
      font-size: 1.2rem;
    }
  }

  & .starContainer {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
  }
  
  & .star {
    display: flex;
    gap: 3px;
  }
  
  & .reviews {
    font-size: 0.9rem;
    color: #9b9b9b;
  }
  
  & .save {
    color: #4caf50;
    font-size: 1rem;
    margin: 10px 0;
    font-weight: 500;
  }
  
  & .tax {
    color: #9b9b9b;
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  
  & .addToCart {
    text-align: center;
    padding: 15px 30px;
    width: 60%;
    max-width: 100%;
    font-weight: 800;
    color: white;
    margin-top: 30px;
    font-size: 1rem;
    background-color: #ff0000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-sizing: border-box;
    
    @media (max-width: 968px) {
      width: 100%;
      max-width: 100%;
    }
  }
  
  & .addToCart:hover {
    background-color: #cc0000;
    transform: scale(1.05);
  }
  
  & .addToCart:active {
    transform: scale(0.98);
  }

  & .colorCircle {
    margin-top: 20px;
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  & .colorCircle > div {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }
  
  & .colorCircle > div:hover {
    transform: scale(1.1);
    border-color: #ff0000;
  }
 
  & .warrantyImage {
    width: 65%;
    max-width: 100%;
    margin-top: 30px;
    height: auto;
    box-sizing: border-box;
    
    @media (max-width: 968px) {
      width: 100%;
      max-width: 100%;
    }
  }
  
  & .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    color: white;
    font-size: 1.5rem;
    gap: 20px;
  }
  
  & .loadingSpinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 0, 0, 0.1);
    border-top-color: #ff0000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  & .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    color: white;
    gap: 20px;
  }
  
  & .error button {
    padding: 12px 30px;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
  }
  
  & .error button:hover {
    background-color: #cc0000;
  }
`;

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.data);
  const { showToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [btn, setBtn] = useState("ADD TO CART");

  useEffect(() => {
    if (id) {
      loadProduct();
    } else {
      setError("Product ID is missing");
      setLoading(false);
    }
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const productData = await fetchProductById(id);
      if (productData) {
        setProduct(productData);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      console.error("Failed to load product:", err);
      setError("Failed to load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const existingCartItem = cartItems.find(item => item._id === product._id);
    
    if (existingCartItem) {
      showToast(`${product.productName} - quantity increased in your Cart`);
    } else {
      showToast(`${product.productName} - added to your Cart`);
    }
    
    dispatch(addToCart(product));
    setBtn("ADDED TO CART");
    setTimeout(() => {
      setBtn("ADD TO CART");
    }, 2000);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={i} color="#FFD700" size={20} />);
    }
    
    if (hasHalfStar) {
      stars.push(<AiOutlineStar key="half" color="#FFD700" size={20} />);
    }
    
    const remainingStars = 5 - Math.ceil(rating || 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<AiOutlineStar key={`empty-${i}`} color="#666" size={20} />);
    }
    
    return stars;
  };

  // Get all available images
  const getImages = () => {
    if (!product) return [];
    const images = [];
    if (product.imageURLcolor1) images.push(product.imageURLcolor1);
    if (product.imageURLcolor2) images.push(product.imageURLcolor2);
    if (product.imageGallery && product.imageGallery.length > 0) {
      product.imageGallery.forEach(img => {
        if (img && !images.includes(img)) {
          images.push(img);
        }
      });
    }
    return images;
  };

  if (loading) {
    return (
      <Container>
        <div className="loading">
          <div className="loadingSpinner"></div>
          <span>Loading product details...</span>
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <div className="error">
          <h2>{error || "Product not found"}</h2>
          <button onClick={() => navigate("/")}>Go Back to Home</button>
        </div>
      </Container>
    );
  }

  const images = getImages();
  const currentImage = images[selectedImage] || product.imageURLcolor1;
  const savings = product.strikedPrice ? product.strikedPrice - product.price : 0;
  const discountPercent = product.strikedPrice 
    ? Math.round((savings / product.strikedPrice) * 100) 
    : 0;

  return (
    <div>
      <Container>
        <div className="main">
          <div className="topImage">
            <div className="imageDiv">
              {imageError || !currentImage ? (
                <div className="imagePlaceholder">
                  <span>No Image Available</span>
                </div>
              ) : (
                <img 
                  src={currentImage} 
                  alt={product.productName}
                  onError={handleImageError}
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="imageThumbnails">
                {images.map((img, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.productName} - ${index + 1}`}
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rigthSection">
            <div className="name">{product.productName}</div>
            <div className="type">{product.itemCategory}</div>
            <div className="productId">Product ID: {product.tokenId || product._id}</div>
            
            {product.description && (
              <div className="description">{product.description}</div>
            )}
            
            {product.color && (
              <div className="colorInfo">Color: {product.color}</div>
            )}

            <div className="starContainer">
              <div className="star">
                {renderStars(product.Rating)}
              </div>
              <div className="reviews">{product.RatingCount || 0} Reviews</div>
            </div>

            <div className="pricing">
              <p className="price">₹{product.price?.toLocaleString()}</p>
              {product.strikedPrice && (
                <p className="discountPrice">
                  ₹{product.strikedPrice?.toLocaleString()}
                </p>
              )}
            </div>

            {savings > 0 && (
              <div className="save">You save ₹{savings.toLocaleString()} ({discountPercent}%)</div>
            )}
            <div className="tax">Inclusive of all Taxes</div>
        
            <button className="addToCart" onClick={handleAddToCart}>
              {btn}
              <AiOutlineShoppingCart size={20} />
            </button>
            
            <div>
              <img className="warrantyImage" src={warranty} alt="warranty" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
