import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';


import Home from './Home.jsx';


describe('Home Component', function () {

  it('should render the component <Home/>', function () {
    const wrapper = shallow(<Home />);
    
    expect(wrapper).to.exist;
  });

});
