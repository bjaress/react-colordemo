import React, { Component } from 'react';
const tinycolor = require("tinycolor2");
import ColorStringEdit from './ColorStringEdit';
import './RgbEdit.css';
import RgbPartEdit from './RgbPartEdit';

class RgbEdit extends Component {

    handleChange(field) {
        return (value) => {
            let rgb = this.props.color.toRgb();
            rgb[field] = value;
            this.props.updateParent(tinycolor(rgb));
        };
    }

    render() {
        return (
                <div className="RgbEdit" >
                    <ColorStringEdit color={this.props.color}
                        updateParent={this.props.updateParent} />
                    <RgbPartEdit name="r"
                        label="Red"
                        value={this.props.color.toRgb().r}
                        updateParent={this.handleChange('r')}
                    />
                    <RgbPartEdit name="g"
                        label="Green"
                        value={this.props.color.toRgb().g}
                        updateParent={this.handleChange('g')}
                    />
                    <RgbPartEdit name="b"
                        label="Blue"
                        value={this.props.color.toRgb().b}
                        updateParent={this.handleChange('b')}
                    />
                </div>
                );
    }
}

export default RgbEdit;

