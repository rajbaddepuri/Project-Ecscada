import React, { Component } from 'react';

import { Table, Button, Alert } from 'react-bootstrap';
import { Input } from "semantic-ui-react";
import DatePicker from "react-datepicker";   
import moment from "moment"
    
    class Report extends Component {
      constructor(props){
        super(props);
        this.state={
          selectedFile: null,
          searchInput: "",
          selectedFile1:null,
          Status:"",
          startDate:null
        }
      }


  
    submitHandler = e => {  
      e.preventDefault(); 

          function importAll(r) {
            console.log(r)
           return r.keys().map(r);
          }
  
          //Based on Location importAll Files ---   Location /src/Pictures
          //D:/Unical
          let startDate = moment(this.state.startDate).format('DD-MM-YYYY');
          console.log(startDate)
          console.log(this.state.Status)
          //D:\Unical\shift\shift_14-09-2021
          var status = this.state.Status
          var path ='D:/Unical/'+this.state.Status+'/'+this.state.Status+'_'+startDate
          //console.log(path)
          //`./utils/${variableName}`
          var Pdf = importAll(require.context('D:/Unical/shift/shift_14-09-2021', true, ));
          var Array = [];
          Pdf.map((a)=>Array.push(a.default))
          console.log(Array)
          var temp=[]
          Array.map((a)=>temp.push(a.split("/")[3]))
          console.log(temp)

          //Setting ListFiles to state
          this.setState({
            selectedFile:temp },() => {
              console.log(this.state.selectedFile)
            })    
            this.setState({
              selectedFile1:temp },() => {
                console.log(this.state.selectedFile)
              })  
   } 

///..........status handking..........
changeHandler = e => {

  const name = e.target.name;
  const value = e.target.value;
  console.log(name)
  console.log(value)
  this.setState({
    Status: value   
},()=>{
  console.log(this.state.Status)
});
}
handleChange1 = date => {
  this.setState({
      startDate: date
  });
}

        //...........................
        handleChange = e =>{ 
          console.log(e.target.value)
          this.setState({ searchInput: e.target.value }, () => {
            console.log("................")
            this.globalSearch();
          });
        };
//...............................
globalSearch = () => {
  let { searchInput } = this.state;
  console.log( this.state.selectedFile1)
  
  let filteredData = this.state.selectedFile1.filter(value => {
    return (
      value.toString().toLowerCase().includes(searchInput.toLowerCase()) 
    );
  });
  console.log(filteredData)
  this.setState({ selectedFile: filteredData });
};
    
    
      render() {
        
        //console.log(this.state.selectedFile[0]==null?ECE:this.state.selectedFile[0])
    
        return (
          <div className="page">
            <br/>
              <div>
              <div className="row clearfix">
                <div className="col-xl-12 col-lg-12">
                  <div className="row"></div>
                  <form onSubmit={this.submitHandler}>
                    <div class="row">
                      <div className="col-md-3 col-sm-12">
                        Please Choose The Date:
                        <DatePicker
                          wrapperClassName="datepicker"
                          className="form-control"
                          autoComplete="off"
                          selected={this.state.startDate}
                          onChange={this.handleChange1}
                          name="startDate"
                          maxDate={new Date()}
                          dateFormat="MM/dd/yyyy"
                        />
                      </div>
                      <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <div  style={{ color: "black" }}>
                                        
                                        {/* <input type="text" name="Gender" value={this.state.add.Gender} onChange={this.changeHandler}/> */}
                                        <label>Shift<input type="radio" value={"shift"} name="Status" onChange={this.changeHandler} style={{ marginLeft: "80px" }} /> </label>
                                        <br />
                                        <label>Dialy<input type="radio" value={"dialy"} name="Status" onChange={this.changeHandler} style={{ marginLeft: "77px" }} /> </label>

                                    </div>
                                </div>
                            </div>
                     
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ background: "blue" ,height:"40px"}}
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <br />
        <Input
          size="large"
          name="searchInput"
          value={this.state.searchInput || ""}
          onChange={this.handleChange}
          label="Search"
        />
        <br />
        <br />
           
            <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
          <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
          <Table> 
          <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
              <tr >
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Report Name</th>
               
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
                 {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>Delete</th>*/}
                                                            
              </tr>
            </thead>
            <tbody>
              {
                this.state.selectedFile==null?"":this.state.selectedFile.map((data=>
                  <tr style={{textAlign:"-webkit-center"}}>
                  <td style={{color:"black"}}>{data}</td>
                  <td><button className="btn btn-primary"style={{background:"blue"}} ><a href={"/static/media/"+data} target="_blank">Download</a></button></td>
                  

                  </tr>
            ))}
           
           
                  
            </tbody>
            </Table>
          </table>
          </table>
          </div>
        );
      }
    }
    
    export default Report;