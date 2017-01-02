import React, { Component } from 'react';
import CieConvert from './CieConvert';
import './LuvEdit.css';
import CiePartEdit from './CiePartEdit';
import CieEdit from './CieEdit';

class LuvEdit extends Component {

    constructor(props) {
        super(props);
        this.convert = new CieConvert();
    }

    render() {
        return (
                <div className="LuvEdit" >
                    <CieEdit
                        color={this.props.color}
                        updateParent={this.props.updateParent}
                        colorToInternal={this.convert.colorToLuv}
                        internalToColor={this.convert.luvToColor}
                        >
                        <CiePartEdit name="l"
                            label="Lightness"
                            min={this.convert.luvRange().min[0]}
                            max={this.convert.luvRange().max[0]}
                        />
                        <CiePartEdit name="u"
                            label="CIE-u*"
                            min={this.convert.luvRange().min[1]}
                            max={this.convert.luvRange().max[1]}
                        />
                        <CiePartEdit name="v"
                            label="CIE-v*"
                            min={this.convert.luvRange().min[2]}
                            max={this.convert.luvRange().max[2]}
                        />
                    </CieEdit>
                </div>
                );
    }
}

export default LuvEdit;

