//===================================================================================================================================================================//
//                                                         Controller For The Product Route                                                                          //
//===================================================================================================================================================================//

import asyncHandler from 'express-async-handler'; // Middleware for handling exceptions inside async routes and passes them to custom error handler.
import Product from '../models/productModel.js';

//===================================================================================================================================================================//

// Gets all products from the database. Or get searched products if search form is used.
// Used in a GET request to /api/products.
// 'countDocuments', 'find', 'limit', 'sort', and 'skip' are all mongoose methods.
export const getProducts = asyncHandler(async (req, res) => {

    // Max amount of products per page.
    const pageSize = 10;
    // Current page number the user is on.
    const page = Number(req.query.pageNumber) || 1;
    // Filter to sort products with. Empty if user selects no sorting.
    const filter = req.query.filter || '';

    // If user searched for a product, use the searched words to match a product name.
    // If not searching, or search form is blank, keyword is an empty object.
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword, // uses regex to match a name with any of the keyword letters.
            $options: 'i' // 'i' is for 'case insensitive'.
        }
    } : {}

    // The count of how many products are returned from the search by keyword.
    // If no keyword, count will be the total number of products.
    const count = await Product.countDocuments({ ...keyword });

    let products;

    // If a keyword is used, finds all products with those letters in the products name and limits search to 10.
    // Uses skip to determine what products to display based on what page the user is on.
    // If no keyword, gets all products, 10 at a time.
    if(filter === 'low') {
        products = await Product.find({ ... keyword }).sort({price: 'asc'}).limit(pageSize).skip(pageSize * (page - 1));
    }
    else if(filter === 'high') {
        products = await Product.find({ ... keyword }).sort({price: 'desc'}).limit(pageSize).skip(pageSize * (page - 1));
    }
    else if(filter === 'review') {
        products = await Product.find({ ... keyword }).sort({rating: 'desc'}).limit(pageSize).skip(pageSize * (page - 1));
    }
    else {
        products = await Product.find({ ... keyword }).limit(pageSize).skip(pageSize * (page - 1));
    }

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//===================================================================================================================================================================//

// Gets a single product by its ID.
// Used in a GET request to /api/products/:id.
export const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);   
    }
    else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

//===================================================================================================================================================================//

// Deletes a product from the database.
// Used in a DELETE request to /api/products/:id.
// Only Admin allowed.
export const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(product) {
        await product.remove(); 
        res.json({ message: 'Product Removed Successfully!' });
    }
    else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

//===================================================================================================================================================================//

// Creates a new product in the database.
// Used in a POST request to /api/products.
// Only Admin allowed.
export const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Enter Name',
        price: 0,
        user: req.user._id,
        image: ' ',
        category: 'Enter Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Enter Description'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

});

//===================================================================================================================================================================//

// Updates info for an existing product.
// Used in a PUT request to /api/products/:id.
// Only Admin allowed.
export const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Product Not Found!');
    }
});

//===================================================================================================================================================================//

// Creates a new review for a specific product.
//  Used in a POST request to /api/products/:id/reviews.
export const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {

        // If user ID in product review matches current logged in user ID, then does not allow the creation of another review for that product.
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

        if(alreadyReviewed) {
            res.status(400);
            throw new Error('Product Already Reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review Added' });
    }
    else {
        res.status(404);
        throw new Error('Product Not Found!');
    }
});

//===================================================================================================================================================================//

// Deletes a review for a specific product.
// Used in a DELETE request to /api/products/:id/reviews.
export const deleteProductReview = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(product) {
        let reviews;

        if(product.reviews.length > 1) {
            reviews = product.reviews.filter((review) => review.user.toString() !== req.user._id.toString());
            product.reviews = reviews;
            product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
            product.numReviews = reviews.length;
        }
        else {
            product.reviews.pop();
            product.rating = 0;
            product.numReviews = 0;
        }

        await product.save(); 
        res.json({ message: 'Review Removed Successfully!' });
    }
    else {
        res.status(404);
        throw new Error('Product Not Found!');
    }
});

//===================================================================================================================================================================//

// Gets the top rated products.
// Used in a GET request to /api/prodcuts/top.
export const getTopProducts = asyncHandler(async (req, res) => {

    // Gets all products then sorts by best rating and limits to top 3 results.
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
});