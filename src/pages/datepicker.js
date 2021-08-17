import React, { Component } from 'react'  
import axios from "axios";  
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css";    
export class datepicker extends Component {  
    constructor(props) {  
        super(props)  
  
        this.state = {  
            employeedata: [],  
            startdate: '' ,  
            enddate:''   
        }  
    }  
    Changedate = (e) => {    
        this.setState({    
                startdate: e    
        });    
};  
enddate = (e) => {    
    this.setState({    
        enddate: e    
    });    
};  
    componentDidMount() {  
        axios.get('https://cors-anywhere.herokuapp.com/http://coolaudit.com/api/HISTALARMs/').then(response => {  
            console.log(response.data);  
            this.setState({  
                employeedata: response.data  
            });  
        });  
    }  
    onsubmit = (e) => {    
        debugger;  
        const data = { startdate:this.state.startdate, enddate:this.state.enddate};    
        e.preventDefault();    
        axios.post('https://cors-anywhere.herokuapp.com/http://coolaudit.com/api/HISTALARMs/',data).then(response => {  
            console.log(response.data);  
            this.setState({  
                employeedata: response.data  
            });  
        });  
}     
    render() {  
        return (  
            <div>  
            <div id="main_content"> 

<div className="page">
    
            <div className="section-body">
        
            <div className="row clearfix">
                <div className="col-xl-12 col-lg-12">
                <div className="row">  
                    <div className="col-sm-12 btn btn-info">  
                        How to  Search Data Between Two Dates Using Web API and ReactJS  
                 </div>  
                </div>  
                <form onSubmit={this.onsubmit}>  
                    <div className="row hdr" >  
                        <div className="col-sm-3 form-group">  </div>  
                        <div className="col-sm-3 form-group">  
                                <DatePicker className="form-control"    
                                                        selected={this.state.startdate} placeholderText="Select Date" showPopperArrow={false}    
                                                        onChange={this.Changedate}    
                                                />    
                        </div>  
                        <div className="col-sm-3 form-group">  
                                 <DatePicker className="form-control"    
                                                        selected={this.state.enddate} placeholderText="Select Date" showPopperArrow={false}    
                                                        onChange={this.enddate}    
                                                />    
                        </div>  
                        <div className="col-sm-3 form-group">  
                            <button type="submit" className="btn btn-success" >Search</button>  
                        </div>  
                    </div>
                  
                </form>
                </div>
                </div>
                </div>
                <div className="section-body">
            
            <div className="tab-content">
                <div className="tab-pane fade show active" id="list" role="tabpanel">
                    <div className="row clearfix">
                        <div className="col-lg-12"></div>  
                         <div className="table-responsive" id="users">
     {/*                            <table className="table table-hover table-vcenter text-nowrap table_custom border-style list">  */}
                                    <table className="table">  
                    <thead className="thead-dark">  
                        <tr>  
                            <th scope="col">Id</th>  
                            <th scope="col">Name</th>  
                            <th scope="col">City</th>  
                            <th scope="col">JoiningDate</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        {  
                    this.state.employeedata.map((p, index) => {  
                      return  <tr key={index}>  
                            <th scope="row">{p.Id}</th>  
                            <td>{p.DATETIME}</td>  
                            <td>{p.POINTNAME}</td>  
                    <td>{p.ACK}</td>  
                        </tr>  
                    })   
                    }  
                    </tbody>  
                </table>
               {/*  </table> */}
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
  
export default datepicker 