import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css"; 
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import moment from "moment"
import axios from 'axios'
import { Input } from "semantic-ui-react";
/* import { DateRangePicker } from 'react-dates'; */

import DatetimeRangePicker from 'react-datetime-range-picker';


export class HistoricAlarms extends Component{
    constructor(props) {  
        super(props)  
  
        this.state = {  
            historicAlarms: [],  
            startDate: null,  
            EndDate:null ,
            selectedFile: null,
            searchInput: "", 
        }  
    }  
    

    handleChange = date => {


        this.setState({
            startDate: date
        });
    }
    handleChange1 = date => {


        this.setState({
            EndDate: date
        });
    }

    submitHandler = e => {  
        e.preventDefault();    
        const Startdate = moment(this.state.startDate).format('DD/MM/YYYY');
        const EndDate = moment(this.state.EndDate).format('DD/MM/YYYY');
         
        const data = { Startdate,EndDate };    
        console.log(data)
         
        axios.get('http://localhost/ScadaClient/api/HistoricAlarms?StartDate='+Startdate+'&EndDate='+EndDate+'&TagName=&Flag=2').then(response => {  
            console.log(response.data);  
            this.setState({  
                historicAlarms: response.data  
            });  
            this.setState({  
                selectedFile: response.data  
            }); 

        });  
}     
handleChange2 = e =>{ 
    console.log(e.target.value)
    this.setState({ searchInput: e.target.value }, () => {
      console.log("................")
      this.globalSearch();
    });
  };

globalSearch = () => {
    let { searchInput } = this.state;
    //console.log( this.state.selectedFile)
    
    let filteredData = this.state.selectedFile.filter(value => {
        console.log(value.VALUE)
      return (
        value.POINTNAME.toLowerCase().includes(searchInput.toLowerCase())||
        value.DESCRIPTION.substring(9, 200).toLowerCase().includes(searchInput.toLowerCase()) ||
        value.DESCRIPTION.substring(33, 77).toLowerCase().includes(searchInput.toLowerCase())||
        value.DESCRIPTION.substring(0, 8).toLowerCase().includes(searchInput.toLowerCase())||
        value.DEVICENAME.toLowerCase().includes(searchInput.toLowerCase())
    
        
       
      );
    });
    console.log(filteredData)
    
        this.setState({ historicAlarms: filteredData });

    
  };
 
    render(){
    return(
        <body >

<div >

    <div className="page">
    
                <div>
            
                        <ul class="nav nav-tabs page-header-tab">
                            <li class="nav-item"><Link to="/ViewAlarms" class="nav-link inactive show" data-toggle="tab" href="#Area_Charts">View Alarms</Link></li>

                            <li class="nav-item"><Link to="/HistoricAlarms" class="nav-link active show" data-toggle="tab" href="#Email_Settings">Historic Alarms</Link></li>
                        
                        </ul>
                                {/* <h3 className="card-title">Alarms</h3> */}
                                {/* <div className="card-options">
                                    <button className="btn btn-sm btn-outline-secondary mr-1" id="one_month">1M</button>
                                    <button className="btn btn-sm btn-outline-secondary mr-1" id="six_months">6M</button>
                                    <button className="btn btn-sm btn-outline-secondary mr-1" id="one_year" class="active">1Y</button>
                                    <button className="btn btn-sm btn-outline-secondary mr-1" id="ytd">YTD</button>
                                    <button className="btn btn-sm btn-outline-secondary" id="all">ALL</button>
                                </div> */}
                         </div>
                         

              
            <div >
        
        <div className="row clearfix">
            <div className="col-xl-12 col-lg-12">
            <div className="row">  
            </div>  
            <form onSubmit={this.submitHandler} >
            <div class="row">
                                                    <div className="col-md-3 col-sm-12" >  
                                                Start Date:    <DatePicker
                                            wrapperClassName="datepicker"
                                            className="form-control"
                                            autoComplete="off"
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            name="startDate"
                                            dateFormat="MM/dd/yyyy"
                                        />  
                                                    </div>  
                                                    <div className="col-md-3 col-sm-12" >  
                                                End Date:   <DatePicker
                                            wrapperClassName="datepicker"
                                            className="form-control"
                                            autoComplete="off"
                                            selected={this.state.EndDate}
                                            onChange={this.handleChange1}
                                            name="EndDate"
                                            dateFormat="MM/dd/yyyy"
                                        />  
                                                    </div>
                                                    <button className="btn btn-primary" type="submit" style={{ background: "blue" }}>Search</button>

                     </div>    
                    

                                                        </form>
                                                     </div>
            </div>
            </div>
            
<br/>
<div class="row">
        <div className="col-md-3 col-sm-12" style={{}}>  
        <input type="text" className="form-control" placeholder="Search for..."  name="searchInput"
          value={this.state.searchInput || ""}
          onChange={this.handleChange2}/>
                        <span className="input-icon-addon"><i className="fe fe-search"></i></span>
        
       </div>
       
       

       
       
        </div>
        <br />
        


           
            
            <div className="tab-content">
                <div className="tab-pane fade show active" id="list" role="tabpanel">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="table-responsive" id="users" style={{marginTop:"-20px"}}>
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
                                        
                                            <tr style={{backgroundColor:"#252d42"}}>
                                            <td className="hidden-xs" style={{ color: "white" }}>
                                            
                                             {this.state.historicAlarms.map(historicAlarms => (
                                            <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={historicAlarms}>{historicAlarms.DESCRIPTION.substring(9,20)}</ul>
                                            ))}
                                           
                                            
                                               {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                            </td>
                                            <td className="text-center width40" style={{ color: "white" }}>
                                                {/* <!--<div class="avatar d-block">--> */}
                                            
                                                {this.state.historicAlarms.map(historicAlarms => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={historicAlarms}>{historicAlarms.DESCRIPTION.substring(0,8)}</ul>
                                                ))}
                                               
                                                   {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                
                                            </td>
                                            <td style={{ color: "white" }}>                                               
                                            {this.state.historicAlarms.map(historicAlarms => (
                                            <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={historicAlarms}>{historicAlarms.DEVICENAME}</ul>
                                            ))}
                                            </td> 
                                          
                                            
                                            <td className="hidden-xs" style={{ color: "white" }}>
                                              {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
                                            
                                            {this.state.historicAlarms.map(historicAlarms => (
                                            <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={historicAlarms}>{historicAlarms.POINTNAME}</ul>
                                            ))}
       
                                            </td>
                                            
                                                                    <td className="hidden-xs" style={{ color: "white" }}>
                                              {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
                                              
                                            {this.state.historicAlarms.map(historicAlarms => (
                                            <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={historicAlarms}>{historicAlarms.DESCRIPTION.substring(33,77)}</ul>
                                            ))}
       
                                            </td>
                                            <td class="hidden-xs" style={{ color: "white" }}>
                                              {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
                                              {this.state.historicAlarms.map(historicAlarms => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={historicAlarms}>{historicAlarms.VALUE}</ul> 
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
                    
</body>

    )
}
}
export default HistoricAlarms;