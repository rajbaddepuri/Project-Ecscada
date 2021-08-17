import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'


export default class AlarmsEvents extends Component {

    constructor(props){
        super(props);

            this.state = {
                name: [],
            }
        }

        componentDidMount() {
            axios.get(' http://localhost/ScadaClient/api/ViewEventsAlarms').then(res => {
                console.log(res);
                this.setState({ name: res.data });
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
         
                <div className="section-body">
            
                <div className="row clearfix">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                            <ul class="nav nav-tabs page-header-tab">
                            <li class="nav-item"><Link to="/ViewEvents" class="nav-link active show" data-toggle="tab" href="#Area_Charts">View Events</Link></li>

                            <li class="nav-item" class="nav-link active show"  href="#Area_Charts"> <a href='/assets/samples/Hevent.html'style={{height:"30px"},{width:"150px"}} > Historic Events</a></li>

                            
                            <li class="nav-item"><Link to="/AlarmsEvents" class="nav-link active show" data-toggle="tab" href="#Area_Charts">View Alarms Events</Link></li>
                        
                        </ul>
                                {/* <h3 className="card-title">Events</h3> */}
                                <div className="card-options">
                                
                                {/* <div class="dropdown"  style={{marginRight:"34px"}}>
                                    <button  className="custom-select" id="dropbtn">View Events</button>
                                    <div class="dropdown-content">
                                       {/*  <Link to ='/ViewAlarms'>View Alarms</Link> */}
                                    {/*     <Link to="/HistoricAlarms">Historic Events</Link>  */}
                                       
                                   {/*  </div>
                                </div> */}
					
			
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
                                <div className="table-responsive"  id="users">
                                    <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
                                        <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                                        <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
                                            <tr>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Date</th>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Time</th>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Device Name</th>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Tag Name</th>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Description</th>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Alm Value</th>
                                            </tr>
                                        </thead>
                                       <tbody>
                                            
										        <tr className="">
                                                <td className="hidden-xs" style={{color:"green"}}>
												
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.DESCRIPTION.substring(9,21)}</ul>
                                                ))}
                                               
                                                
                                                   {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40" style={{color:"green"}}>
                                                    {/* <!--<div class="avatar d-block">--> */}
												
                                                    {this.state.name.map(name => (
                                                    <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.DESCRIPTION.substring(0,9)}</ul>
                                                    ))}
                                                   
                                                       {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                    
                                                </td>
                                                <td class="hidden-xs" style={{color:"green"}}>                                               
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.DEVICENAME}</ul>
                                                ))}
                                                </td> 
                                              
                                                
                                                <td className="hidden-xs" style={{color:"green"}}>
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
                                                
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.POINTNAME}</ul>
                                                ))}
           
                                                </td>
                                                
												<td className="hidden-xs" style={{color:"green"}}>
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
                                                  
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.DESCRIPTION.substring(33,77)}</ul>
                                                ))}
           
                                                </td>
                                                <td class="hidden-xs" style={{color:"green"}}>
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												                          {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.VALUE}</ul>                                                                           
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
                    </div>
                    </div>
          </div>
          </div> 
          
</body>
    )
    }
    }