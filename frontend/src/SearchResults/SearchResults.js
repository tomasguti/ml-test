import React, { Component } from 'react';
import './SearchResults.scss';
import { Container, Row, Col } from 'react-grid-system';
import SingleResult from './SingleResult/SingleResult';
import Categories from '../Categories/Categories';
import Spinner from '../Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { parseSearch } from '../utils';

const API = '/api/items?q=';

class SearchResults extends Component {

    constructor(props) {
        super(props);

        const search = parseSearch(props);
        this.state = { search: search, items: [], categories: [], isLoading: false, error: false };
    }

    updateSearch() {
        this.setState({ isLoading: true });
        const search = this.state.search;
        if (search && search !== '') {
            this.setTitle(search);
            fetch(API + search)
                .then(response => response.json())
                .then(data => this.setState({ items: data.items, categories: data.categories, isLoading: false, error: false }))
                .catch(() => this.setState({ error: true }));
        } else {
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.updateSearch();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.search !== prevProps.location.search) {
            const search = parseSearch(this.props);
            this.setState({ search: search });
        }
        if (this.state.search !== prevState.search) {
            this.updateSearch();
        }
    }

    setTitle(title) {
        const titleString = title.toLowerCase();
        const capsTitle = titleString.charAt(0).toUpperCase() + titleString.slice(1);
        document.title = capsTitle + ' en Mercado Libre';
    }

    render() {

        if (this.state.error) {
            return <Redirect to="/error" />
        }

        if (this.state.isLoading) {
            return <Spinner />;
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