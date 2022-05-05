//===================================================================================================================================================================//
//                                                                      Footer Component                                                                             //
//===================================================================================================================================================================//

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//===================================================================================================================================================================//

const Footer = () => {
    
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3 text-muted">Copyright &copy; ShopNS</Col>
                    <Col className="text-center py-3 text-muted">This Shop Is For Testing And Portfolio Purposes Only. Items Not For Sale.</Col>
                    <Col className="text-center py-3 text-muted">
                        <a href='https://campns.herokuapp.com' target="_blank" rel='noreferrer' className='footer-link'>Looking To Get Away?</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};

//===================================================================================================================================================================//

export default Footer;