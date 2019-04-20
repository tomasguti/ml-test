import React, { Component } from 'react';
import './SearchBar.scss';
import logo from '../assets/Logo_ML.png';
import searchIcon from '../assets/ic_Search.png';
import { Container, Row, Col } from 'react-grid-system';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="SearchBar">
                <Container fluid>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10} className="FlexInput">
                            <img className="MLLogo" src={logo} alt="ML"></img>
                            <input className="SearchInput" type="text" value={this.state.value} placeholder='Nunca dejes de buscar' onChange={this.handleChange} />
                            <input className="SearchButton" type="image" alt="search" src={searchIcon} onClick={this.handleSubmit} />            
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SearchBar;