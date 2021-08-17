import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TabularTrends extends React.Component{

    constructor(props){
        super(props);

            this.state = {
                name: []
                
            }
        }

        async componentDidMount() {
            try {
              setInterval(async () => {
                axios.get('http://localhost/ScadaClient/api/groups/').then(res => {
                    console.log(res);
                    this.setState({ name: res.data });
                });
              }, 50);
            } catch(e) {
              console.log(e);
            }
      }
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
                                <li class="nav-item"><Link to="/AreaTrends" class="nav-link " data-toggle="tab" href="#Area_Charts">Trends</Link></li>

                                <li class="nav-item"><Link to="/HistTrends" class="nav-link" data-toggle="tab" href="#Email_Settings">Historic Trends</Link></li>
                                
                                <li class="nav-item"><Link to="/TabularTrends" class="nav-link active show" data-toggle="tab" href="#Change_Password">Tabular Trends </Link></li>
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
                            <h3 className="card-title">Tabular Trends</h3>
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
                            <div class="dropdown"  style={{marginRight:"34px"}}>
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
        <div className="section-body">
            
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="list" role="tabpanel">
                        <div className="row clearfix">
                            <div className="col-lg-12">
                                <div className="table-responsive" id="users">
                                    <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
                                        <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                                        <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
                                            <tr>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Current Trends Title</th>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Tag Name</th>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Upper Value</th>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Lower Value</th>
                                                <th style={{textTransform:"none", color:"#E5E5E5"}}>Pen Color</th>
                                             {/*    <th>Tag 3</th>
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
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.CURTRENDTITLE}</ul>
                                                ))}
                                                   {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40">
                                                    {/* <!--<div class="avatar d-block">--> */}
                                                    {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.POINTNAME}</ul>
                                                ))}
                                                       {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                    
                                                </td>
                                                <td className="hidden-xs" >
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.UPPERVALUE}</ul>
                                                ))}
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
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
                                               {/*  <td class="hidden-xs">  */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>45.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
											{/* 	   <div>24.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>24.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>64.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												 {/*   <div>75.00</div>
                                                </td>  */}
                                            </tr>
                                            <tr className="">
                                            <td className="hidden-xs">
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.CURTRENDTITLE}</ul>
                                                ))}
                                                   {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40">
                                                    {/* <!--<div class="avatar d-block">--> */}
                                                    {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.POINTNAME}</ul>
                                                ))}
                                                       {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                    
                                                </td>
                                                <td className="hidden-xs" >
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.UPPERVALUE}</ul>
                                                ))}
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
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
                                               {/*  <td class="hidden-xs">  */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>45.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
											{/* 	   <div>24.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>24.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>64.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												 {/*   <div>75.00</div>
                                                </td>  */}
                                            </tr>
                                            
                                             <tr className="">
                                             <td className="hidden-xs">
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.CURTRENDTITLE}</ul>
                                                ))}
                                                   {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40">
                                                    {/* <!--<div class="avatar d-block">--> */}
                                                    {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.POINTNAME}</ul>
                                                ))}
                                                       {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                    
                                                </td>
                                                <td className="hidden-xs" >
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.UPPERVALUE}</ul>
                                                ))}
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
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
                                               {/*  <td class="hidden-xs">  */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>45.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
											{/* 	   <div>24.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>24.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>64.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												 {/*   <div>75.00</div>
                                                </td>  */}
                                            </tr>
                                            <tr className="">
                                            <td className="hidden-xs">
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.CURTRENDTITLE}</ul>
                                                ))}
                                                   {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40">
                                                    {/* <!--<div class="avatar d-block">--> */}
                                                    {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.POINTNAME}</ul>
                                                ))}
                                                       {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                    
                                                </td>
                                                <td className="hidden-xs" >
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.UPPERVALUE}</ul>
                                                ))}
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
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
                                               {/*  <td class="hidden-xs">  */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>45.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
											{/* 	   <div>24.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>24.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>64.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												 {/*   <div>75.00</div>
                                                </td>  */}
                                            </tr>
                                            
                                            <tr className="">
                                            <td className="hidden-xs">
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.CURTRENDTITLE}</ul>
                                                ))}
                                                   {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40">
                                                    {/* <!--<div class="avatar d-block">--> */}
                                                    {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.POINTNAME}</ul>
                                                ))}
                                                       {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                    
                                                </td>
                                                <td className="hidden-xs" >
                                                {this.state.name.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.UPPERVALUE}</ul>
                                                ))}
                                              
                                                </td>
                                                <td className="hidden-xs">
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
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
                                               {/*  <td class="hidden-xs">  */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>45.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
											{/* 	   <div>24.0</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>24.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												{/*    <div>64.00</div>
                                                </td>
												<td className="hidden-xs"> */}
                                                   {/* <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												 {/*   <div>75.00</div>
                                                </td>  */}
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
       </div>
</body>
    )
}
}
export default TabularTrends;