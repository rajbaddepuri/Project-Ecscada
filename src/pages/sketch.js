'use strict'

import React,{Component} from 'react';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import hexRgb from 'hex-rgb';
import { TextComponent } from 'react-native';

export default class SketchExample extends Component{
  state = {
    displayColorPicker: false,
    
    
      r: '0',
      g: '255',
      b: '0',
      a: '1',
    
  };
  componentDidMount(){
     //const {red, green, blue } = hexRgb('#0000FF');// this with package npm install hex-rgb
    
     
    const {red, green, blue } = this.hexToRGB('#00FF00')// this is with out package
    console.log(red) // 255
console.log(green) // 0
console.log(blue) // 255

    this.setState({
        r:red,
        g:green,
        b:blue  
    })
  }

  //////............this is for automatic colour pic........///
  
  hexToRGB = (hexColor) =>{
           var temp = hexColor.split("#")
           var hexColor = "0X"+temp[1]
           console.log(hexColor)
    
        return {
          red: (hexColor >> 16) & 0xFF,
          green: (hexColor >> 8) & 0xFF,  
          blue: hexColor & 0xFF,
          
        }
        
      }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };
  

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.r }, ${ this.state.g }, ${ this.state.b }, ${ this.state.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div style={{marginLeft:"300px"}}>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

