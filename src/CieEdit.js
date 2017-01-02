import React, { Component } from 'react';
import CieConvert from './CieConvert';
import './CieEdit.css';
import update from 'immutability-helper';
const tinycolor = require("tinycolor2");

class CieEdit extends Component {

    constructor(props) {
        super(props);
        this.convert = new CieConvert();
        this.state = {internal: props.colorToInternal(props.color)};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field) {
        return (value) => {
            this.setState((prevState, props) => {
                const change = {[field]: {$set: value}};
                let internal = update(this.state.internal, change);
                //Allow changes to propagate to other children
                const propagated = this.props.colorToInternal(
                        this.props.internalToColor(internal));
                //Peg the source child to its input value
                return {internal: update(propagated, change)};
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const prevStateColor = this.props.internalToColor(prevState.internal);
        const currStateColor = this.props.internalToColor(this.state.internal);

        //Sync state to match props if needed.
        if (!tinycolor.equals(prevProps.color, this.props.color)) {
            if (!tinycolor.equals(currStateColor, this.props.color)) {
                this.setState({internal: this.props.colorToInternal(this.props.color)});
            }
            return;
        }

        //Update parent to match state, if needed
        if (!tinycolor.equals(prevStateColor, currStateColor)) {
            this.props.updateParent(currStateColor);
        }
    }

    render() {
        return (
                <div className="CieEdit" >
                    {
                        React.Children.map(this.props.children, (child) =>
                            React.cloneElement(child,
                                    {
                                        value: this.state.internal[child.props.name],
                                        updateParent: this.handleChange(child.props.name)
                                    }))
                    }
                </div>
                );
    }
}

export default CieEdit;

