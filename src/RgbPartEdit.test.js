import React from 'react';
import RgbPartEdit from './RgbPartEdit';
import {shallow} from 'enzyme';
const tinycolor = require("tinycolor2");

it('has edit field', () => {
    const value = Math.floor(Math.random() * 256);
    const update = jest.fn();

    const rgbPartEdit = shallow(
            <RgbPartEdit
                name="test"
                value={value}
                updateParent={update}
            />);
    const input = rgbPartEdit.find('EditableInput');

    expect(input.props().value)
        .toBe(value);
    expect(input.props().name)
        .toBe("test");

    const newValue = Math.floor(Math.random() * 256);
    input.props().updateParent(newValue);
    expect(update.mock.calls[update.mock.calls.length - 1][0])
        .toBe(newValue);

    expect(input.props().parse("0")).toBe(0);
    expect(input.props().parse("255")).toBe(255);
    expect(input.props().parse("000255")).toBe(255);
    expect(input.props().parse("255.0")).toBe(255);

    expect(input.props().isValid("255")).toBe(true);
    expect(input.props().isValid("0255")).toBe(true);
    expect(input.props().isValid("255.0")).toBe(true);

    expect(input.props().isValid("254.3")).toBe(false);
    expect(input.props().isValid("256")).toBe(false);
    expect(input.props().isValid("-1")).toBe(false);
    expect(input.props().isValid("ocelot")).toBe(false);
    expect(input.props().isValid("5ocelot")).toBe(false);
    expect(input.props().isValid("5ocelot3")).toBe(false);

});
