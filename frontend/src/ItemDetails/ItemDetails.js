import React, { Component } from 'react';
import './ItemDetails.scss';
import Categories from '../Categories/Categories';
import { Container, Row, Col, Hidden, Visible } from 'react-grid-system';
import { formatPrice } from '../utils';
import Spinner from '../Spinner/Spinner';
import sanitizeHtml from 'sanitize-html';
import { Redirect } from 'react-router-dom';
import Img from 'react-image';

const API = '/api/items/';

class ItemDetails extends Component {

    constructor(props) {
        super(props);
        const item_id = sanitizeHtml(props.match.params.id, { allowedTags: [], allowedAttributes: {} });
        this.state = { id: item_id, item: { price: {}, picture: '' }, categories: [], isLoading: false, error: false };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        const id = this.state.id
        if (id) {
            fetch(API + id)
                .then(response => response.json())
                .then(data => this.setState({ item: data.item, categories: data.categories, isLoading: false, error: false }))
                .catch(() => this.setState({ error: true }));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.item !== this.state.item) {
            document.title = this.state.item.title + ' - ' + formatPrice(this.state.item.price, true) + ' en Mercado Libre';
        }
    }

    render() {

        if (this.state.error) {
            return <Redirect to="/error" />
        }

        if (this.state.isLoading) {
            return <Spinner />;
        }

        return (
            <div className="ItemDetails">
                <Container fluid>
                    <Categories categories={this.state.categories}></Categories>
                    <Col md={10} offset={{ md: 1 }} className="ItemContainer">
                        <Row align="start" className="PictureAndBuyContainer">
                            <Col xl={8.4} align="center">
                                <Hidden lg xl>
                                    <Img className="ItemPicture" alt="ItemPicture"
                                        src={this.state.item.picture} loader={<div className="PicturePlaceHolderSmall" />}
                                        width="340" height="340">
                                    </Img>
                                </Hidden>
                                <Visible lg xl>
                                    <Img className="ItemPicture" alt="ItemPicture"
                                        src={this.state.item.picture.replace('-O.', '-B.')}
                                        loader={<div className="PicturePlaceHolderBig" />}
                                        width="680" height="680">
                                    </Img>
                                </Visible>
                            </Col>
                            <Col xl={3.6} className="NoGutter">
                                <div className="BuyContainer">
                                    <div className="ItemStats">
                                        {this.state.item.condition === 'new' ? 'Nuevo' : 'Usado'} - {this.state.item.sold_quantity} vendidos
                                    </div>
                                    <div className="ItemTitle">{this.state.item.title}</div>
                                    <div className="ItemPrice">
                                        {formatPrice(this.state.item.price)}
                                        <span className="ItemDecimals">{this.state.item.price.decimals ? this.state.item.price.decimals : ''}</span>
                                    </div>
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