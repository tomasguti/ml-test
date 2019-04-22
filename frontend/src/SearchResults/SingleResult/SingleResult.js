import React, { Component } from 'react';
import './SingleResult.scss';
import { Container, Row, Col } from 'react-grid-system';
import free_shipping from '../../assets/ic_shipping.png';

class SingleResult extends Component {

    constructor(props) {
        super(props);
        this.state = { item: props.item };
    }

    formatPrice(price) {
        let decimalPlaces = 2;
        const num = parseFloat(price.amount + '.' + price.decimals);
        if (price.decimals === 0) {
            decimalPlaces = 0;
        }
        return price.currency + ' ' + num.toFixed(decimalPlaces).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    render() {
        const freeShipping = <img src={free_shipping} />
        return (
            <Container fluid>
                <Row align="start">
                    <Col xs={6} align="start">
                        <img className="Thumbnail" alt="" src={this.state.item.picture} width="90" height="90"></img>
                        <div className="Price">{this.formatPrice(this.state.item.price)} {this.state.item.free_shipping ? freeShipping : null}</div>
                        <div className="Title">{this.state.item.title}</div>
                    </Col>
                    <Col xs={3} offset={{ md: 3 }} align="start" className="Address">{this.state.item.address_state}</Col>
                </Row>
            </Container>
        );
    }
}

export default SingleResult;