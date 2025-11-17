import { useEffect, useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faStar } from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Products/action";
import { sortProducts } from "../../Redux/Products/action";
import { addToCart } from "../../Redux/AddToCart/actions";
import { useNavigate } from "react-router";
import { useToast } from "../../Context/ToastContext";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Products = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products.products);
    const cartItems = useSelector((store) => store.cart.data);
    const [index, setIndex] = useState();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [imageErrors, setImageErrors] = useState({});

    const handleImageError = (productId) => {
        setImageErrors(prev => ({ ...prev, [productId]: true }));
    };
    
    if(id === undefined) {
        id = "/"
    }

    const headings = {
        adaptors: "Adaptors",
        cables: "Cables",
        earbuds_tws: "Earbuds TWS",
        neck_band: "Neck Band",
    }

    const imgURL = {
        adaptors: "https://via.placeholder.com/1200x300?text=Adaptors",
        cables: "https://via.placeholder.com/1200x300?text=Cables",
        earbuds_tws: "https://via.placeholder.com/1200x300?text=Earbuds+TWS",
        neck_band: "https://via.placeholder.com/1200x300?text=Neck+Band",
    }
    
    useEffect(() => {
        getData()
    }, [id]);

    const getData = () => {
        // Use static product data instead of API
        import("../../data/productsData").then((module) => {
            const filteredProducts = module.getProductsByCategory(id);
            dispatch(getProducts(filteredProducts));
        });
    }

    const dataToCart = (ele) => {
        // Check if item already exists in cart
        const existingCartItem = cartItems.find(item => item._id === ele._id);
        
        if (existingCartItem) {
            showToast(`${ele.productName} - quantity increased in your Cart`);
        } else {
            showToast(`${ele.productName} - added to your Cart`);
        }

        // Redux reducer will handle localStorage sync automatically
        dispatch(addToCart(ele));
    } 

    const navigateToDetails = (productId) => {
        navigate(`/product/${productId}`)
    }

    return (
        <div className="ga_Products">
            <img className="ga_topImage" src={id === "/" ? "https://via.placeholder.com/1200x300?text=All+Products": imgURL[id]} alt="" />

            <div className="ga_main">
                <h1 className="ga_heading">{id === "/" ? "All Products": headings[id]}</h1>

            <div className="ga_filterAndSort">
                <div>
                    <div className="ga_filter">
                        <FontAwesomeIcon icon={faSliders} />
                    <h3>Show Filters</h3>
                    </div>
                    <h3 id="ga_totalProducts">{products.length} products</h3>
                </div>

                <div className="ga_sortDiv">
                    <h3>Sort by</h3>
                    <select onChange={(ele) => {
                        dispatch(sortProducts(ele.target.value))
                    }} id="ga_sort">
                        <option className="opt" value="featured">Featured</option>
                        <option className="opt" value="price">Price, Low to High</option>
                        <option className="opt" value="price">Price, High to Low</option>
                        <option className="opt" value="productName">Alphabetically, A-Z</option>
                        <option  className="opt" value="productName">Alphabetically, Z-A</option>
                    </select>
                </div>
            </div>

            <div className="ga_products_container">
                {products.map((ele, ind) => {
                    const imageSrc = ind === index ? ele.imageURLcolor2 : ele.imageURLcolor1;
                    const hasImageError = imageErrors[ele._id] || !imageSrc;
                    
                    return (
                        <div key={ind} className="ga_productCard">
                            {hasImageError ? (
                                <div 
                                    className="imagePlaceholder" 
                                    onClick={() => navigateToDetails(ele._id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span>No Image</span>
                                </div>
                            ) : (
                                <img 
                                    onMouseOver={() => setIndex(ind)}
                                    onMouseOut={() => setIndex(-1)}
                                    src={imageSrc} 
                                    alt={ele.productName || ""}
                                    onClick={() => navigateToDetails(ele._id)}
                                    onError={() => handleImageError(ele._id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                            <div className="ga_productInfo">
                                <div className="ga_rating">
                                    <FontAwesomeIcon className="ga_star" icon={faStar} />
                                    <h5>{ele.Rating} ({ele.RatingCount})</h5>
                                </div>
                                <h4 
                                    onClick={() => navigateToDetails(ele._id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {ele.productName}
                                </h4>
                                <div className="ga_price">
                                    <div>
                                        <h4>₹ {ele.price}</h4>
                                    <h6>₹ {ele.strikedPrice}</h6>
                                    </div>
                                    <button onClick={() => {
                                        dataToCart(ele)
                                    }}>
                                        <span className="btnText">Add +</span>
                                        <AiOutlineShoppingCart className="btnIcon" size={16} />
                                    </button>
                                </div>

                                <h5>2 colors available</h5>
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}