import React,{Component} from 'react';
import {Link} from 'react-router-dom';


class EmployeeDashboard extends React.Component{
    render(){
        return(
         
            <body className="font-montserrat"> 
           <div>
            {/* <div className ="page-loader-wrapper">
                <div className="loader">
                </div>
            </div> */}
            
            <div id="main_content">
              
               
            
                <div className="page">
                 
                  <div className="section-body mt-3">
                        <div className="container-fluid">
                            <div className="row clearfix">
                                <div className="col-lg-12">
                                    <div className="mb-4">
                                        <h4>Welcome to Employee Dashboard</h4>
                                       
                                    </div>                        
                                </div>
                            </div>
                            <div className="row clearfix row-deck">
                               <div className="col-xl-4 col-lg-5 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Process Models</h3>
                                        </div>
                                        <div className="card-body">
                                            <h5 >Total Models - 200</h5>
                                            <span className="font-12"><Link to='/ViewModels'>View Models </Link></span><br/>
                                            <span className="font-12"><Link to='/HistoricModels'>Historic Models</Link></span><br/><br/>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-5 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Alarms</h3>
                                        </div>
                                        <div className="card-body">
                                            <h5 >Total No. of Alarms - 40</h5>
                                            <span className="font-12"><Link to='/ViewAlarms'>View Alarms </Link></span><br/><hr/>
                                            <span className="h7"><i className="fa fa-arrow-circle-left"> </i>18-12-2020<i className="fa fa-arrow-circle-right"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-5 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Events</h3>
                                        </div>
                                        <div className="card-body">
                                            <h5 >Total No. of Events - 20</h5>
                                            <span className="font-12"><Link to='/ViewEvents'>View Events </Link></span><br/><hr/>
                                            <span className="h7"><i className="fa fa-arrow-circle-left"></i>18-12-2020<i className="fa fa-arrow-circle-right"></i></span>
                                        </div>
                                    </div>
                               </div>
 







                               
                        <div class="container-fluid">
                            <div class="row clearfix">
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div className="card" >
                                        <div className="card-header">
                                                    <div className="table-responsive" >
                                                    
                                                        <table className="table table-hover table-striped table-vcenter mb-0 text-nowrap">
                                                        <h2> Pending Approvals </h2>
                                                            <thead>
                                                                <tr>
                                                                    <th>Received from</th>
                                                                    <th>Description</th>
                                                                    <th>Priority</th>
                                                                    <th >Status</th>
                                                                    <th ></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><img src="../assets/images/xs/avatar1.jpg" alt="Avatar" className="w30 rounded-circle mr-2"/> <span> <a href="#">Employee-1</a></span></td>
                                                                    <td>Add newly on boarded employee for location-10 <br/>  and create web client User account for him</td>
                                                                    <td><span className="text-warning">Medium</span></td>
                                                                    <td>Pending</td>
                                                                    <td> Take Action | <br/> Details </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td><img src="../assets/images/xs/avatar2.jpg" alt="Avatar" className="w30 rounded-circle mr-2"/> <span><a href="#">Employee-2</a></span></td>
                                                                    <td>Password Reset request</td>
                                                                    <td><span className="text-danger">High</span></td>
                                                                    <td>Pending</td>
                                                                    <td> Take Action |<br/> Details </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td><img src="../assets/images/xs/avatar3.jpg" alt="Avatar" className="w30 rounded-circle mr-2"/> <span><a href="#">Employee-3</a></span></td>
                                                                    <td>Change the role of employee-2 of location-7 <br/>to Supervior as he is promoted to supervisor</td>
                                                                    <td><span className="text-danger">High</span></td>
                                                                    <td>Pending</td>
                                                                    <td> Take Action |<br/> Details </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td><img src="../assets/images/xs/avatar4.jpg" alt="Avatar" className="w30 rounded-circle mr-2"/> <span><a href="#">Employee-4</a></span></td>
                                                                    <td>Add Location</td>
                                                                   <td><span className="text-warning">Medium</span></td>
                                                                    <td>Pending</td>
                                                                    <td>Take Action | <br/> Details </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td><img src="../assets/images/xs/avatar5.jpg" alt="Avatar" className="w30 rounded-circle mr-2"/> <span><a href="#">Employee-5</a></span></td>
                                                                    <td>Add new role and give access to task creations</td>
                                                                    <td><span className="text-warning">Medium</span></td>
                                                                    <td>Pending</td>
                                                                    <td>Take Action | <br/>Details </td>
                                                                    
                                                                </tr>
                                                              
                                                                <tr>
                                                                    <td><img src="../assets/images/xs/avatar7.jpg" alt="Avatar" className="w30 rounded-circle mr-2"/> <span><a href="#">Employee-6</a></span></td>
                                                                    <td>Request for monthly tasks report for the month of November 2020</td>
                                                                  <td><span>None</span></td>
                                                                    <td>Pending</td>
                                                                    <td> Take Action | <br/> Details </td>
                                                                </tr>
                                                                </tbody>
                                                        </table>
                                                    </div>
                                                  
                                        </div>
                                </div>
                                
                                    </div>                
                                </div>
                               </div>
                               
                    
                </div>    
            </div>
            
          </div> </div>
           </div>
           </div>
       </body>
        );
    }
}
export default EmployeeDashboard;