import React,{Component} from 'react';
import {Link} from 'react-router-dom';


class Events extends React.Component{
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
                                <h3 className="card-title">Events</h3>
                                <div className="card-options">
                                    
								
                                <div class="dropdown">
                                    <button  className="custom-select" id="dropbtn">View Events</button>
                                    <div class="dropdown-content">
                                        <Link to ='/ViewEvents'>ViewEvents</Link>
                                        <Link to="/HistoricEvents">HistoricEvents</Link>
                                       
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
       
                    </div>
</body>
    )
}
}
export default Events;