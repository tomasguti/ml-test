import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {

    it('renders a logo', () => {
        const searchBar = shallow(<SearchBar />);
        expect(searchBar.find('.MLLogo')).toBeTruthy();
    });

    it('renders a text input', () => {
        const searchBar = shallow(<SearchBar />);
        expect(searchBar.find('.SearchInput')).toBeTruthy();
    });

    it('renders a button input', () => {
        const searchBar = shallow(<SearchBar />);
        expect(searchBar.find('.SearchButton')).toBeTruthy();
    });

});
