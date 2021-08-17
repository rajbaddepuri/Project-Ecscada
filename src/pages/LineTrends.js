import CanvasJSReact from './Canvasjs/canvasjs.stock.react';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import LineGraph from 'react-line-graph';
import { Line ,Chart,chart } from "react-chartjs-2";

import axios from 'axios'; 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

export default class LineTrends extends Component {

  constructor(props) {  

    super(props);
    this.state = {
      chart : [],
      Data : []
    }

  }
  async componentDidMount() {
  setInterval(async () => {
    axios.get(`http://localhost/ScadaClient/api/GroupwithTrendsTimestamp?GroupName=DAS_GRP3`)  

    .then(res => {  

            console.log(res);
            this.setState({chart: res.data});

            const chart = res.data;
            console.log(chart);
    });
  });

  let Data = [];

  let fvalue = []; 
            
  let timeStampTime = [];

  chart.forEach(record => {  

      //fvalue.push(record.fvalue);

      //timeStampTime.push(record.timeStampTime);  

  }); 
}
  render() {
    this.setState({  

        Data: { 
        
           //label: timeStampTime, 
        /*    data: timeStampTime,  */

          /* data: this.state.currentDateTime, */
       /*   xAxes:[ { 

              data: this.state.currentDateTime,
              type: "DateAxis",
              baseInterval: {
                timeUnit: "seconds",
                count: 5
              }
         }], */
         
          
               /*  labels: this.state.currentDateTime,
                timeUnit: "seconds",
                count: 5, */ 
                                 
                datasets: [  

                        {  
                                text: 'F Value',

                                type: 'line',
                               
                                label: 'F Value', 

                                //data: fvalue,

                                fill: true,

                                /* backgroundColor: "rgba(75,192,192,0.2)",
                                borderColor: "rgba(75,192,192,1)" */
                                 backgroundColor: "rgba(75,192,192,0.2)",
                                borderWidth: 5,
                                borderColor: "rgba(75,192,192,1)",
                                pointBorderColor: "rgba(75,192,192,1)",
                                pointBackgroundColor: "rgba(75,192,192,0.2)",
                                pointBorderWidth: 5,
                                pointHoverRadius: 10,
                                pointHoverBackgroundColor: "rgba(75,192,192,0.2)",
                                pointHoverBorderColor: "rgba(75,192,192,1)",
                                pointHoverBorderWidth: 15, 

                               /*  backgroundColor: [  

                                        "#3cb371",  

                                        "#0000FF",  

                                        "#9966FF",  

                                        "#4C4CFF",  

                                        "#00FFFF",  

                                        "#f990a7",  

                                        "#aad2ed",  

                                        "#FF00FF",   

                                        "Blue",    

                                        "#ff6600"  

                                ], 
*/

                        } ,
                      /*   {
                          label: "Group 2",
                          data: [1073, 1101, 1150, 2125, 1111, 1100],
                          fill: false,
                          borderColor: "#742774"
                        }  */

                ] 
                 

        }  
   

} );
    
    const containerProps = {
      width: "80%",
      height: "450px",
      margin: "auto"
    };
    return (
      <div>
        <CanvasJSStockChart
          data={this.state.Data}
          containerProps = {containerProps}
          onRef={ref => this.stockChart = ref}
        />
      </div>
    );
  }
}