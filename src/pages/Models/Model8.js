import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
  mxGraph,
  mxRubberband,
  mxKeyHandler,
  mxClient,
  mxUtils,
  mxEvent,
  mxPoint
} from "mxgraph-js";
import { black } from "ansi-colors";
import GraphData from "./cylinder"

export default class MXGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.LoadGraph = this.LoadGraph.bind(this);
  }

  componentDidMount() {
    this.LoadGraph();
  }

  LoadGraph() {
    var container = document.getElementById('divGraph'); //ReactDOM.findDOMNode(this.refs.divGraph);
    var zoomPanel = ReactDOM.findDOMNode(this.refs.divZoom);

    let vertexOjects = {};
    let edgeObjects = {};

    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error("Browser is not supported!", 200, false);
    } else {
      // Disables the built-in context menu
      mxEvent.disableContextMenu(container);

      // Creates the graph inside the given container
      var graph = new mxGraph(container);

      // Enables rubberband selection
      new mxRubberband(graph);

      // Gets the default parent for inserting new cells. This is normally the first
      // child of the root (ie. layer 0).
      var parent = graph.getDefaultParent();
      var root = undefined;
      // Enables tooltips, new connections and panning
      graph.setPanning(true);
      graph.setTooltips(true);
      graph.setConnectable(true);
      graph.setEnabled(true);
      graph.setEdgeLabelsMovable(false);
      graph.setVertexLabelsMovable(false);
      graph.setGridEnabled(true);
      graph.setAllowDanglingEdges(false);

      graph.getModel().beginUpdate();
      try {
        var dict = {};

        GraphData.map((x)=>
        {
               x.root.map((gdata)=>{
                   if(gdata.vertex)
                   {
                    var graphElement= graph.insertVertex(parent, gdata.id, gdata.value,  gdata.mxGeometry.x, gdata.mxGeometry.y,gdata.mxGeometry.width, gdata.mxGeometry.height,gdata.style);
                    vertexOjects[gdata.id] = graphElement;
                   }
                   else if(gdata.edge)
                   {
                    var edgobj=graph.insertEdge(parent, gdata.id, gdata.value, vertexOjects[gdata.source], vertexOjects[gdata.target],gdata.style);
                    edgobj.relative = gdata.relative;
                    
                    var ptObjts=[];
                    edgeObjects[gdata.id]=edgobj;
                    gdata.mxGeometry.mxPoint.forEach(element => {
                    var ptObj=  new mxPoint(parseInt(element.x),parseInt(element.y));  
                    ptObjts.push(ptObj);
                   });;
                  // edgobj.geometry.points= ptObjts;
                   }
               }); 
        });


        // run through each element in json
      
      }finally {
        // Updates the display
        graph.getModel().endUpdate();
      }

      
      
      // Enables rubberband (marquee) selection and a handler for basic keystrokes
    //   var rubberband = new mxRubberband(graph);
    //   var keyHandler = new mxKeyHandler(graph);






    }
  }
  
  render() {
 

    return <div className="graph-container"  id="divGraph" style={{marginLeft:'300px'}} />;
  }
}
