import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Chart from "react-google-charts"; 


class Trends extends React.Component{
    render(){
    return(
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
                            
                            <li class="nav-item"><Link to="/TabularTrends" class="nav-link" data-toggle="tab" href="#Change_Password">Trends in tabular </Link></li>
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
                    </div>
                        <div class="dropdown" >
                            <button className="custom-select" id="dropbtn" >Trends in Area</button>
                            <div class="dropdown-content">
                                {/* <Link to ='/AreaTrends'>Trends in Area</Link> */}
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

             {/*  <div className="section-body">
            
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="list" role="tabpanel">
                        <div className="row clearfix" */}
              
              <div >
        <Chart
 /*  width={'1300px'}
  height={'850px'} */
  chartType="AreaChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Year', 'Sales', 'Expenses'],
    ['2013', 1000, 400],
    ['2014', 1170, 460],
    ['2015', 660, 1120],
    ['2016', 1030, 540],
    ['2017', 1000, 600],
    ['2018', 1170, 560],
    ['2019', 660, 1020],
    ['2020', 1030, 740],
  ]}
  options={{
    isStacked: true,
    height: 600,
    legend: { position: 'top', maxLines: 6 },
    vAxis: { minValue: 0 },
  }}
  rootProps={{ 'data-testid': '2' }}
/>
</div>
                    
                    </div></div></div>
     {/*   </div>
                    </div></div> */}
</body>
    )
}
}
export default Trends;