
import React from 'react';

//import ShowcaseButton from '../showcase-components/showcase-button';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeriesCanvas,
  LineMarkSeries,
  LineSeriesCanvas,
  LineSeries,
  Crosshair
} from 'react-vis';


function getRandomData(n) {
  var x = [];
  var y = [];
    
    for(let i =0; i < n; i++){
        x.push(i);
        x.push(i*2)
    }
    return x;
    console.log(x)
}

const data = getRandomData(100);


const colorRanges = {
  typeA: ['#59E4EC', '#0D676C'],
  typeB: ['#EFC1E3', '#B52F93']
};

const nextType = {
  typeA: 'typeB',
  typeB: 'typeA'
};

const nextModeContent = {
  canvas: 'SWITCH TO SVG',
  svg: 'SWITCH TO CANVAS'
};

const drawModes = ['canvas', 'svg'];

export default class Example extends React.Component {
  state = {
    drawMode: 0,
    data: data,
    colorType: 'typeA',
    strokeWidth: 1,
    showMarks: true,
    value: false,
    hideComponent: false
  };

  render() {
    
    return (
        <div style = {{marginLeft:"300px"}}>
     <XYPlot
            xType="ordinal"
            width={1000}
            height={500}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Period of time(year and quarter)" />
            <YAxis title="Number of pull requests (thousands)" />
                <LineSeries
                   data={data}
                    style={{stroke: 'violet', strokeWidth: 3}}/>
        </XYPlot>
        </div>
    );
  }
}