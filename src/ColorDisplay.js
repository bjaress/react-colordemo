import React, { Component } from 'react';
import './ColorDisplay.css';

class ColorDisplay extends Component {
  render() {
    return (
      <div className="ColorDisplay" style={{ backgroundColor:
          this.props.color.toHexString() }} />
    );
  }
}

export default ColorDisplay;
