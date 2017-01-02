import React from 'react';
import LabEdit from './LabEdit';
import CieConvert from './CieConvert';
import {mount} from 'enzyme';
const tinycolor = require("tinycolor2");

it('has edit fields', () => {
    const color = tinycolor.random();
    const labEdit = mount(<LabEdit
            color={color}
            updateParent={() => undefined} />);

    expect(labEdit.find('CiePartEdit').length).toBe(3);

    ['l', 'b', 'b'].forEach((part) => {
        expect(parseFloat(labEdit.find('input[name="'+part+'"]').props().value))
            .toBe(new CieConvert().colorToLab(color)[part]);
    });
});
