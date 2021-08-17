import React, {Component}  from 'react';

import {Link} from 'react-router-dom';
class Model1 extends React.Component{
    render(){

       return(
           <div>
           
          {/*  <div className="page-loader-wrapper">
               <div className="loader">
               </div>
           </div>
 */}
<div id="main_content">
 
  

   <div className="page">
       
       
               <div className="section-body">
           <div className="container-fluid">
               <div className="row clearfix">
                   <div className="col-xl-12 col-lg-12">
                       <div className="card">
                           <div className="card-header">
                               <h3 className="card-title">Flow Model - 1</h3>
                               <span> 
                               <Link to='/ProcessFlowmodel' id="left" className="btn btn-primary " style={{width:"120px"}} >Back</Link> </span>
                              </div>
                             
                           <div className="card-body">
                              <img src="assets/images/Scada3.gif" style={{width:"1200px"},{height:"600px"}} alt=""/>
                           </div>
                       </div>                
                   </div>
                  
               </div>
                  </div>                
                   </div>
                  
               
          
       
   </div>    
</div>
</div>
       )
    }
       
}

export default Model1;