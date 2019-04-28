import React from 'react';
import { shallow } from 'enzyme';
import searchResponse from '../__tests__/searchResponse.json'
import Categories from './Categories.js';

describe('<Categories />', () => {

    it('should render all the categories', () => {
        const categories = shallow(<Categories categories={searchResponse.categories} />);
        const spans = categories.find('span');
        expect(spans.length).toEqual(searchResponse.categories.length);
    });

});