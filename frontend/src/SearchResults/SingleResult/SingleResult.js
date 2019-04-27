import React, { Component } from 'react';
import './SingleResult.scss';
import { Container, Row, Col, Hidden, Visible } from 'react-grid-system';
import free_shipping from '../../assets/ic_shipping.png';
import { formatPrice } from '../../utils';
import { Link } from 'react-router-dom';
import Img from 'react-image';

class SingleResult extends Component {

    constructor(props) {
        super(props);
        this.state = { item: props.item };
    }

    render() {
        const freeShipping = <Img className="FreeShipping" alt="Free Shipping" src={free_shipping} />
        return (
            <Container fluid>
                <Row align="start">
                    <Col lg={9.6} align="start" className="NoGutter">
                        <Link to={'/items/' + this.state.item.id}>
                            <Hidden xs>
                                <Img className="Thumbnail" alt="Thumbnail" src={this.state.item.picture.replace('-I.', '-N.')} loader={<div className="ImgPlaceholderBig"/>} width="180" height="180"></Img>
                            </Hidden>
                            <Visible xs>
                                <Img className="Thumbnail" alt="Thumbnail" src={this.state.item.picture} loader={<div className="ImgPlaceholderSmall"/>} width="90" height="90"></Img>
                            </Visible>
                        </Link>
                        <div className="Price">{formatPrice(this.state.item.price)} {this.state.item.free_shipping ? freeShipping : null}</div>
                        <Row>
                            <Link to={'/items/' + this.state.item.id} style={{ textDecoration: 'none' }}>
                                <div className="Title">
                                    {this.state.item.title}
                                </div>
                            </Link>
                        </Row>
                    </Col>
                    <Hidden xs sm md>
                        <Col lg={2.4} align="start" className="Address">{this.state.item.address_state}</Col>
                    </Hidden>
                </Row>
            </Container>
        );
    }
}

export default SingleResult;