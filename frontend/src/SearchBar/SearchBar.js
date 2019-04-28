import React, { Component } from 'react';
import './SearchBar.scss';
import logo from '../assets/Logo_ML.png';
import searchIcon from '../assets/ic_Search.png';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom'
import { parseSearch } from '../utils';
import Img from 'react-image';

const ENTER_PC = 27;
const ENTER_MOBILE = 13;
const DEFAULT_TITLE = 'Mercado Libre Argentina';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        const search = parseSearch(props);
        this.state = { value: search };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleEnter(event) {
        if (event.keyCode === ENTER_MOBILE || event.keyCode === ENTER_PC) {
            this.handleSubmit(event);
        }
    }

    componentDidUpdate(prevProp) {
        if (prevProp.location.search !== this.props.location.search) {
            if (this.state.value !== '' && this.props.location.search === '') {
                // Clear input when leaving search
                this.setState({ value: '' });
            } else {
                const search = parseSearch(this.props);
                this.setState({ value: search });
            }
        }

        if (!this.props.match.params.id && (!this.props.location.search || this.props.location.search === '')) {
            document.title = DEFAULT_TITLE;
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEnter);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEnter);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value !== '') {
            this.props.history.push('/items?search=' + this.state.value);
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <Container fluid>
                    <Row>
                        <Col md={10} offset={{ md: 1 }} className="FlexInput">
                            <Link to="/"><Img className="MLLogo" src={logo} alt="ML"></Img></Link>
                            <input className="SearchInput" type="text" value={this.state.value} placeholder='Nunca dejes de buscar' onChange={this.handleChange} />
                            <input className="SearchButton" type="image" alt="search" src={searchIcon} onClick={this.handleSubmit} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SearchBar;