import React from 'react';
import LuvEdit from './LuvEdit';
import CieConvert from './CieConvert';
import {mount} from 'enzyme';
const tinycolor = require("tinycolor2");

it('has edit fields', () => {
    const color = tinycolor.random();
    const luvEdit = mount(<LuvEdit
            color={color}
            updateParent={() => undefined} />);

    expect(luvEdit.find('CiePartEdit').length).toBe(3);

    ['l', 'u', 'v'].forEach((part) => {
        expect(parseFloat(luvEdit.find('input[name="'+part+'"]').props().value))
            .toBe(new CieConvert().colorToLuv(color)[part]);
    });
});
