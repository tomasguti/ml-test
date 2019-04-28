import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {

    const location = { search: '?search=plantas' }

    it('renders a logo', () => {
        const searchBar = shallow(<SearchBar location={location} />);
        expect(searchBar.find('.MLLogo').exists()).toBeTruthy();
    });

    it('renders a text input', () => {
        const searchBar = shallow(<SearchBar location={location} />);
        expect(searchBar.find('.SearchInput').prop('value')).toEqual('plantas');
    });

    it('renders a button input', () => {
        const searchBar = shallow(<SearchBar location={location} />);
        expect(searchBar.find('.SearchButton').exists()).toBeTruthy();
    });

});
