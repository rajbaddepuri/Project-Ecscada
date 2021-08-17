import React,{Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Chart from "react-google-charts"; 
import axios from 'axios';


export default class DTms_0010 extends React.Component{

    constructor(props) {  
        super(props)  
  
        this.state = {  
            name : [],    
        }  
    }  
    
    componentDidMount() {  
        axios.get('http://localhost/ScadaClient/api/GroupName?GroupName=DAS_GRP2').then(response => {  
            console.log(response.data);  
            this.setState({  
                name: response.data  
            });  
        });  
    }  
    render(){
    return(
        <body className="font-montserrat">
{/* <!-- Page Loader --> */}
{/* <div className="page-loader-wrapper">
    <div className="loader">
    </div>
</div> */}

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
                <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">View Trends</h3>
                                <div className="card-options">

                         
                                    
								<div >
			
                        <div class="dropdown" style={{marginRight:"34px"}}>
                          <button className="custom-select" id="dropbtn">Groups</button>
                          <div class="dropdown-content">
                              <Link to ='./DTms_0010'>DTms_0010</Link>
                              <Link to ='./DTms_0011'>DTms_0011</Link>
                              <Link to ='./DTms_0012'>DTms_0012</Link>
                              <Link to ='./DTms_0013'>DTms_0013</Link>
                              <Link to ='./DTms_0014'>DTms_0014</Link>
                              <Link to ='./DTms_0015'>DTms_0015</Link>
                              <Link to ='./DTms_0017'>DTms_0017</Link>
                              <Link to ='./DTms_0018'>DTms_0018</Link>
                             
                             
                          </div>
                      </div>
                        
                            </div>
                            
                                <div class="dropdown" style={{marginRight:"34px"}}>
                                    <button className="custom-select" id="dropbtn">Trends in Area</button>
                                    <div class="dropdown-content">
                                       
                                      {/*  <Link to ='/AreaTrends'>Trends in Area</Link> */}
                                        <Link to="/LineTrends">Trends in Line</Link>
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
</div>
             {/*  <div className="section-body">
            
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="list" role="tabpanel">
                        <div className="row clearfix" */}
         
         <div className="section-body">
                <div className="container-fluid">
                <div className="col-lg-12">
        <div className="areaChart" style={{marginLeft:"-130px", marginTop:"-10px"}}>
        <Chart
   width={'1100px'}
  height={'850px'}
  chartType="AreaChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Year', 'Sales', 'Expenses'],
    ['2012', 700, 300],
    ['2013', 1200, 600],
    ['2014', 1170, 460],
    ['2015', 660, 1120],
    ['2016', 1030, 540],
    ['2017', 1500, 600],
    ['2018', 1170, 560],
    ['2019', 660, 1220],
    ['2020', 1030, 740],
  ]}
  options={{
    isStacked: true,
    height: 600,
    legend: { position: 'top', maxLines: 6 },
    vAxis: { minValue: 0 },
  }}
  rootProps={{ 'data-testid': '2' }}
/></div>
</div></div></div>

<div className="col-lg-12" style={{marginTop:"-300px"}}>
                                <div className="table-responsive" id="users">
                                    <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
                                        <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                                        <thead>
                                            <tr style={{backgroundColor:"rgba(0,0,0,.03)", textAlign:"-webkit-center"}}>
                                                <th>Tag Name</th>
                                                <th>Upper Value</th>
                                                <th>Lower Value</th>
                                                <th>Pen Color</th>
                                               {/*  <th>Tag 2</th>
                                                <th>Tag 3</th>
												<th>Tag 4</th>
												<th>Tag 5</th>
												<th>Tag 6</th>
												<th>Tag 7</th> */}
                                            </tr>
                                        </thead>
                                       <tbody>
                                            
										      <tr className="">
                                                <td className="hidden-xs">
													
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.POINTNAME}</ul>
                                                ))}
                                                   {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40">
                                                    {/* <!--<div class="avatar d-block">--> */}
													
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.UPPERVALUE}</ul>
                                                ))}    {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                    
                                                </td>
                                                <td>
													
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.LOWERVALUE}</ul>
                                                ))}
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												  	
                                                  {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.PENCOLOR}</ul>
                                                ))}
                                                </td>
                                            </tr>
                                    								
                                            </tbody>
                                    </table>
                                    </table>
                                </div>
                            </div>
                            </div>
                    
                    </div>
     {/*   </div>
                    </div></div> */}
</body>
    )
}
}
