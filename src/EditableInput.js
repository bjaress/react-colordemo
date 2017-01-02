import React, { Component } from 'react';
import './EditableInput.css'

class EditableInput extends Component {
    /*
     * Required Properties:
     *
     * updateParent: accepts internal representation
     * parse: translates display (or input) representation
     *  to internal if valid
     * value: internal representation of the value to display
     *
     * Optional Properties:
     *
     * show(value): translates internal representation to display representation
     * isValid(rawInput): returns true if there is a valid internal
     *  representation, false otherwise
     * equivalent(valueA, valueB): true if the internal values are
     *  equivalent, false otherwise
     *  name: name for the input box
     */
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {rawInput: this.show(props.value)};
    }

    show(parsed) {
        if (this.props.show) {
            return this.props.show(parsed);
        } else {
            return parsed + "";
        }
    }

    isValid(rawInput) {
        if (this.props.isValid) {
            return this.props.isValid(rawInput);
        } else {
            return true;
        }
    }

    equivalent(parsedA, parsedB) {
        if (this.props.equivalent) {
            return this.props.equivalent(parsedA, parsedB);
        } else {
            return this.show(parsedA) === this.show(parsedB);
        }
    }

    //Update the displayed value from the new properties only if
    //it is valid and doing so will actually change the parsed value.
    componentWillReceiveProps(nextProps) {
        if (this.isValid(this.show(nextProps.value)) && !this.equivalent(
                    nextProps.value, this.props.parse(this.state.rawInput))) {
            this.setState({rawInput: this.show(nextProps.value)});
        }
    }

    handleChange(e) {
        const rawInput = e.target.value;
        const parsed = this.props.parse(rawInput);

        this.setState({rawInput: rawInput}, () => {
            if (this.isValid(rawInput)) {
                this.props.updateParent(parsed);
            }
        });
    }

    render() {
        return (
                <span className="EditableInput">
                    <input
                        type="text"
                        name={this.props.name}
                        onChange={this.handleChange}
                        value={this.state.rawInput}
                        className={this.isValid(this.state.rawInput) ?
                            'valid' : 'invalid'}
                        />
                </span>
               );
    }
}

export default EditableInput;
