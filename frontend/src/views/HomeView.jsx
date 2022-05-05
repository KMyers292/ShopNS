//===================================================================================================================================================================//
//                                                                       Home View Component                                                                         //
//===================================================================================================================================================================//

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions.js';

//===================================================================================================================================================================//

const HomeView = () => {

    const [filter, setFilter] = useState('');

    const params = useParams();
    const dispatch = useDispatch();

    const keyword = params.keyword;
    const pageNumber = params.pageNumber || 1;

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, filter));
    }, [dispatch, keyword, pageNumber, filter]);

    //===============================================================================================================//

    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1>Latest Products</h1>
            <Col sm={2}>
                <Form.Select value={ filter } onChange={(e) => setFilter(e.target.value)} role='button' className='mb-3'>
                    <option>Sort By...</option>
                    <option value='low'>Price: Low to High</option>
                    <option value='high'>Price: High to Low</option>
                    <option value='review'>Avg. Customer Review</option>
                </Form.Select>
            </Col>
            {loading ? <Loader/> : error ? <Message variant='danger'>{ error }</Message> : (
            <>
                <Row>
                    {products.map((product) => (
                        <Col key={ product._id } sm={12} md={6} lg={4} xl={3}>
                            <Product product={ product } />
                        </Col>
                    ))}
                </Row>
                <Paginate pages={ pages } page={ page } keyword={ keyword ? keyword : '' }/>
            </>
            )}
        </>
    )
};

//===================================================================================================================================================================//

export default HomeView;