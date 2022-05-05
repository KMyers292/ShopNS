//===================================================================================================================================================================//
//                                                                      Payment View Component                                                                       //
//===================================================================================================================================================================//

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions.js';
import { CART_RESET } from '../constants/cartConstants';

//===================================================================================================================================================================//

const PaymentView = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if(!shippingAddress) {
        navigate('/shipping');
    }

    useEffect(() => {
        if(!userInfo) {
            dispatch({type: CART_RESET});
            navigate('/login');
        }
    }, [navigate, userInfo, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    //===============================================================================================================//

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='Paypal or Credit Card' 
                            id='PayPal' 
                            name='paymentMethod' 
                            value='Paypal' 
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check 
                            type='radio' 
                            label='Stripe' 
                            id='Stripe' 
                            name='paymentMethod' 
                            value='Stripe' 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
};

//===================================================================================================================================================================//

export default PaymentView;