import React from 'react';
import CiePartEdit from './CiePartEdit';
import {shallow} from 'enzyme';

it('has edit field', () => {
    const update = jest.fn();
    const min = -Math.ceil(Math.random() * 100);
    const max = 1 + Math.ceil(Math.random() * 100);
    const value = min + (max - min) * Math.random();

    const ciePartEdit = shallow(
            <CiePartEdit
                name="test"
                min={min}
                max={max}
                value={value}
                updateParent={update}
            />);
    const input = ciePartEdit.find('EditableInput');

    expect(input.props().value)
        .toBe(value);
    expect(input.props().name)
        .toBe("test");

    const newValue = min + (max - min) * Math.random();
    input.props().updateParent(newValue);
    expect(update.mock.calls[update.mock.calls.length - 1][0])
        .toBe(newValue);

    expect(input.props().parse(""+value)).toBe(value);
    expect(input.props().parse(""+min)).toBe(min);
    expect(input.props().parse(""+max)).toBe(max);
    expect(input.props().parse("-00005")).toBe(-5);
    expect(input.props().parse("0.10")).toBe(0.1);

    expect(input.props().isValid(""+value)).toBe(true);
    expect(input.props().isValid(""+min)).toBe(true);
    expect(input.props().isValid(""+max)).toBe(true);
    expect(input.props().isValid("-00005")).toBe(true);

    expect(input.props().isValid(""+(max+1))).toBe(false);
    expect(input.props().isValid(""+(min-1))).toBe(false);
    expect(input.props().isValid("ocelot")).toBe(false);
    expect(input.props().isValid(value+"ocelot")).toBe(false);
    expect(input.props().isValid("0ocelot.3")).toBe(false);

});
