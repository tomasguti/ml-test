import React, { Component } from 'react';
import './SearchResults.scss';
import { Container, Row, Col } from 'react-grid-system';
import SingleResult from './SingleResult/SingleResult';
import QueryString from 'query-string';
import chevronRight from '../assets/chevron-right.svg';

const API = 'http://localhost:3000/api/items?q=';

class SearchResults extends Component {

    constructor(props) {
        super(props);
        const parsed = QueryString.parse(props.location.search);
        this.state = { search: parsed.search, items: [], categories: [] };
    }

    componentDidMount() {
        const search = this.state.search
        if (search) {
            fetch(API + search)
                .then(response => response.json())
                .then(data => this.setState({ items: data.items, categories: data.categories }))
            // .catch(() => {});
        }
    }

    render() {

        const separator = <div className="Separator"></div>;
        
        const lastItem = this.state.items.length - 1;
        const listItems = this.state.items.map(function (item, i) {
            return (
                <div key={item.id}>
                    <SingleResult item={item} />
                    { lastItem === i ? null : separator}
                </div>
            );
        });

        const lastCategory = this.state.categories.length - 1;
        const categories = this.state.categories.map(function (category, i) {
            if (i === lastCategory) {
                return (
                    <span key={i} className="LastCategory">{category}</span>
                );
            } else {
                return (
                    <span key={i}>{category} <img src={chevronRight} width="16" height="16" /> </span>
                );
            }
        });

        return (
            <div className="SearchResults">
                <Container fluid>
                    <Row>
                        <Col md={10} offset={{ md: 1 }} className="Categories">
                            {categories}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10} offset={{ md: 1 }} align="stretch">
                            <div className="ItemsContainer">
                                {listItems}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SearchResults;