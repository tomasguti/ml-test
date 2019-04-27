import React, { Component } from 'react';
import './SearchResults.scss';
import { Container, Row, Col } from 'react-grid-system';
import SingleResult from './SingleResult/SingleResult';
import Categories from '../Categories/Categories';
import QueryString from 'query-string';
import Spinner from '../Spinner/Spinner';

const API = 'http://localhost:3000/api/items?q=';

class SearchResults extends Component {

    constructor(props) {
        super(props);

        const parsed = QueryString.parse(props.location.search);
        this.state = { search: parsed.search, items: [], categories: [], isLoading: false };
    }

    updateSearch() {
        this.setState({ isLoading: true });
        const search = this.state.search;
        if (search && search !== '') {
            fetch(API + search)
                .then(response => response.json())
                .then(data => this.setState({ items: data.items, categories: data.categories, isLoading: false }))
            // .catch(() => {});
        } else {
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.updateSearch();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.search !== prevProps.location.search) {
            const parsed = QueryString.parse(this.props.location.search);
            this.setState({ search: parsed.search });
        }
        if (this.state.search !== prevState.search) {
            this.updateSearch();
        }
    }

    render() {

        if (this.state.isLoading) {
            return <Spinner/>;
        }

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