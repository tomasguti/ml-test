import React, { Component } from 'react';
import './SingleResult.scss';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import free_shipping from '../../assets/ic_shipping.png';
import { formatPrice } from '../../utils';

class SingleResult extends Component {

    constructor(props) {
        super(props);
        this.state = { item: props.item };
    }

    render() {
        const freeShipping = <img className="FreeShipping" alt="Free Shipping" src={free_shipping}/>
        return (
            <Container fluid>
                <Row align="start">
                    <Col lg={6} align="start">
                        <img className="Thumbnail" alt="Thumbnail" src={this.state.item.picture} width="90" height="90"></img>
                        <div className="Price">{formatPrice(this.state.item.price)} {this.state.item.free_shipping ? freeShipping : null}</div>
                        <div className="Title">{this.state.item.title}</div>
                    </Col>
                    <Hidden xs sm md>
                        <Col lg={3} offset={{ lg: 3 }} align="start" className="Address">{this.state.item.address_state}</Col>
                    </Hidden>
                </Row>
            </Container>
        );
    }
}

export default SingleResult;