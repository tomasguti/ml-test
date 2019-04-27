import React, { Component } from 'react';
import './NotFound.scss';
import { Container, Row, Col } from 'react-grid-system';

class NotFound extends Component {
    render() {
        return (
            <Container align="start">
                <Row>
                    <Col md={10} offset={{ md: 1 }} className="NotFound">
                        No se encontró la página que estabas buscando, intenta una nueva búsqueda.
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NotFound;