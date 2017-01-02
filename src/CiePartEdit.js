import React, { Component } from 'react';
import EditableInput from './EditableInput';
import './CiePartEdit.css';

class CiePartEdit extends Component {

    constructor(props) {
        super(props);
        this.isValid = this.isValid.bind(this);
    }

    parse(rawInput) {
        return parseFloat(rawInput);
    }

    isValid(rawInput) {
        const parsed = this.parse(rawInput);
        return +rawInput === parsed &&
            parsed <= this.props.max &&
            parsed >= this.props.min;
    }

    render() {
        return (
                <div className="CiePartEdit">
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
                        min={this.props.min}
                        max={this.props.max}
                        step="all"
                        value={this.props.value}
                        onChange={(e) => this.props.updateParent(
                                this.parse(e.target.value))}
                    />
                    </label>
                </div>
                );
    }
}

export default CiePartEdit;

