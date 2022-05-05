//===================================================================================================================================================================//
//                                                                  FormContainer Component                                                                          //
//===================================================================================================================================================================//

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//===================================================================================================================================================================//

// Container for displaying forms in required format.
const FormContainer = ({ children }) => {
    
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    { children }
                </Col>
            </Row>
        </Container>
    )
};

//===================================================================================================================================================================//

export default FormContainer;