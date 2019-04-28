import React from 'react';
import { shallow } from 'enzyme';
import responseItem from '../__tests__/itemResponse.json'
import ItemDetails from './ItemDetails.js';

describe('<ItemDetails />', () => {

    const match = new Object();
    match.params = { id: '' };

    it('should show and hide a spinner', () => {
        const itemDetails = shallow(<ItemDetails match={match}/>);
        itemDetails.setState({ isLoading: true });
        expect(itemDetails.find('Spinner').exists()).toBeTruthy();
        itemDetails.setState({ isLoading: false });
        expect(itemDetails.find('Spinner').exists()).toBeFalsy();
    });

    it('should render a 680x680 picture', () => {
        const itemDetails = shallow(<ItemDetails match={match}/>);
        itemDetails.setState({ item: responseItem.item, isLoading: false });
        expect(itemDetails.find('.ItemPicture').exists()).toBeTruthy();
        const picture = itemDetails.find('.ItemPicture').last();
        expect(picture.prop('width')).toEqual('680');
        expect(picture.prop('height')).toEqual('680');
    });

    it('shows the item\'s condition and sold quantity', () => {
        const condition = responseItem.item.condition === 'new' ? 'Nuevo' : 'Usado';
        const expected = `${condition} - ${responseItem.item.sold_quantity} vendidos`;
        const itemDetails = shallow(<ItemDetails match={match}/>);
        itemDetails.setState({ item: responseItem.item, isLoading: false });
        expect(itemDetails.find('.ItemStats').text()).toEqual(expected);
    });

    it('renders an item title', () => {
        const expectedTitle = responseItem.item.title;
        const itemDetails = shallow(<ItemDetails match={match}/>);
        itemDetails.setState({ item: responseItem.item, isLoading: false });
        expect(itemDetails.find('.ItemTitle').text()).toEqual(expectedTitle);
    });

    it('renders an item price', () => {
        const decimals = responseItem.item.price.decimals ? responseItem.item.price.decimals.toString() : '';
        const expectedPrice = responseItem.item.price.currency + ' ' + responseItem.item.price.amount + decimals;
        const itemDetails = shallow(<ItemDetails match={match}/>);
        itemDetails.setState({ item: responseItem.item, isLoading: false });
        expect(itemDetails.find('.ItemPrice').text()).toEqual(expectedPrice);
        expect(itemDetails.find('.ItemDecimals').text()).toEqual(decimals);
    });

    it('shows a buy button', () => {
        const itemDetails = shallow(<ItemDetails match={match}/>);
        itemDetails.setState({ item: responseItem.item, isLoading: false });
        expect(itemDetails.find('.BuyButton').exists()).toBeTruthy();
    });

    it('shows an item\'s description', () => {
        const itemDetails = shallow(<ItemDetails match={match}/>);
        itemDetails.setState({ item: responseItem.item, isLoading: false });
        expect(itemDetails.find('.Description').text()).toEqual(responseItem.item.description);
    });

});