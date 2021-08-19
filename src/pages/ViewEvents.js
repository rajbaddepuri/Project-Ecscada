import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css"; 
import moment from "moment"
import { Input } from "semantic-ui-react";

export default class ViewEvents extends Component {

    constructor(props){
        super(props);

            this.state = {
                Eventsdata: [],
                startDate: null,  
                EndDate:null,
                selectedFile: null,
                searchInput: "" 
            }
        }

           
 async componentDidMount() {
    try {
        setInterval(async () => {
            axios.get('http://localhost/ScadaClient/api/Events').then(res => {
                console.log(res.data);
                this.setState({ Eventsdata: res.data });
                this.setState({ selectedFile: res.data });

            });
        }, 10000 );
        //set interval tie is in milie seconds 
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
        
            this.setState({ Eventsdata: filteredData });
    
        
      };
      handleChange2 = e =>{ 
        console.log(e.target.value)
        this.setState({ searchInput: e.target.value }, () => {
          console.log("................")
          this.globalSearch();
        });
      };
    changehandler= e => {  
        e.preventDefault();    
        const startDate = moment(this.state.startDate).format('MM/DD/YYYY');
        const EndDate = moment(this.state.EndDate).format('MM/DD/YYYY');
         
        const data = { startDate,EndDate };    
        console.log(data)
         
        axios.post('http://localhost/ScadaClient/api/Events',data).then(response => {  
            //console.log(response.data);  
            this.setState({  
                historicAlarms: response.data  
            });  
        });  
} 
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
         
               
            
              
                    
                            <ul class="nav nav-tabs page-header-tab">
                                <li class="nav-item"><Link to="/ViewEvents" class="nav-link active show" data-toggle="tab" href="#Area_Charts">View Events</Link></li>

                                <li class="nav-item" ><Link to="/HistoricEvents" class="nav-link inactive show" data-toggle="tab" href="#Area_Charts"> Historic Events</Link></li>
                            </ul>
                               
                         
                                       
                    
              
              
                   
            {/* <div className="section-body">
        
        <div className="row clearfix">
            <div className="col-xl-12 col-lg-12">
            <div className="row">  
            </div>  
            <form onSubmit={this.changehandler} >
            <div class="row">
                                                    <div className="col-md-3 col-sm-12" style={{marginLeft:"0px"}}>  
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
                                                    <div className="col-md-3 col-sm-12" style={{marginLeft:"0px"}}>  
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
                                                    <button className="btn btn-primary" type="submit" style={{marginLeft:"0px", background: "blue" }}>Search</button>

                     </div>    
                    

                                                        </form>
                                                     </div>
            </div>
            </div>
             */}

                        
                        <div class="row">
                        <div className="col-md-3 col-sm-12" style={{}}>  
                        <input type="text" className="form-control" placeholder="Search for..."  name="searchInput"
          value={this.state.searchInput || ""}
          onChange={this.handleChange2}/>
                        <span className="input-icon-addon"><i className="fe fe-search"></i></span>
        
                       </div>
                       
                       
                       
                       
                        </div>
                        
             
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="list" role="tabpanel">
                        <div className="row clearfix">
                            <div className="col-lg-12">
                                <div className="table-responsive"  id="users">
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
                                                <td className="hidden-xs" style={{color:"white"}}>
												
                                                {this.state.Eventsdata.map(name => (
                                                <ul style={{textAlign:"-webkit-center", marginLeft:"-40px"}}>{name.DESCRIPTION.substring(9,21)}</ul>
                                                ))}
                                               
                                                
                                                   {/*  <!--<a href="javascript:void(0);" class="mail-star love"><i class="fa fa-heart"></i> --> */}
                                                </td>
                                                <td className="text-center width40" style={{color:"white"}}>
                                                    {/* <!--<div class="avatar d-block">--> */}
												
                                                    {this.state.Eventsdata.map(name => (
                                                    <ul style={{textAlign:"-webkit-lef", marginLeft:"-40px"}}>{name.DESCRIPTION.substring(0,9)}</ul>
                                                    ))}
                                                   
                                                       {/* <!-- <img class="avatar" src="../assets/images/xs/avatar3.jpg" alt="avatar"> --> */}
                                                    
                                                </td>
                                                <td class="hidden-xs" style={{color:"white"}}>                                               
                                                {this.state.Eventsdata.map(name => (
                                                <ul style={{textAlign:"-webkit-left", marginLeft:"-40px"}}>{name.DEVICENAME}</ul>
                                                ))}
                                                </td> 
                                              
                                                
                                                <td className="hidden-xs" style={{color:"white"}}>
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
                                                
                                                {this.state.Eventsdata.map(name   => (
                                                <ul style={{textAlign:"-webkit-left", marginLeft:"-40px"}}>{name.POINTNAME}</ul>
                                                ))}
           
                                                </td>
                                                
												<td className="hidden-xs" style={{color:"white"}}>
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
                                                  
                                                {this.state.Eventsdata.map(name  => (
                                                <ul style={{textAlign:"-webkit-left", marginLeft:"-40px"}} >{name.DESCRIPTION.substring(33,100)}</ul>
                                                ))}
           
                                                </td>
                                                <td class="hidden-xs" style={{color:"white"}}>
                                                  {/*  <!-- <div class="text-muted">maryadams@info.com</div>--> */}
												                          {this.state.Eventsdata.map(name   => (
                                                <ul style={{textAlign:"-webkit-left", marginLeft:"-40px"}} >{name.VALUE}</ul>                                                                           
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