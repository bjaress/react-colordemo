import React, { Component } from 'react';
import ColorDisplay from './ColorDisplay';
import ColorStringEdit from './ColorStringEdit';
import RgbEdit from './RgbEdit';
import LuvEdit from './LuvEdit';
import LabEdit from './LabEdit';
const tinycolor = require("tinycolor2");
import './App.css';

const defaultColor = "#730039" ;

class App extends Component {
    constructor(props) {
          super(props);
          this.state = {color: tinycolor(
                  this.props.color || defaultColor)};
          this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
                <div className="App">
                    <RgbEdit color={this.state.color}
                        updateParent={this.handleChange} />
                    <ColorDisplay color={this.state.color} />
                    <LabEdit color={this.state.color}
                        updateParent={this.handleChange} />
                    <LuvEdit color={this.state.color}
                        updateParent={this.handleChange} />
                    <ColorStringEdit color={this.state.color}
                        updateParent={this.handleChange} />
                </div>
               );
    }

    handleChange(color) {
        this.setState({color: color});
    }

}

export default App;
