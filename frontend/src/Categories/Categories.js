import React, { Component } from 'react';
import chevronRight from '../assets/chevron-right.svg';
import './Categories.scss';
import { Row, Col } from 'react-grid-system';

class Categories extends Component {
    render() {
        const lastCategory = this.props.categories.length - 1;
        const categories = this.props.categories.map(function (category, i) {
            if (i === lastCategory) {
                return (
                    <span key={i} className="LastCategory">{category}</span>
                );
            } else {
                return (
                    <span key={i}>{category} <img src={chevronRight} alt="chevronRight" width="16" height="16" /> </span>
                );
            }
        });
        return (
            <Row align="start">
                <Col md={10} offset={{ md: 1 }} className="Categories">
                    {categories}
                </Col>
            </Row>
        );
    }
}

export default Categories;