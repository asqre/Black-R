import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getProducts, sortProducts } from "../../Redux/Products/action";
import { addToCart } from "../../Redux/AddToCart/actions";
import { useNavigate } from "react-router";
import { useToast } from "../../Context/ToastContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { fetchAllProducts, fetchProductsByCategory } from "../../services/api";

export const Products = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products.products);
    const cartItems = useSelector((store) => store.cart.data);
    const [index, setIndex] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [imageErrors, setImageErrors] = useState({});

    const handleImageError = (productId) => {
        setImageErrors(prev => ({ ...prev, [productId]: true }));
    };

    if (id === undefined) {
        id = "/"
    }

    const headings = {
        adaptors: "Adaptors",
        cables: "Cables",
        earbuds_tws: "Earbuds TWS",
        neck_band: "Neck Band",
    }

    // Map URL params to API category names
    const categoryApiMap = {
        adaptors: "Adaptor",
        cables: "Cables",
        earbuds_tws: "Earbuds TWS",
        neck_band: "Neck band",
    }

    const imgURL = {
        adaptors: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=300&fit=crop",
        cables: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=300&fit=crop",
        earbuds_tws: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&h=300&fit=crop",
        neck_band: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&h=300&fit=crop",
    }

    useEffect(() => {
        getData()
    }, [id]);

    const getData = async () => {
        setLoading(true);
        setError(null);

        try {
            let fetchedProducts;

            if (id === "/") {
                // Fetch all products
                fetchedProducts = await fetchAllProducts();
            } else {
                // Fetch products by category
                const apiCategory = categoryApiMap[id] || id;
                fetchedProducts = await fetchProductsByCategory(apiCategory);
            }

            dispatch(getProducts(fetchedProducts));
        } catch (err) {
            console.error("Failed to load products:", err);
            setError("Failed to load products. Please try again.");
            dispatch(getProducts([]));
        } finally {
            setLoading(false);
        }
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

    if (loading) {
        return (
            <div className="ga_Products">
                <img className="ga_topImage" src={id === "/" ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=300&fit=crop" : imgURL[id]} alt="" />
                <div className="ga_main">
                    <h1 className="ga_heading">{id === "/" ? "All Products" : headings[id]}</h1>
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading products...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ga_Products">
            <img className="ga_topImage" src={id === "/" ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=300&fit=crop" : imgURL[id]} alt="" />

            <div className="ga_main">
                <h1 className="ga_heading">{id === "/" ? "All Products" : headings[id]}</h1>

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
                            <option className="opt" value="price_low">Price, Low to High</option>
                            <option className="opt" value="price_high">Price, High to Low</option>
                            <option className="opt" value="name_az">Alphabetically, A-Z</option>
                            <option className="opt" value="name_za">Alphabetically, Z-A</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={getData} className="retry-btn">
                            Retry
                        </button>
                    </div>
                )}

                {!error && products.length === 0 && (
                    <div className="no-products">
                        <p>No products found in this category.</p>
                    </div>
                )}

                <div className="ga_products_container">
                    {products.map((ele, ind) => {
                        const imageSrc = ind === index ? ele.imageURLcolor2 : ele.imageURLcolor1;
                        const hasImageError = imageErrors[ele._id] || !imageSrc;

                        return (
                            <div key={ele._id || ind} className="ga_productCard">
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
                                            {ele.strikedPrice && <h6>₹ {ele.strikedPrice}</h6>}
                                        </div>
                                        <button onClick={() => {
                                            dataToCart(ele)
                                        }}>
                                            <span className="btnText">Add +</span>
                                            <AiOutlineShoppingCart className="btnIcon" size={16} />
                                        </button>
                                    </div>

                                    {ele.color && <h5>{ele.color} color available</h5>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
