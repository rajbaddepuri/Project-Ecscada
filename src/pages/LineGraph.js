import React, { Component } from "react";
import {Link} from 'react-router-dom';
import CanvasJSReact from './Canvasjs/canvasjs.react';
import './Canvasjs/canvasjs.min';
import axios from 'axios';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
var dataPoints =[];
var chart =[];


export default class LineGraph extends Component {

    constructor(props) {  

        super(props);  

        this.state = { 
            Data: [],
            name: [],
            chart: [],
           
        };
    }
 	
	componentDidMount(){

		var chart = this.chart;
	/* 	fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
		.then(function(response) {
            return response.json();
            
        }) */
        setInterval(async () => {
            axios.get(`http://localhost/ScadaClient/api/GroupwithTrendsTimestamp?GroupName=DAS_GRP3`)  
        
            .then(res => {  
        
                    console.log(res);
                    this.setState({chart: res.data});
        
                    const chart = res.data;
                    console.log(chart);  
                    
                     let fvalue = []; 
            
                    let timeStampTime = [];
        
                    chart.forEach(record => {  
        
                        fvalue.push(record.fvalue);
        
                        timeStampTime.push(record.timeStampTime);  
        
                    }); 

                    this.setState({

                    Data:{
                           theme: "light2",
                        type: "line",
                        animationEnabled: true,
                              zoomEnabled: true,
                              title: {
                                  text: "Current Trends"
                              },
                              axisY: {
                                  title: "F Value",
                                  data: fvalue
                                   /* prefix: "$"  */
                               },
                               axisX: {
                                  type: "line", 
                                  /* xValueFormatString: "MMM YYYY", */
                                   /* yValueFormatString: "$#,##0.00",  */
                                  data: timeStampTime
                              }
                            }
                          } )
                            
})
/* .then(function(chart) {
    for (var i = 0; i < chart.length; i++) {
        dataPoints.push({
            x: new Date(chart[i].x),
            y: chart[i].y
        });
    }
    chart.render();
});  */
    })
}


   
  render() {
  
    return (
      <body className="font-montserrat">
      <div>
        <div id="main_content">  

<div className="page">
<div class="section-body">
            <div class="container-fluid">
                <div class="row clearfix">
                    <div class="col-lg-12">
                        <div class="d-lg-flex justify-content-between">
                            <ul class="nav nav-tabs page-header-tab">
                                <li class="nav-item"><Link to="/AreaTrends" class="nav-link active show" data-toggle="tab" href="#Area_Charts">Trends</Link></li>

                                <li class="nav-item"><Link to="/HistoricTrends" class="nav-link" data-toggle="tab" href="#Email_Settings">Historic Trends</Link></li>
                                
                                <li class="nav-item"><Link to="/TabularTrends" class="nav-link" data-toggle="tab" href="#Change_Password">Tabular Trends </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
      <div className="section-body">
            
      <div className="row clearfix">
          <div className="col-xl-12 col-lg-12">
              <div className="card">
                  <div className="card-header">
                      <h3 className="card-title"> View Trends</h3>
                      <div className="card-options">
                          
      <div >
      
      <div class="dropdown"  style={{marginRight:"34px"}}>
                          <button className="custom-select" id="dropbtn">Group 1</button>
                          <div class="dropdown-content">
                              <Link to =''>Group 2</Link>
                              <Link to="">Group 3</Link>
                              <Link to="">Group 4</Link>
                             
                             
                          </div>
                      </div>
                      <div class="dropdown"  style={{marginRight:"34px"}}>
                          <button className="custom-select" id="dropbtn">Trends in Line</button>
                          <div class="dropdown-content">
                              <Link to ='/AreaTrends'>Trends in Area</Link>
                              {/* <Link to="/LineTrends">Trends in Line</Link> */}
                              <Link to="/BarTrends">Trends in Bar</Link>
                             
                             
                          </div>
                      </div>


                          <button className="btn btn-sm btn-outline-secondary mr-1" id="one_month">1M</button>
                          <button className="btn btn-sm btn-outline-secondary mr-1" id="six_months">6M</button>
                          <button className="btn btn-sm btn-outline-secondary mr-1" id="one_year" class="active">1Y</button>
                          <button className="btn btn-sm btn-outline-secondary mr-1" id="ytd">YTD</button>
                          <button className="btn btn-sm btn-outline-secondary" id="all">ALL</button>
                      </div>
                  </div>
                 
              </div>                
          </div>
    </div>  
    </div>
     
     
    <div className="section-body">
            
            <div className="tab-content">
                <div className="tab-pane fade show active" id="list" role="tabpanel">
                    <div className="row clearfix">
                        <div className="col-lg-12">
    
     
                        <div>
			<CanvasJSChart data = {this.state.Data} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
     
     <div> 
        <div>
  
        </div>
      </div></div></div></div></div></div>
      <div className="col-lg-12">
                                <div className="table-responsive" id="users">
                                    <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
                                        <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                                        <thead>
                                            <tr style={{backgroundColor:"rgba(0,0,0,.03)"}}>
                                                <th>Tag Names</th>
                                                <th>Current Trend Title</th>
                                                <th>Point Name</th>
                                                <th>Upper Value</th>
                                   
                                            </tr>
                                        </thead>
                                       <tbody>
                                            
										      <tr className="">
                                                <td className="hidden-xs">
												<div>Tag 0</div>
                                                   {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40">
                                                    {/* <!--<div class="avatar d-block">--> */}
													<div>Trend Title 0</div>
                                                       {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                    
                                                </td>
                                                <td>
												<div>PT_0</div>
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												   <div>11.0</div>
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <td className="hidden-xs">
												<div>Tag 1</div>
{/*                                                     <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> -->
 */}                                                </td>
                                                <td className="text-center width40">
                                                    {/* <!--<div class="avatar d-block">--> */}
													<div>Trend Title 1</div>
                                                       {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                   
                                                </td>
                                                <td>
												<div>PT_1</div>
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												   <div>57.0</div>
                                                </td>
                                            </tr>
											<tr className="">
                                                <td className="hidden-xs">
												<div>Tag 2</div>
                                                    {/* <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40">
{/*                                                     <!--<div class="avatar d-block">-->
 */}													<div>Trend Title 1</div>
{/*                                                        <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> -->
 */}                                                    
                                                </td>
                                                <td>
												<div>PT_2</div>
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												   <div>27.0</div>
                                                </td>
                                            </tr>
											<tr className="">
                                                <td className="hidden-xs">
												<div>Tag 3</div>
{/*                                                     <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i></a> -->
 */}                                                </td>
                                                <td className="text-center width40">
{/*                                                     <!--<div class="avatar d-block">-->
 */}													<div>Trend Title 3</div>
{/*                                                        <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> -->
 */}                                                  
                                                </td>
                                                <td>
												<div>PT_3</div>
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												   <div>76.0</div>
                                                </td>
                                            </tr>
											<tr className="">
                                                <td className="hidden-xs">
												<div>Tag 4</div>
{/*                                                     <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> -->
 */}                                                </td>
                                                <td className="text-center width40">
{/*                                                     <!--<div class="avatar d-block">-->
 */}													<div>Trend Title 4</div>
{/*                                                        <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> -->
 */}                                                    
                                                </td>
                                                <td>
												<div>PT_4</div>
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                 {/*   <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												   <div>27.0</div>
                                                </td>
                                            </tr>
											<tr className="">
                                                <td className="hidden-xs">
												<div>Tag 5</div>
{/*                                                     <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> -->
 */}                                                </td>
                                                <td className="text-center width40">
{/*                                                     <!--<div class="avatar d-block">-->
 */}													<div>Trend Title 5</div>
{/*                                                        <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> -->
 */}                                                   
                                                </td>
                                                <td>
												<div>PT_5</div>
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												   <div>47.0</div>
                                                </td>
                                            </tr>
											<tr className="">
                                                <td className="hidden-xs">
												<div>Tag 6</div>
{/*                                                     <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> -->
 */}                                                </td>
                                                <td className="text-center width40">
{/*                                                     <!--<div class="avatar d-block">-->
 */}													<div>Trend Title 6</div>
{/*                                                        <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> -->
 */}                                                   
                                                </td>
                                                <td>
												<div>PT_6</div>
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												   <div>57.0</div>
                                                </td>
                                            </tr>
                                            </tbody>
                                    </table>
                                    </table>
                                </div>
                            </div>
      
      </div></div></div></div></body>
    );
  }
}


 
