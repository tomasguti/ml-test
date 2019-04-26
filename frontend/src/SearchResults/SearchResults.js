import React, { Component } from 'react';
import './SearchResults.scss';
import { Container, Row, Col } from 'react-grid-system';
import SingleResult from './SingleResult/SingleResult';
import Categories from '../Categories/Categories';
import QueryString from 'query-string';

const API = 'http://localhost:3000/api/items?q=';

class SearchResults extends Component {

    constructor(props) {
        super(props);
        const parsed = QueryString.parse(props.location.search);
        this.state = { search: parsed.search, items: [], categories: [], isLoading: false};
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        const search = this.state.search
        if (search) {
            fetch(API + search)
                .then(response => response.json())
                .then(data => this.setState({ items: data.items, categories: data.categories, isLoading: false }))
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
                    {lastItem === i ? null : separator}
                </div>
            );
        });

        return (
            <div className="SearchResults">
                <Container fluid>
                    <Categories categories={this.state.categories}></Categories>
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