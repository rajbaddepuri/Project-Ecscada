import React, { Component } from 'react';
import { ChromePicker } from 'react-color'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import "./Modal.css"

class 
Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            UPPERVALUE: '',
            LOWERVALUE: '',
            displayColorPicker: true,
            color: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
            },
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            msg: nextProps.msg,
        });
    }
    handleClick = () => {

        this.setState({ displayColorPicker: !this.state.displayColorPicker })
      };
    
      handleClose = () => {
        this.setState({ displayColorPicker: false })
      };

    titleHandler(e) {
        this.setState({UPPERVALUE: e.target.value });
    }

    msgHandler(e) {
        this.setState({ LOWERVALUE: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.setState({UPPERVALUE: ""});
        this.setState({LOWERVALUE: ""});
        this.setState({color: ""});
        this.props.saveModalDetails(item)
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

      console.log(this.props)

        const styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
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
            <div className="modal fade" id="myModal"  role="dialog" data-backdrop="false" style={{marginLeft:"900px",width:"500px"}} >
                <div className="modal-dialog modal-sm" >
                    <div className="modal-content">
                        <div className="modal-header" >
                          <p>Settings</p>
                            {/* <h5 className="modal-title" id="exampleModalLabel">Edit Jewel</h5> */}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                          <p>{this.props.POINTNAME}</p>
                            <p><span className="modal-lable">High Limit:</span><input value={this.state.UPPERVALUE} onChange={(e) => this.titleHandler(e)} /></p>
                            <p><span className="modal-lable">Low Limit:</span><input value={this.state.LOWERVALUE} onChange={(e) => this.msgHandler(e)} /></p>
                            <p>Please choose the color</p>
                            <div style={ styles.swatch } onClick={ this.handleClick }>
                            <div style={ styles.color } />
                            </div>
                            { this.state.displayColorPicker ? <div style={ styles.popover }>
                            <div style={ styles.cover } onClick={ this.handleClose }/>
                            <SketchPicker color={ " " } onChange={ this.handleChange } />
                            </div> : null }
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;

