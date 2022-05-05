//===================================================================================================================================================================//
//                                                                    Product Edit View Component                                                                    //
//===================================================================================================================================================================//

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

//===================================================================================================================================================================//

const ProductEditView = () => {

    const params = useParams();
    const navigate = useNavigate();

    const productId = params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            navigate('/admin/productlist');
        }
        else {
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            }
            else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, productId, product, navigate, successUpdate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
          const header = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
    
          const { data } = await axios.post('/api/upload', formData, header);

          setImage(data);
        } 
        catch (error) {
            console.error(error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            description,
            countInStock
        }));
    };

    //===============================================================================================================//

    return (
        <>
          <Link to='/admin/productlist' className='btn btn-dark my-3'>
            Go Back
          </Link>
          <FormContainer>
            <h1>Edit Product</h1>
            { loadingUpdate && <Loader /> }
            { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
            { loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{ error }</Message>
            ) : (
              <Form onSubmit={ submitHandler }>
                <Form.Group controlId='name' className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={ name }
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price' className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Price'
                    value={ price }
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" onChange={uploadFileHandler} />
                </Form.Group>
                <Form.Group controlId='countInStock' className="mb-3">
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Count In Stock'
                    value={ countInStock }
                    onChange={(e) => setCountInStock(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='category' className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Category'
                    value={ category }
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description' className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Description'
                    value={ description }
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Form>
            )}
          </FormContainer>
        </>
    )
};

//===================================================================================================================================================================//

export default ProductEditView;