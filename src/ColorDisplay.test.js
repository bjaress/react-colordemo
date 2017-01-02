import React from 'react';
import {shallow} from 'enzyme';
import ColorDisplay from './ColorDisplay';
const tinycolor = require("tinycolor2");

it('has an explicit background color', () => {
    const color = tinycolor.random();
    const colorDisplay = shallow(<ColorDisplay color={color} />);

    expect(colorDisplay.find('div.ColorDisplay')
            .props().style.backgroundColor)
        .toEqual(color.toHexString());
});
