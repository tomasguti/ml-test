import React from 'react';
import { shallow } from 'enzyme';
import searchResponse from '../__tests__/searchResponse.json'
import SearchResults from './SearchResults';

describe('<SearchResults />', () => {

    it('should show and hide a spinner', () => {
        const itemDetails = shallow(<SearchResults location=""/>);
        itemDetails.setState({ isLoading: true });
        expect(itemDetails.find('Spinner').exists()).toBeTruthy();
        itemDetails.setState({ isLoading: false });
        expect(itemDetails.find('Spinner').exists()).toBeFalsy();
    });

    it('should show categories', () => {
        const searchResults = shallow(<SearchResults location=""/>);
        searchResults.setState({ categories: searchResponse.categories });
        expect(searchResults.find('Categories').exists()).toBeTruthy();
    });

    it('should render four results', () => {
        const searchResults = shallow(<SearchResults location=""/>);
        searchResults.setState({ items: searchResponse.items });
        expect(searchResults.find('SingleResult').length).toEqual(4);
    });

});
