import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewAlarms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faWindowClose } from '@fortawesome/fontawesome-free-solid'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import { FormControl } from 'react-bootstrap'
import moment from "moment"
import { Input } from "semantic-ui-react";
/* import { DateRangePicker } from 'react-dates'; */

import DatetimeRangePicker from 'react-datetime-range-picker';


export default class ViewAlarms extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            startDate: null,
            EndDate: null,
            selectedFile: null,
            searchInput: "",
        }
    }

    async componentDidMount() {
        try {
            setInterval(async () => {
                axios.get('http://localhost/ScadaClient/api/alarms').then(res => {
                    //console.log(res.data);
                    this.setState({ name: res.data });
                    this.setState({ selectedFile: res.data });

                });
            }, 10000);
            
            //set interval time is in milie seconds 10000 = 10 s
        } catch (e) {
            // console.log(e);
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

    /// this is for data sorting With date
    submitHandler = e => {
        e.preventDefault()
        const Startdate = moment(this.state.startDate).format('MM/DD/YYYY');
        const EndDate = moment(this.state.EndDate).format('MM/DD/YYYY');
        console.log(Startdate)
        console.log(EndDate)
    }


    checkValue(param) {
        let value = param;
        //console.log(value);
        if (value == 0.00) {
            return "Fault";
        }
        else if (value == 1.00) {
            return "Warning";
        }
        else {
            return "Caution";
        }
    }

    checkAckStatus(param) {

        let Ack = param;
        //console.log(Ack);
        if (Ack == 0) {
            return <FontAwesomeIcon icon={faWindowClose} />
        }
        else if (Ack == 1) {
            return <FontAwesomeIcon icon={faCheckCircle} />
        }
        else {
            return "z";
        }
    }
    // for filtering
    globalSearch = () => {
        let { searchInput } = this.state;
        //console.log( this.state.selectedFile)
        
        let filteredData = this.state.selectedFile.filter(value => {
            console.log(value.VALUE)
          return (
            value.POINTNAME.toLowerCase().includes(searchInput.toLowerCase())||
            value.DESCRIPTION.substring(33, 100).toLowerCase().includes(searchInput.toLowerCase()) ||
            value.DESCRIPTION.substring(9, 21).toLowerCase().includes(searchInput.toLowerCase())||
            value.DESCRIPTION.substring(0, 9).toLowerCase().includes(searchInput.toLowerCase())||
            value.DEVICENAME.toLowerCase().includes(searchInput.toLowerCase())
        
            
           
          );
        });
        console.log(filteredData)
        
            this.setState({ name: filteredData });
    
        
      };
      handleChange2 = e =>{ 
        console.log(e.target.value)
        this.setState({ searchInput: e.target.value }, () => {
          console.log("................")
          this.globalSearch();
        });
      };


    render() {


        return (
            <body className="font-montserrat">


                

                    <div className="page">

                           
                                            <ul class="nav nav-tabs page-header-tab">
                                                <li class="nav-item"><Link to="/ViewAlarms" class="nav-link active show" data-toggle="tab">View Alarms</Link></li>

                                                <li class="nav-item"> <Link to="/HistoricAlarms" class="nav-link inactive show" data-toggle="tab"> Historic Alarms</Link></li>

                                            </ul>

                                            {/* <div className="card-options">

                                                <button className="btn btn-sm btn-outline-secondary mr-1" id="one_month">1M</button>
                                                <button className="btn btn-sm btn-outline-secondary mr-1" id="six_months">6M</button>
                                                <button className="btn btn-sm btn-outline-secondary mr-1" id="one_year" class="active">1Y</button>
                                                <button className="btn btn-sm btn-outline-secondary mr-1" id="ytd">YTD</button>
                                                <button className="btn btn-sm btn-outline-secondary" id="all">ALL</button>
                                            </div> */}
                                        


                      
                        
        <div class="row">
        <div className="col-md-3 col-sm-12" >  
      
        <input type="text" className="form-control" placeholder="Search for..."  name="searchInput"
          value={this.state.searchInput || ""}
          onChange={this.handleChange2}/>
                        <span className="input-icon-addon"><i className="fe fe-search"></i></span>
        
       </div>
       
       
       
        </div>
        
        

                        {/* <form onSubmit={this.submitHandler} >

                           
                              <div class="row">
                                                    <div className="col-md-3 col-sm-12" style={{}}>  
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
                                                    <div className="col-md-3 col-sm-12" style={{}}>  
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
 */}

                        

                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="list" role="tabpanel">
                                    <div className="row clearfix">
                                        <div className="col-lg-12">
                                            <div className="table-responsive" id="users">
                                            <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
                                                <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap" >
                                                        <thead style={{ textAlign: "-webkit-center", backgroundColor: "#252d42" }}>
                                                            <tr style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}} >
                                                                <th style={{ textTransform: "none", color: "#E5E5E5" }}>Date</th>
                                                                <th style={{ textTransform: "none", color: "#E5E5E5" }}>Time</th>
                                                                <th style={{ textTransform: "none", color: "#E5E5E5" }}>Device Name</th>
                                                                <th style={{ textTransform: "none", color: "#E5E5E5" }}>Tag Name</th>
                                                                <th style={{ textTransform: "none", color: "#E5E5E5" }}>Description</th>
                                                                <th style={{ textTransform: "none", color: "#E5E5E5" }}>Alm Value</th>
                                                                <th style={{ textTransform: "none", color: "#E5E5E5" }}>Ack Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            <tr style={{"background":"#252d42","borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>

                                                                <td  >

                                                                    {this.state.name==null?"":this.state.name.map((name) => {
                                                                        var color
                                                                        if (name.ACK == 0 && name.RETN == 0) {
                                                                            return <div className="flash" style={{ textTransform: "none", color: "#E5E5E5" }}>{name.DESCRIPTION.substring(9, 21)}</div>
                                                                            // console.log("black");
                                                                        }
                                                                        else if (name.ACK == 0 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "#E5E5E5" }}>{name.DESCRIPTION.substring(9, 21)}</div>
                                                                            // console.log(color);
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 0) {
                                                                            return <div style={{ textTransform: "none", color: "red" }}>{name.DESCRIPTION.substring(9, 21)}</div>
                                                                            //console.log("green");
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "green" }}>{name.DESCRIPTION.substring(9, 21)}</div>
                                                                            //console.log("yellow");
                                                                        }



                                                                       
                                                                    })}
                                   
                                                                </td>


                                                                <td  >

                                                                    {this.state.name==null?"":this.state.name.map((name) => {
                                                                        var color
                                                                        if (name.ACK == 0 && name.RETN == 0) {
                                                                            return <div className="flash" style={{ textTransform: "none", color: "#E5E5E5" }}>{name.DESCRIPTION.substring(0, 9)}</div>
                                                                            // console.log("black");
                                                                        }
                                                                        else if (name.ACK == 0 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "#E5E5E5" }}>{name.DESCRIPTION.substring(0, 9)}</div>
                                                                            //console.log(color);
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 0) {
                                                                            return <div style={{ textTransform: "none", color: "red" }}>{name.DESCRIPTION.substring(0, 9)}</div>
                                                                            // console.log("green");
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "green" }}>{name.DESCRIPTION.substring(0, 9)}</div>
                                                                            // console.log("yellow");
                                                                        }
                                                                        /*  <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.DESCRIPTION.substring(0,8)}</ul> */
                                                                    })}

                                                                    {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}

                                                                </td>
                                                                <td  >
                                                                    {this.state.name==null?"":this.state.name.map((name) => {
                                                                        var color
                                                                        if (name.ACK == 0 && name.RETN == 0) {
                                                                            return <div className="flash" style={{ textTransform: "none", color: "#E5E5E5" }}>{name.DEVICENAME}</div>
                                                                            // console.log("black");
                                                                        }
                                                                        else if (name.ACK == 0 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "#E5E5E5" }}>{name.DEVICENAME}</div>
                                                                            // console.log(color);
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 0) {
                                                                            return <div style={{ textTransform: "none", color: "red" }}>{name.DEVICENAME}</div>
                                                                            // console.log("green");
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "green" }}>{name.DEVICENAME}</div>
                                                                            // console.log("yellow");
                                                                        }

                                                                        /*   <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.DEVICENAME}</ul> */
                                                                    })}
                                                                </td>


                                                                <td  >
                                                                    {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}


                                                                    {this.state.name==null?"":this.state.name.map((name) => {
                                                                        var color
                                                                        if (name.ACK == 0 && name.RETN == 0) {
                                                                            return <div className="flash" style={{ textTransform: "none", color: "#E5E5E5" }}>{name.POINTNAME}</div>
                                                                            // console.log("black");
                                                                        }
                                                                        else if (name.ACK == 0 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "#E5E5E5" }}>{name.POINTNAME}</div>
                                                                            // console.log(color);
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 0) {
                                                                            return <div style={{ textTransform: "none", color: "red" }}>{name.POINTNAME}</div>
                                                                            // console.log("green");
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "green" }}>{name.POINTNAME}</div>
                                                                            //console.log("yellow");
                                                                        }
                                                                        /*  <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.POINTNAME}</ul> */
                                                                    })}
                                                                </td>

                                                                <td  >

                                                                    {this.state.name==null?"":this.state.name.map((name) => {
                                                                        var color
                                                                        if (name.ACK == 0 && name.RETN == 0) {
                                                                            return <div className="flash" style={{ textTransform: "none", color: "#E5E5E5" }}>{name.DESCRIPTION.substring(33, 100)}</div>
                                                                            //console.log("black");
                                                                        }
                                                                        else if (name.ACK == 0 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "#E5E5E5" }}>{name.DESCRIPTION.substring(33, 100)}</div>
                                                                            // console.log(color);
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 0) {
                                                                            return <div style={{ textTransform: "none", color: "red" }}>{name.DESCRIPTION.substring(33, 100)}</div>
                                                                            // console.log("green");
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "green" }}>{name.DESCRIPTION.substring(33, 100)}</div>
                                                                            //console.log("yellow");
                                                                        }
                                                                        /*    <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.DESCRIPTION.substring(33,77)}</ul> */
                                                                    })}

                                                                </td>

                                                                <td >

                                                                    {this.state.name==null?"":this.state.name.map((name) => {
                                                                        var color
                                                                        if (name.ACK == 0 && name.RETN == 0) {

                                                                            return <div className="flash" style={{ textTransform: "none", color: "#E5E5E5" }}>{this.checkValue(name.VALUE)}</div>
                                                                            // console.log("black");
                                                                        }
                                                                        else if (name.ACK == 0 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "#E5E5E5" }}>{this.checkValue(name.VALUE)}</div>
                                                                            // console.log(color);
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 0) {
                                                                            return <div style={{ textTransform: "none", color: "red" }}>{this.checkValue(name.VALUE)}</div>
                                                                            // console.log("green");
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "green" }}>{this.checkValue(name.VALUE)}</div>
                                                                            // console.log("yellow");
                                                                        }
                                                                        /*    <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.VALUE}</ul>  */
                                                                    })}

                                                                </td>

                                                                <td >

                                                                    {this.state.name==null?"":this.state.name.map((name) => {
                                                                        var color
                                                                        if (name.ACK == 0 && name.RETN == 0) {
                                                                            return <div className="flash" style={{ textTransform: "none", color: "#E5E5E5" }}>{this.checkAckStatus(name.ACK)}</div>
                                                                            //  console.log("black");
                                                                        }
                                                                        else if (name.ACK == 0 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "#E5E5E5" }}>{this.checkAckStatus(name.ACK)}</div>
                                                                            //console.log(color);
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 0) {
                                                                            return <div style={{ textTransform: "none", color: "red" }}>{this.checkAckStatus(name.ACK)}</div>
                                                                            //console.log("green");
                                                                        }
                                                                        else if (name.ACK == 1 && name.RETN == 1) {
                                                                            return <div style={{ textTransform: "none", color: "green" }}>{this.checkAckStatus(name.ACK)}</div>
                                                                            //console.log("yellow");
                                                                        }
                                                                        /*  <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}} key={name}>{name.ACK}</ul> */
                                                                    })}

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
                    
                

            </body>
        )
    }
}