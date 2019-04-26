import React, { Component } from 'react';
import './ItemDetails.scss';
import Categories from '../Categories/Categories';
import { Container, Row, Col } from 'react-grid-system';
import { formatPrice } from '../utils';

const API = 'http://localhost:3000/api/items/';

class ItemDetails extends Component {

    constructor(props) {
        super(props);
        const item_id = props.match.params.id;
        this.state = { id: item_id, item: { price: {} }, categories: [], isLoading: false };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        const id = this.state.id
        if (id) {
            fetch(API + id)
                .then(response => response.json())
                .then(data => this.setState({ item: data.item, categories: data.categories, isLoading: false }))
            // .catch(() => {});
        }
    }

    render() {

        return (
            <div className="ItemDetails">
                <Container fluid>
                    <Categories categories={this.state.categories}></Categories>
                    <Col md={10} offset={{ md: 1 }} className="ItemContainer">
                        <Row align="start" className="PictureAndBuyContainer">
                            <Col md={12} lg={8.4} align="center">
                                <img className="ItemPicture" alt="ItemPicture" src={this.state.item.picture} width="680" height="680"></img>
                            </Col>
                            <Col lg={3.6} className="NoGutter">
                                <div className="BuyContainer">
                                    <div className="ItemStats">{this.state.item.condition === 'new' ? 'Nuevo' : 'Usado'} - {this.state.item.sold_quantity} vendidos</div>
                                    <div className="ItemTitle">{this.state.item.title}</div>
                                    <div className="ItemPrice">{formatPrice(this.state.item.price)}</div>
                                    <button className="BuyButton">Comprar</button>
                                </div>
                            </Col>
                        </Row>
                        <Row align="start" className="DescriptionContainer">
                            <Col md={8} className="NoGutter">
                                <div className="DescriptionTitle">Descripción del producto</div>
                                <div className="Description">
                                    {this.state.item.description}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </div>
        );
    }
}

export default ItemDetails;