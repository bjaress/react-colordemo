import React from 'react';
import CieEdit from './CieEdit';
import CiePartEdit from './CiePartEdit';
import CieConvert from './CieConvert';
import {shallow} from 'enzyme';
const tinycolor = require("tinycolor2");

describe("CieEdit", () => {
    let color, internal, cieEdit,
        updateParent, colorToInternal, internalToColor;
    beforeEach(() => {
        color = tinycolor.random();
        internal = {"partA": 0, "partB": 0};
        colorToInternal = jest.fn(() => internal);
        internalToColor = jest.fn(() => color);
        updateParent = jest.fn();

        cieEdit = shallow(
                <CieEdit
                    color={color}
                    updateParent={updateParent}
                    colorToInternal={colorToInternal}
                    internalToColor={internalToColor}
                    >
                    <CiePartEdit
                        name="partA"
                        min="0"
                        max="1"
                    />
                    <CiePartEdit
                        name="partB"
                        min="0"
                        max="1"
                    />
                </CieEdit>,
                { lifecycleExperimental: true }
        );
    });

    it('has edit fields that start with initial values', () => {

        expect(cieEdit.find('CiePartEdit').length).toBe(2);

        ['partA', 'partB'].forEach((part) => {
            expect(cieEdit.find('CiePartEdit[name="'+part+'"]').props().value)
                .toBe(internal[part]);
        });
    });

    it('only clobbers input when necessary', () => {
        expect(cieEdit.state().internal.partA).toBe(0);
        expect(cieEdit.state().internal.partB).toBe(0);

        internal = {partA: 1, partB: 1};
        cieEdit.setProps({color: color});

        expect(cieEdit.state().internal.partA).toBe(0);
        expect(cieEdit.state().internal.partB).toBe(0);

        cieEdit.setProps({color: tinycolor.random()});

        expect(cieEdit.state().internal.partA).toBe(1);
        expect(cieEdit.state().internal.partB).toBe(1);
    });

    it('updates the parent on changes', () => {
        expect(updateParent.mock.calls.length).toBe(0);
        internalToColor
            .mockImplementationOnce(() => tinycolor.random())
            .mockImplementationOnce(() => tinycolor.random());
        cieEdit.find('CiePartEdit[name="partA"]').props().updateParent(1);
        expect(updateParent.mock.calls.length).toBe(1);
    });

    it('updates itself on changes', () => {
        cieEdit.find('CiePartEdit[name="partA"]').props().updateParent(1);
        expect(cieEdit.state().internal.partA).toBe(1);
        expect(cieEdit.state().internal.partB).toBe(0);
    });

    it('propagates updates to other children, but not the one changed', () => {
        internal = {partA: 1, partB: 1};
        cieEdit.find('CiePartEdit[name="partA"]').props().updateParent(0.5);
        expect(cieEdit.state().internal.partA).toBe(0.5);
        expect(cieEdit.state().internal.partB).toBe(1);
    });

});
