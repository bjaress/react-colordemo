import React, { Component } from 'react';
import EditableInput from './EditableInput';
import './RgbPartEdit.css';

class RgbPartEdit extends Component {

    parse(rawInput) {
        return Math.round(parseFloat(rawInput));
    }

    isValid(rawInput) {
        const parsed = this.parse(rawInput);
        const rawNumber = +rawInput;
        return rawNumber === parsed && parsed <= 255 && parsed >= 0;
    }

    render() {
        return (
                <div className="RgbPartEdit">
                    <label><span className="label">{this.props.label}</span>
                    <EditableInput
                        name={this.props.name}
                        value={this.props.value}
                        updateParent={this.props.updateParent}

                        isValid={this.isValid}
                        parse={this.parse}
                    />
                    <input
                        type="range"
                        min="0"
                        max="255"
                        step="1"
                        value={this.props.value}
                        onChange={(e) => this.props.updateParent(e.target.value)}
                    />
                    </label>
                </div>
                );
    }
}

export default RgbPartEdit;

