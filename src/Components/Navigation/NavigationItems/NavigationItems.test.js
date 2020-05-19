import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

//npm install enzyme react-test-renderer enzyme-adapter-react-16
//enzyme package helps to test individual components
describe('<NavigationItems/>', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    });
    it('should render two <NavigationItem/> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem/> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render profile  <NavigationItem/> element if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/profile">My Profile</NavigationItem>)).toEqual(true);
    });

    it('should render orders <NavigationItem/> element if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/orders">All Orders</NavigationItem>)).toEqual(true);
    });

    it('should not render profile  <NavigationItem/> element if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/profile">My Profile</NavigationItem>)).toEqual(false);
    });
        it('should not orders orders <NavigationItem/> element if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/orders">All Orders</NavigationItem>)).toEqual(false);
    });

});