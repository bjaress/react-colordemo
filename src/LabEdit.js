import React, { Component } from 'react';
import CieConvert from './CieConvert';
import './LabEdit.css';
import CiePartEdit from './CiePartEdit';
import CieEdit from './CieEdit';

class LabEdit extends Component {

    constructor(props) {
        super(props);
        this.convert = new CieConvert();
    }

    render() {
        return (
                <div className="LabEdit" >
                    <CieEdit
                        color={this.props.color}
                        updateParent={this.props.updateParent}
                        colorToInternal={this.convert.colorToLab}
                        internalToColor={this.convert.labToColor}
                        >
                        <CiePartEdit name="l"
                            label="Lightness"
                            min={this.convert.labRange().min[0]}
                            max={this.convert.labRange().max[0]}
                        />
                        <CiePartEdit name="a"
                            label="red/green"
                            min={this.convert.labRange().min[1]}
                            max={this.convert.labRange().max[1]}
                        />
                        <CiePartEdit name="b"
                            label="yell./blue"
                            min={this.convert.labRange().min[2]}
                            max={this.convert.labRange().max[2]}
                        />
                    </CieEdit>
                </div>
                );
    }
}

export default LabEdit;

