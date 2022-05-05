//===================================================================================================================================================================//
//                                                                       Cart View Component                                                                         //
//===================================================================================================================================================================//

import React, { useEffect } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

//===================================================================================================================================================================//

const CartView = () => {

    const params = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const productId = params.id;
    const quantity = searchParams.get('quantity') ? Number(searchParams.get('quantity')) : 1;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo) {
            navigate('/login');
        }

        if (productId && userInfo) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity, userInfo, navigate]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if(userInfo) {
            navigate('/shipping');
        }
        else {
            navigate('/login');
        }
    };

    //===============================================================================================================//

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? 
                    <Message>
                        Your Cart Is Empty <Link to='/'>Go Back</Link>
                    </Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={ item.product }>
                                <Row>
                                    <Col md={2}>
                                        <Image src={ item.image } alt={ item.name } fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{ item.name }</Link>
                                    </Col>
                                    <Col md={2}>{ item.price.toFixed(2) }</Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={ item.quantity } onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((el) => (
                                                <option key={ el + 1 } value={ el + 1 }>
                                                    { el + 1 }
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}) items</h2>
                            ${cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={ cartItems.length === 0 } onClick={ checkoutHandler }>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>                                 
                    </ListGroup>                                
                </Card>                                            
            </Col>
        </Row>
    )
};

//===================================================================================================================================================================//

export default CartView;