import React, { Component } from 'react';
const tinycolor = require("tinycolor2");
import EditableInput from './EditableInput';

class ColorStringEdit extends Component {

    render() {
        return (
                <EditableInput
                    updateParent={this.props.updateParent}
                    parse={tinycolor}
                    value={this.props.color}

                    show={(color) => color.toHexString()}
                    isValid={(rawInput) => tinycolor(rawInput).isValid()}
                />);
    }
}

export default ColorStringEdit;
