import React from 'react';
import RgbEdit from './RgbEdit';
import {shallow} from 'enzyme';
const tinycolor = require("tinycolor2");

it('has edit fields', () => {
    let rgbEdit;
    function update(color) {
        rgbEdit = shallow(<RgbEdit
                color={color}
                updateParent={update} />);
    }
    const color = tinycolor.random();
    update(color);

    expect(rgbEdit.find('RgbPartEdit').length).toBe(3);

    ['r', 'g', 'b'].forEach((part) => {
        expect(rgbEdit.find('RgbPartEdit[name="'+part+'"]').props().value)
            .toBe(color.toRgb()[part]);
    });

    const complement = color.complement();
    ['r', 'g', 'b'].forEach((part) => {
        rgbEdit.find('RgbPartEdit[name="'+part+'"]').props()
            .updateParent(complement.toRgb()[part]);
    });
    ['r', 'g', 'b'].forEach((part) => {
        expect(rgbEdit.find('RgbPartEdit[name="'+part+'"]').props().value)
            .toBe(complement.toRgb()[part]);
    });

});
