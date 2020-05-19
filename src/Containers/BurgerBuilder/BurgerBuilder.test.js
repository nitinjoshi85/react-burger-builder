import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
//import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <BurgerBuilder  />
        );
    });

    xit('should contain build controls', () => {
        wrapper.setProps({ingredients: {salad: 0}, totalPrice: 4});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});