import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; ShopNS</Col>
                    <Col className="text-center py-3">This Shop Is For Testing And Portfolio Purposes Only. Items Not For Sale.</Col>
                </Row>
            </Container>
        </footer>
    )
};

export default Footer;