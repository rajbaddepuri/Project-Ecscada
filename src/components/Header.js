import React,{Component} from 'react';
import {Link} from 'react-router-dom';


class Header extends React.Component{
    render(){
        return(
   
            
    <div className="page">
    <div id="page_top" className="section-body top_dark">
        <div className="container-fluid">
            <div className="page-header">
                <div className="left">
                    <Link className="icon menu_toggle mr-3"><i className="fa  fa-align-left"></i></Link>
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
            
        );
    }   
            
    
}
export default Header;