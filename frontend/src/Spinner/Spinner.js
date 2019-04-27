import React, { Component } from 'react';
import './Spinner.scss';
import { Container, Row, Col } from 'react-grid-system';
import Loader from 'react-loader-spinner'

class Spinner extends Component {
    render() {
        return (
            <Container fluid className="Spinner">
                <Row>
                    <Col align="center">
                        <Loader type="Oval" color="#999999" height={64} width={64} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Spinner;