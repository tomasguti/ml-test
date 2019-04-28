import React from 'react';
import { shallow } from 'enzyme';
import searchResponse from '../../__tests__/searchResponse.json'
import SingleResult from './SingleResult';

describe('<SingleResult />', () => {

    it('should show a title', () => {
        const item = searchResponse.items[0];
        const singleResult = shallow(<SingleResult item={item} />);
        const title = singleResult.find('.Title');
        expect(title.text()).toEqual('Lithops Cactus Piedra Combo 10 Unidades Plantas Raras (av,l)');
    });

    it('should render a 180x180 thumbnail', () => {
        const item = searchResponse.items[0];
        const singleResult = shallow(<SingleResult item={item} />);
        expect(singleResult.find('.Thumbnail').exists()).toBeTruthy();
        const thumbnail = singleResult.find('.Thumbnail').first();
        expect(thumbnail.prop('width')).toEqual('180');
        expect(thumbnail.prop('height')).toEqual('180');
    });

    it('should render a price without decimals', () => {
        const item = searchResponse.items[0];
        const singleResult = shallow(<SingleResult item={item} />);
        const price = singleResult.find('.Price');
        const decimals = singleResult.find('.PriceDecimals');
        expect(price.text()).toEqual('$ 700 ');
        expect(decimals.text()).toEqual('');
    });

    it('should render a price with decimals', () => {
        const item = searchResponse.items[1]; // This one has decimals
        const singleResult = shallow(<SingleResult item={item} />);
        const price = singleResult.find('.Price');
        const decimals = singleResult.find('.PriceDecimals');
        expect(price.text()).toEqual('$ 56 90');
        expect(decimals.text()).toEqual('90');
    });

    it('should display a state', () => {
        const item = searchResponse.items[0];
        const singleResult = shallow(<SingleResult item={item} />);
        const address = singleResult.find('.Address');
        expect(address.html().includes('Capital Federal')).toBeTruthy();
    });

});