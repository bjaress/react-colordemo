import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ColorDisplay from './ColorDisplay';
import {shallow, mount} from 'enzyme';
const tinycolor = require("tinycolor2");

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('passes colors on to all children', () => {
    const color = tinycolor.random();
    const app = shallow(<App color={color} />);

    app.children().forEach((child) => {
        expect(child.props().color).toEqual(color);
    });
});

it('accepts color updates from children', () => {
    const color = "green";
    const app = new App({});
    app.setState = jest.fn();
    app.handleChange(color);
    expect(app.setState).toHaveBeenCalled();
});

it('allows editing the color', () => {
    let color = tinycolor.random();
    const app = mount(<App color={color} />);

    expect(app.find('.ColorDisplay').props().style.backgroundColor)
        .toBe(color.toHexString());

    color = color.complement();

    expect(app.find('.ColorDisplay').props().style.backgroundColor)
        .not.toBe(color.toHexString());

    app.find('.RgbEdit input[name="r"]').simulate('change',
            {target: {value: color.toRgb().r}});
    app.find('.RgbEdit input[name="g"]').simulate('change',
            {target: {value: color.toRgb().g}});
    app.find('.RgbEdit input[name="b"]').simulate('change',
            {target: {value: color.toRgb().b}});

    expect(app.find('.ColorDisplay').props().style.backgroundColor)
        .toBe(color.toHexString());

});
