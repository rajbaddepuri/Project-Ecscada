import { useState } from "react";
import axios from "axios";
import React from "react";
import Sketch from "@uiw/react-color-sketch";
import Github from "@uiw/react-color-github";
import { Button, Modal } from "react-bootstrap";

class MyVerticallyCenteredModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      upperValue: "",
      lowerValue: "",
      color: null,

    };
    

  }

  componentDidMount() {
     
  }

  //UpperValue----
  upperValueHandler = (e) => {
    this.setState({ upperValue: e.target.value });
  };

  //LowerValue
  lowerValueHandler = (e) => {
    this.setState({ lowerValue: e.target.value });
  };

  colorHandler = (e) => {};

  //Save
  save = () => {
    this.props.onSave({
      upperValue: this.state.upperValue,
      lowerValue: this.state.lowerValue,
      axisIndex: this.props.tagData["axisIndex"],
      color: this.state.color,
    });
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="small"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {this.props.tagData["axisIndex"] + 1}{" "}
            {this.props.tagData["tagName"]}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group">
            UpperValue
            <input
              type="text"
              class="form-control"
              placeholder={this.props.tagData["upperValue"]}
              onChange={(e) => this.upperValueHandler(e)}
            />
          </div>
          <div class="form-group">
            LowerValue
            <input
              type="text"
              class="form-control"
              placeholder={this.props.tagData["lowerValue"]}
              onChange={(e) => this.lowerValueHandler(e)}
            />
          </div>
          <div class="row">
            <label for="inputEmail">Select Pen Color : </label> &nbsp; &nbsp;
            {/* <Button style={{background:this.state.color}} onClick={this.props.onHide}>
          
          </Button> */}
            {/* npm i @uiw/react-color-sketch */}
            {/* <Sketch
              style={{ marginLeft: 20 }}
              color={this.props.tagData["color"]}
              onChange={(color) => {
                this.setState({ color: color.hex });
              }}
            /> */}
            {/* npm i @uiw/react-color-github */}
            <Github  style={{background: this.state.color == undefined ?this.props.tagData["color"] : this.state.color }}
              color={this.state.color}
              onChange={(color) => {
                  console.log(color.hex)
                this.setState({ color: color.hex });
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary"  onClick={this.save}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default MyVerticallyCenteredModal;