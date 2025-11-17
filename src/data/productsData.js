// Products Data
export const productsData = [
   // Adaptors
   {
      _id: "R-013",
      productName: "85W dash charger R-013",
      price: 1299,
      strikedPrice: 1999,
      Rating: 4.5,
      RatingCount: 25,
      itemCategory: "Adaptors",
      discountprice: "35%",
      imageURLcolor1: "https://via.placeholder.com/400x400?text=85W+Dash+Charger",
      imageURLcolor2: "https://via.placeholder.com/400x400?text=85W+Dash+Charger+2",
   },
   {
      _id: "R-014",
      productName: "65W pd Superfast charger",
      price: 999,
      strikedPrice: 1499,
      Rating: 4.3,
      RatingCount: 18,
      itemCategory: "Adaptors",
      discountprice: "33%",
      imageURLcolor1: "https://via.placeholder.com/400x400?text=65W+PD+Superfast",
      imageURLcolor2: "https://via.placeholder.com/400x400?text=65W+PD+Superfast+2",
   },
   // Cables
   {
      _id: "R-012",
      productName: "100 W Type c to c R-012",
      price: 799,
      strikedPrice: 1199,
      Rating: 4.6,
      RatingCount: 32,
      itemCategory: "Cables",
      discountprice: "33%",
      imageURLcolor1: "https://via.placeholder.com/400x400?text=100W+Type+C+to+C",
      imageURLcolor2: "https://via.placeholder.com/400x400?text=100W+Type+C+to+C+2",
   },
   {
      _id: "R-011",
      productName: "100W supervooc cable R-011",
      price: 699,
      strikedPrice: 999,
      Rating: 4.4,
      RatingCount: 28,
      itemCategory: "Cables",
      discountprice: "30%",
      imageURLcolor1: "https://via.placeholder.com/400x400?text=100W+SuperVOOC+Cable",
      imageURLcolor2: "https://via.placeholder.com/400x400?text=100W+SuperVOOC+Cable+2",
   },
   // Earbuds TWS
   {
      _id: "R-001",
      productName: "R-001 TWS",
      price: 1999,
      strikedPrice: 2999,
      Rating: 4.7,
      RatingCount: 45,
      itemCategory: "Earbuds TWS",
      discountprice: "33%",
      imageURLcolor1: "https://via.placeholder.com/400x400?text=R-001+TWS",
      imageURLcolor2: "https://via.placeholder.com/400x400?text=R-001+TWS+2",
   },
   {
      _id: "R-003",
      productName: "R-003TWS",
      price: 2499,
      strikedPrice: 3499,
      Rating: 4.8,
      RatingCount: 52,
      itemCategory: "Earbuds TWS",
      discountprice: "29%",
      imageURLcolor1: "https://via.placeholder.com/400x400?text=R-003+TWS",
      imageURLcolor2: "https://via.placeholder.com/400x400?text=R-003+TWS+2",
   },
   // Neck band
   {
      _id: "R-009",
      productName: "R-009",
      price: 1499,
      strikedPrice: 2299,
      Rating: 4.5,
      RatingCount: 38,
      itemCategory: "Neck band",
      discountprice: "35%",
      imageURLcolor1: "https://via.placeholder.com/400x400?text=R-009+Neck+Band",
      imageURLcolor2: "https://via.placeholder.com/400x400?text=R-009+Neck+Band+2",
   },
];

// Category mappings
export const categoryMap = {
   adaptors: "Adaptors",
   cables: "Cables",
   earbuds_tws: "Earbuds TWS",
   neck_band: "Neck band",
};

// Get products by category
export const getProductsByCategory = (category) => {
   if (category === "/" || !category) {
      return productsData;
   }
   const categoryName = categoryMap[category] || category;
   return productsData.filter((product) => product.itemCategory === categoryName);
};

// Get all products
export const getAllProducts = () => {
   return productsData;
};

// Get product by ID
export const getProductById = (id) => {
   return productsData.find((product) => product._id === id);
};

