import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Footer extends React.Component{
    render(){
        return(
            <div className="page">
               <div className="section-body">
                        <footer className="footer">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12 col-sm-12">
                                    Copyright © 2020 ECIL, Hyderabad. Terms & Conditions.
                                    </div>
                                 </div>
                            </div>
                        </footer>
                   </div>
                   </div>
        );
    }
}
export default Footer;