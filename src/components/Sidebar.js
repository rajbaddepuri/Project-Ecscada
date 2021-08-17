import React,{Component} from 'react';
import {Link} from 'react-router-dom';


/* import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'; */




class Sidebar extends React.Component{
    
    constructor(props) {
    super(props);

        
    this.state = {
       data: 'Dashboard'
    }
    this.updateAdmin=this.updateAdmin.bind(this)
    this.updateState = this.updateState.bind(this);
    this.modelState = this.modelState.bind(this);
    this.UpdateAlarms = this.UpdateAlarms.bind(this);
    this.UpdateEvents = this.UpdateEvents.bind(this);
    this.UpdateReports = this.UpdateReports.bind(this);
    this.UpdateProfile = this.UpdateProfile.bind(this);
    this.UpdateSettings = this.UpdateSettings.bind(this);
    this.UpdateHelp = this.UpdateHelp.bind(this);
    this.UpdateContact = this.UpdateContact.bind(this);
 };

     updateAdmin() {
         
    this.setState({data: 'Dashboard'})
    this.updateAdmin = this.updateAdmin.bind(this);
}

 updateState() {
         
     this.setState({data: 'Process Flow Models'})
     this.updateState = this.updateState.bind(this);
 }

 modelState() {
    this.setState({data: 'Trends'});
    this.modelState = this.modelState.bind(this);
    
}

UpdateAlarms()
{
    this.setState({data: 'Alarms'});
    this.UpdateAlarms = this.UpdateAlarms.bind(this);
    
}


UpdateEvents()
{
    this.setState({data: 'Events'});
    this.UpdateEvents = this.UpdateEvents.bind(this);
    
}


UpdateReports()
{
    this.setState({data: 'Reports'});
    this.UpdateReports = this.UpdateReports.bind(this);
    
}

UpdateSettings()
{
    this.setState({data: 'Settings'});
    this.UpdateSettings = this.UpdateSettings.bind(this);
    
}

UpdateProfile()
{
    this.setState({data: 'My Profile'});
    this.UpdateProfile = this.UpdateProfile.bind(this);
    
}

UpdateHelp()
{
    this.setState({data: 'Need Help?'});
    this.UpdateHelp = this.UpdateHelp.bind(this);
    
}

UpdateContact()
{
    this.setState({data: 'Contact Us'});
    this.UpdateContact = this.UpdateContact.bind(this);
    
}
      /*  shoot(a) {
         alert(a);
        };
   
    handleClick = () => {
        console.log("Button clicked...")
    } */

        
    render(){

        return(
            <body className="font-montserrat" >
           <div>
          
            <div id="header_top" className="header_top">
            <div className=".sidebar-opposite-hide">
        <div className="container" >
      
            <div className="hleft">
              
                <div className="dropdown"><br/><br/>  
                <div className="icon menu_toggle mr-3" >
                    <Link  onClick = {this.updateAdmin} to='/AdminDashboard' class="nav-link icon xs-hide"><i className="fa fa-tachometer"  data-toggle="tooltip" data-placement="right" title="Dashboard" ></i></Link >              
                    <Link  onClick = {this.updateState} to='/ProcessFlowmodel' class="nav-link icon app_inbox xs-hide"><i className="fa fa-sitemap"  data-toggle="tooltip" data-placement="right" title="Process Flow Models"></i></Link >
                    <Link  onClick = {this.modelState} to='/AreaTrends' class="nav-link icon xs-hide"><i className="fa fa-bar-chart"  data-toggle="tooltip" data-placement="right" title="Trends"></i></Link >
                    <Link  onClick = {this.UpdateAlarms} to='/VIewAlarms'  class="nav-link icon xs-hide"><i className="fa fa-bullhorn"  data-toggle="tooltip" data-placement="right" title="Alarms"></i></Link >
                    <Link  onClick = {this.UpdateEvents} to='/ViewEvents' class="nav-link icon app_file xs-hide"><i className="fa fa-clock-o"  data-toggle="tooltip" data-placement="right" title="Events"></i></Link >
                    <Link  onClick = {this.UpdateReports} to='/Reports' class="nav-link icon theme_btn xs-hide"><i className="fa fa-file" data-toggle="tooltip" data-placement="right" title="Reports"></i></Link >
                    <Link  onClick = {this.UpdateSettings} to='/Settings' class="nav-link icon app_file xs-hide"><i  className="fa fa-gear"  data-toggle="tooltip" data-placement="right" title="Settings"></i></Link >
                    <Link  onClick = {this.UpdateProfile} to='/Profile' class="nav-link icon app_file xs-hide"><i className="fe fe-user"  data-toggle="tooltip" data-placement="right" title="My Profile"></i></Link >
                    <Link  onClick = {this.UpdateHelp} to='/NeedHelp'  class="nav-link icon app_file xs-hide"><i className="fa fa-support"  data-toggle="tooltip" data-placement="right" title="Need Help?"></i></Link >
                    <Link   onClick = {this.UpdateContact} to='/ContactUs'  class="nav-link icon app_file xs-hide"><i className="fa fa-tag"  data-toggle="tooltip" data-placement="right" title="Contact Us"></i></Link>
                   
                </div>
                </div></div>
            </div></div>            
 
            <div id="left-sidebar" className="sidebar-nav " >
            <nav id="left-sidebar-nav" className="sidebar-nav" style={{marginTop:"40px"}} >
          
            <img src="assets/images/ecillogo.JPG" style={{width:"160px",height:"190px",marginLeft:"10px"}} alt=""/>
            <hr/>
             <h5 class="brand-name" style={{marginTop:"20px"}}><a href="javascript:void(0)" class="menu_option float-right"><i  onclick="gridView()" class="icon-grid font-16" data-toggle="tooltip" data-placement="left" title="Grid & List Toggle"></i></a></h5>
                                                               
                      <Link onClick = {this.updateAdmin}  to="/AdminDashboard"><i className="fa fa-tachometer"></i><span >Dashboard</span></Link>
                     {/* <li><Link onClick = {this.updateState} to="/ProcessFlowmodel" ><i className="fa fa-sitemap"></i><span>Process Flow Models</span></Link></li> */}
                        
                        <hr/>
                            <Link onClick = {this.modelState} to="/AreaTrends" ><i className="fa fa-bar-chart"></i><span>Trends</span></Link>
                            {/* <ul>
                                <li><Link to="/View" > <i className="fa fa-area-chart"></i><span>View</span></Link></li>
                                <li><Link to="/HistoricTrends"><i className="fa fa-history"></i><span>Historic trends</span></Link></li>
                              
                            </ul> */}
                        	<hr/>
                        
                        <Link to="/ViewAlarms"  onClick = {this.UpdateAlarms}><i className="fa fa-clock-o"></i><span>Alarms</span></Link>
                                           {/* <ul>
                                <li><Link to="/View" > <i className="fa fa-street-view"></i><span>View</span></Link></li>
                                <li><Link to="/HistoricTrends" ><i className="fa fa-history"></i><span>Historic trends</span></Link></li>
                              
                            </ul> */}
                     <hr/>
                        
                            <Link to="/ViewEvents"  onClick = {this.UpdateEvents}><i className="fa fa-clock-o"></i><span>Events</span></Link>
                              
                        <hr/>
                        <Link to="/Reports"  onClick = {this.UpdateReports}><i className="fa fa-file"></i><span>Reports</span></Link>
                        <hr/>
                       <Link to="/Settings"  onClick = {this.UpdateSettings}><i className="fa fa-gear"></i><span>Settings</span></Link>
                       <hr/>
                        <Link to="/Profile"  onClick = {this.UpdateProfile}><i className="fa fa-user"></i><span>My Profile</span></Link>
                        <hr/>
                        <Link to="" className="g_heading">Support</Link>
                        <br/>
                        <br/>
                        <Link to="/NeedHelp"  onClick = {this.UpdateHelp}><i className="fa fa-support"></i><span>Need Help?</span></Link>
                        <br/>
                        <br/>
                        <Link to="/ContactUs"  onClick = {this.UpdateContact}><i className="fa fa-tag"></i><span>ContactUs</span></Link>
                    
              
                    
                </nav>        
            </div>
            </div></div>

                    
    <div className="page">
    <div id="page_top" className="section-body top_dark">
        <div className="container-fluid">
            <div className="page-header">
                <div className="left">
                    <Link className="icon menu_toggle mr-3"><i className="fa  fa-align-left"></i>
                    </Link>
                    {this.state.data} 
                    <h1 className="page-title"></h1>                        
                </div>
                

                <div className="right">
                    <div className="input-icon xs-hide mr-4">
                        <input type="text" className="form-control" placeholder="Search for..."/>
                        <span className="input-icon-addon"><i className="fe fe-search"></i></span>
                    </div>
                    <div className="notification d-flex">
                        <div className="dropdown d-flex">
                            <div className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2" data-toggle="dropdown"><i className="fa fa-language"></i></div>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <div className="dropdown-item" ><img className="w20 mr-2" src="assets/images/flags/us.svg" alt=""/>English</div>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item" ><img className="w20 mr-2" src="assets/images/flags/es.svg"alt=""/>Spanish</div>
                                <div className="dropdown-item"><img className="w20 mr-2" src="assets/images/flags/jp.svg" alt=""/>Japanese</div>
                                <div className="dropdown-item"><img className="w20 mr-2" src="assets/images/flags/bl.svg" alt=""/>French</div>
                            </div>
                        </div>
                        <div className="dropdown d-flex">
                            <div className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2" data-toggle="dropdown"><i className="fa fa-envelope"></i><span className="badge badge-success nav-unread"></span></div>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <ul className="right_chat list-unstyled w350 p-0">
                                    <li className="online">
                                        <Link to="javascript:void(0);" className="media">
                                            <img className="media-object" src="assets/images/xs/avatar4.jpg" alt=""/>
                                            <div className="media-body">
                                                <span className="name">Donald Gardner</span>
                                                <div className="message">It is a long established fact that a reader</div>
                                                <small>11 mins ago</small>
                                                <span className="badge badge-outline status"></span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="online">
                                        <Link to="javascript:void(0);" className="media">
                                            <img className="media-object " src="assets/images/xs/avatar5.jpg" alt=""/>
                                            <div className="media-body">
                                                <span className="name">Wendy Keen</span>
                                                <div className="message">There are many variations of passages of Lorem Ipsum</div>
                                                <small>18 mins ago</small>
                                                <span className="badge badge-outline status"></span>
                                            </div>
                                        </Link>                            
                                    </li>
                                    <li className="offline">
                                        <Link to="javascript:void(0);" className="media">
                                            <img className="media-object " src="assets/images/xs/avatar2.jpg" alt=""/>
                                            <div className="media-body">
                                                <span className="name">Matt Rosales</span>
                                                <div className="message">Contrary to popular belief, Lorem Ipsum is not simply</div>
                                                <small>27 mins ago</small>
                                                <span className="badge badge-outline status"></span>
                                            </div>
                                        </Link>                            
                                    </li>
                                    <li className="online">
                                        <Link to="javascript:void(0);" className="media">
                                            <img className="media-object " src="assets/images/xs/avatar3.jpg" alt=""/>
                                            <div className="media-body">
                                                <span className="name">Phillip Smith</span>
                                                <div className="message">It has roots in a piece of classical Latin literature from 45 BC</div>
                                                <small>33 mins ago</small>
                                                <span className="badge badge-outline status"></span>
                                            </div>
                                        </Link>                            
                                    </li>                        
                                </ul>
                                <div className="dropdown-divider"></div>
                                <Link to="javascript:void(0)" className="dropdown-item text-center text-muted-dark readall">Mark all as read</Link>
                            </div>
                        </div>
                        <div className="dropdown d-flex">
                            <div className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2" data-toggle="dropdown"><i className="fa fa-bell"></i><span className="badge badge-primary nav-unread"></span></div>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <ul className="list-unstyled feeds_widget">
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-check"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title text-danger">Issue Fixed <small className="float-right text-muted">11:05</small></h4>
                                            <small>WE have fix all Design bug with Responsive</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-user"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title">New User <small className="float-right text-muted">10:45</small></h4>
                                            <small>I feel great! Thanks team</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-thumbs-o-up"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title">7 New Feedback <small className="float-right text-muted">Today</small></h4>
                                            <small>It will give a smart finishing to your site</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-question-circle"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title text-warning">Server Warning <small className="float-right text-muted">10:50</small></h4>
                                            <small>Your connection is not private</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-shopping-cart"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title">7 New Orders <small className="float-right text-muted">11:35</small></h4>
                                            <small>You received a new oder from Tina.</small>
                                        </div>
                                    </li>                                   
                                </ul>
                                <div className="dropdown-divider"></div>
                                <Link to="javascript:void(0)" className="dropdown-item text-center text-muted-dark readall">Mark all as read</Link>
                            </div>
                        </div>
                        <div className="dropdown d-flex">
                            <div className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2" data-toggle="dropdown"><i className="fa fa-user"></i></div>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <Link to='/Profile' className="dropdown-item" ><i className="dropdown-icon fe fe-user"></i> Profile</Link>
                                <Link to='/Settings' className="dropdown-item" ><i className="dropdown-icon fe fe-settings"></i> Settings</Link>
                                <Link to='/Inbox' className="dropdown-item" ><span className="float-right"><span className="badge badge-primary">6</span></span><i className="dropdown-icon fe fe-mail"></i> Inbox</Link>
                                <Link to='/Message' className="dropdown-item" ><i className="dropdown-icon fe fe-send"></i> Message</Link>
                                <div className="dropdown-divider"></div>
                                <Link to='/NeedHelp' className="dropdown-item" ><i className="dropdown-icon fe fe-help-circle"></i> Need help?</Link>
                                <a href='/' className="dropdown-item" ><i className="dropdown-icon fe fe-log-out"></i> Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </div>

            </body>
        );
    }
}
    export default Sidebar;