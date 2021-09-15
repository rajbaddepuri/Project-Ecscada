import React,{Component} from 'react';
import ReactDOM from 'react-dom';
 import {Link} from 'react-router-dom'; 

// import DatePicker from "react-datepicker";    
// import "react-datepicker/dist/react-datepicker.css"; 
 import axios from 'axios'; 
  // import DateTimePicker from 'react-datetime-picker';
 import 'chartjs-plugin-zoom';

 import DateTimePicker from 'react-datetime-picker';

 import DatePicker from 'react-datetime';
//  import { DateTimePicker } from 'react-widgets'

import moment from "moment";
 import { Line,Chart } from "react-chartjs-2";

import { ScrollView } from "react-native";
import { Axis } from 'highcharts';
import Moment from 'moment';
import Modal from './Modal.js';

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 
//import { colors } from 'react-select/src/theme';



/* let fvalue = []; */
let timeStampTime = [];
let value = [[0,0,0,0,0,0,0],[],[],[]]
 let hist = []
// let updateInterval = 1000;
export default class AreaTrends extends Component{
    
    constructor(props) {  

        super(props);  
 this.chartRef = React.createRef();

 
 this.replaceModalItem = this.replaceModalItem.bind(this);
 this.saveModalDetails = this.saveModalDetails.bind(this);

        this.state = { 
            Data: [],
            name: [],
            chart: [],
            Date: [],
            ULarray: [],
            histS: [],
            fvalue: [],
            requiredItem: 0,
            baseUppervalue:100,
            baseLowervalue:-50 ,
            isGraphOn:true,
           timeInterval: 1000,
            currentDateTime: new Date().toLocaleString(),
            windowWidth : window.innerWidth,
            currentWindowSpan :350,
            singlePoint :10,
            graphWidth:10,
            currentGroup:"",
          ///.................start date and end date should be null(02-09-2021)...............////
            startDate:null,
            endDate:null,
            pan :false,
            zoom:true,
            Mtime:[],
            Mvalue:[],
            GroupnameError:"",
            startdateError:"",
            EnddateError:"",          
     
        };
        
/* 
         currentDateTime: new Date(); */
} 
onHoverMethod(event, array) {

  var temp = [];
  var item = this.myChart.getElementAtEvent(event);
 // console.log(item);
  if (item.length){
    //console.log("mouse on");
    console.log(this.myChart.data.labels[item[0]._index], this.myChart.data.datasets[0].data[item[0]._index])
    this.setState({
        Mtime : this.myChart.data.labels[item[0]._index],
        Mvalue:this.myChart.data.datasets[0].data[item[0]._index]
       })
      console.log(this.state.Mtime)

      this.myChart.data.datasets.forEach((datasets,i) => {
     const  Mvalue=this.myChart.data.datasets[i].data[item[0]._index];
     temp.push(Mvalue)
    })

    this.setState({
      Mvalue:temp
    })
    console.log(temp)
  }
}





componentDidMount() {
  
    axios.get('http://localhost/ScadaClient/api/GroupName?GroupName=').then(res => {
        console.log(res);
        //this.setState({ name: res.data });
        this.setState({ name: res.data },()=>{
          console.log(this.state.name)         
          //............For Default  group name Pupose...........//////    
         {
        //    if(this.state.currentGroup == "")
        //    {         
        //     this.setState({
        //     currentGroup :this.state.name[0]['CURTRENDTITLE']
        //    })
        //  }
       }     
      });
    });

    this.graph = [];
    this.draw=[];

this.myChart = new Chart(this.chartRef.current, {
type: "line",
options: {
  title: {
    display: true,
    text: 'Historic Trends'
  },
  maintainAspectRatio:false,
  response:true,
  zoomEnabled:true,
  animationEnabled: true,
  responsive:true,
  hover:{
    mode:'index',
    intersect:true,
  },
  onHover: this.onHoverMethod.bind(this),
  // maintainAspectRatio :false,

  scales: {
    xAxes: [{
      distribution: 'linear',
      type : "time",
      time: {
        unit:"minute",
        displayFormats: {
      //    YYY-MM-DDThh:mm:ss
          minute: "YYY-MM HH:mm"
        }
      }
    }],
    yAxes: [
      {
        type:"linear",
        display:true,
        position:"left",
        id:"tempYAxis",
        scaleLabel :{
          display:true,
          labelString:"Value"
        },
        ticks:{
          display:true,
       //   fontColor:"RED"
        }
      },
    ]
  },
  tooltips:{
    mode:"nearest",
    intersect:false,
  },
  pan: {
    enabled: false,
    drag: true,
    mode: "xy",
   //  speed: 10,
   // threshold: 10
  },

  zoom: {
    enabled: true,
    drag: true,
    mode: "xy",
    limits: {
      // max: 10,
      //  min: 0.5
    },
    rangeMin: {
      // x: 20,
      // y: 1000
    },
    rangeMax: {
      //  x: 10,
      // y: 150
    }
  
  },
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      usePointStyle: true,
        fontColor: '#333'
    }
  },
},
//  data:{
//   labels :'',
//    datasets : [{
//     fill:false,
//        // fillColor : "rgba(220,220,220,0.5)",
//        // strokeColor : "rgba(220,220,220,1)",
//        // pointColor : "rgba(220,220,220,1)",
//        // pointStrokeColor : "#fff",
//        borderColor: "Black",
//      //  backgroundColor:"Yellow",
//        pointRadius:0,
//        borderWidth:1,
//          data : []
//      },
//    ],
//  }, 
});
}
//Curretn Group DropDown OnClick-----------------
handleSelectedGroupDropDOwn = (e) =>
{
console.log("DropdoWNclicked");
var  value = e.target.value ;
console.log(value);
console.log("Calling Groups API")
this.setState({currentGroup:value},async()=>{
  alert("entered into")

  var api = 'http://183.82.4.93:5887/ECScadaTrends/api/groupname?groupname=DAS_GRP2';
  
  console.log(api);
  axios.get(api)  
  .then( async res => {  
      // this.setState(async()=>{
        this.setState({chart: res.data},async()=>{
         console.log(this.state.chart.length)
         var labelMap = await this.state.chart.map((data,i)=>{
           console.log(data.PENCOLOR)
          const color =data.PENCOLOR;
      
          //Converting colors to hexRGB COlor
          const [, alpha, ...colorArray] = ('00000000' + color.toString(16)).slice(-8).match(/([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i)
       var   hexARGBColor =  `#${colorArray.join('')}${alpha}`
        
       console.log(hexARGBColor);
       this.graph.push(hexARGBColor);
       console.log(this.graph)
            })

            this.setState({})  
     
} )
  } )
   
  }
)  

}


// handleSelectedGroupDropDOwn = (e) =>
// {
// console.log("DropdoWNclicked");
// var  value = e.target.value ;
// console.log(value);
// if (value == this.state.currentGroup)
// {
//   clearInterval(this.timer);
//   this.timer = setInterval(() => this.update(),this.state.timeInterval);
// }else{
//   this.myChart.data.labels = [];
//   this.myChart.data.datasets = [];
//   this.myChart.update() ;
//   this.setState({
//     chart:[]
//   });


//   clearInterval(this.mainTimer);

//   this.setState({currentGroup :value},() => {
//     console.log(this.state.currentGroup);
   
    // this.mainTimer = setInterval(() => this.trendsTagsaPI(),this.state.timeInterval);
   // this.trendsTagsaPI();
//   })c

// } 
// }


///.....................this  for handle validation (02-09-2021)..........//////////


handleVAlidations() {
  let validGropuname = false;
  let validStartdate = false;
  let validEnddate = false;
  let validDate =  false;
  let validDateRange=false;

  ///..... group name.....///
  if (this.state.currentGroup ==""){
    console.log("........entred........")
    validGropuname=true
  }
///.......start date...///
console.log(this.state.startDate)
if (this.state.startDate == null ){
  console.log("........entred........")
  validStartdate = true
}
///.......end date...///
if (this.state.endDate == null ){
  console.log("........entred........")
  validEnddate = true

}
//........end date should be less than start date.........////
console.log(this.state.endDate)
if (this.state.startDate > this.state.endDate){
  
  validDate = true
}

///........ the diffarance beteween the end date and startdate should be Les than 90 days......./////
if (this.state.startDate && this.state.endDate !== null ){
  console.log("enterd")
   // To set two dates to two variables
   var date1 = new Date(this.state.startDate);
   var date2 = new Date(this.state.endDate);
     
   // To calculate the time difference of two dates
   var Difference_In_Time = date2.getTime() - date1.getTime();
     
   // To calculate the no. of days between two dates
   var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
   console.log( Difference_In_Days)
   if (Difference_In_Days >= 91){
     validDateRange= true
   }
}
return { validGropuname, validStartdate, validEnddate, validDate ,validDateRange};
}



Historic = async () => {

  
  
   
///.............CALLING METHOD VALIDATION.....................///////////////////
  var { validGropuname, validStartdate, validEnddate ,validDate ,validDateRange} = this.handleVAlidations();
  if (validGropuname ) {
    //alert("Please Select Group Name")
    this.setState({

      GroupnameError: " * Please Select Group Name"
  }, () => {
        console.log(this.state.GroupnameError)
  })
}
if (validStartdate ) {
// alert("Please Select The Start Date")
  this.setState({

    startdateError: " * Please Select The Start Date"
}, () => {
  console.log(this.state.startdateError)

})
}
  
if (validEnddate ) {
  //alert("Please Select The End Date")
  this.setState({
    EnddateError: " * Please Select The End Date"
}, () => {
  console.log(this.state.EnddateError)
})
}
if (validDate){
  alert("The start date should not be greater than end date")
}
if (validDateRange){
  alert("The start and end date should not be greater than 90 days")
}

  var startdate = Moment(this.state.startDate).format('YYYY-MM-DDThh:mm:ss')
  var enddate = Moment(this.state.endDate).format('YYYY-MM-DDThh:mm:ss')
 // console.log(startdate,enddate,this.state.currentGroup)


  
//alert("ok")
  //console.log("??????????????????????????????????????????????????")
  //console.log("Selected Group Tags Length" +this.state.chart.length)
  //console.log(this.state.chart)

/////'..............ADDING THE CONDITION.........///////////////////

  if (!validGropuname && !validStartdate && !validEnddate && !validDate && !validDateRange) {
   
  
    var temp =  [];
    const val = [];
  let i=0;
  let urllist=[]
  
  
    alert("ok")
   // http://localhost/ScadaClient/api/HistoricTrendsData?PointName=TI_1203&FromDate=2021-03-09T14:26:30&ToDate=2021-03-09T14:28:30

   // var api = "http://localhost/ScadaClient/api/HistoricTrendsData?PointName="+this.state.chart[i].POINTNAME+"&FromDate="+startdate+"&ToDate="+enddate;
   // var api = "http://localhost/ScadaClient/api/FileRead?PointName="+this.state.chart[i].POINTNAME+"&FromDate=2021-03-25T12:12:30&ToDate=2021-03-25T15:12:33";
    //var api = "http://localhost/ScadaClient/api/FileRead?PointName="+this.state.chart[i].POINTNAME+"&FromDt="+startdate+"&ToDt="+enddate;
   
  // var api = "http://localhost/ScadaClient/api/FileRead?PointName=DAS_GRP2&FromDt="+startdate+"&ToDt="+enddate;
    var api = " http://183.82.4.93:5887/ECScadaTrends/api/groupname?groupname=DAS_GRP2";
       console.log(api)
      const response =  await axios.get(api)
      console.log("response----------")
     console.log(response.data)

     temp.push(response.data)
     console.log(temp.length)
    
     this.setState({histS:temp},()=>{
      console.log(temp)
      console.log(this.state.histS)
    // console.log(this.state.histS[0].length)   
    if(this.state.histS.length !== undefined) 
      {

        this.addingDatasets()
      }
      else{
        console.log("No DAat Available in betwean those Dates from selected Group--!")
       this.PopupExample();
      }
    
     })
    }
 }



 async addingDatasets(){    
var fVAluePoints = [];
var datetimeLabels = [];
var tempDAtasets = [];
  
//Labels ----------------------------------------------------------------
var labelMap =  await this.state.histS[0].map((singlePoint,i)=>{
  var datelabel = Moment(singlePoint.timestamp).format('YYYY-MM-DDTHH:mm:ss')
 // console.log(datelabel)
  datetimeLabels.push(datelabel)
    })  

   
    console.log("Labels DAta-------------------------------"+datetimeLabels.length)

console.log(this.myChart.options.scales.yAxes)

 // this.myChart.options.scales.yAxes  = [];

    this.myChart.update();
  
///  this.myChart.update();
console.log("---------------")
    // this.myChart.options.scales.yAxes[0].gridLines.display= false;                
    // this.myChart.update();              
   // console.log(this.myChart.options.scales.yAxes)
    //console.log("Length of Y-Axis :"+this.myChart.options.scales.yAxes.length)
  for(var i=0;i<this.state.histS.length;i++)
  {
    console.log(i)
    fVAluePoints= []      
  //Fvalue POins ----------------------
  var fvalueMap =  await this.state.histS[i].map((singlePoint,i)=>{
    fVAluePoints.push(singlePoint.fvalue)
      })

     
        // console.log("Length after slice"+fVAluePoints.length)
     // console.log(this.state.histS[i][0].pointname +"FvalueDatasets DAta-------------------------------"+fVAluePoints.length)

       //Converting colors to hexRGB COlor    
     //  var color  = this.state.histS[i][0].PENCOLOR ;
     var color = this.state.chart[i].PENCOLOR;
       const [, alpha, ...colorArray] = ('00000000' + color.toString(16)).slice(-8).match(/([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
      var   hexARGBColor =  `#${colorArray.join('')}${alpha}`
    // var hexARGBColor = "#000000"
      
      //  console.log(hexARGBColor)

       

      tempDAtasets.push( {
      fill:false,         
      label :this.state.histS[i][0].pointname ,
         fillColor :hexARGBColor,
          strokeColor : "rgba(220,220,220,1)",
           pointColor  :hexARGBColor,
          pointStrokeColor : hexARGBColor,
       borderColor:hexARGBColor,
      backgroundColor:hexARGBColor,
         pointRadius:1.0,
         hidden:false,
         borderWidth:1,
          data :fVAluePoints,
          yAxisID:"yAxis"+[i]
      })

      this.myChart.options.scales.yAxes.push({
          type:"linear",
          display:true,
          position:"left",
          id:"yAxis"+[i],
          scaleLabel :{
            display:false,
            labelString:"Value"
          },
          ticks:{
            display:true,
            fontColor:hexARGBColor
          }
      }) 
 }
 this.myChart.data.labels = datetimeLabels

 this.myChart.data.datasets = tempDAtasets

 //this.myChart.options.scales.ya

 this.myChart.update()
 //console.log(this.myChart.options.scales.yAxes[0])
 console.log(datetimeLabels)
this.myChart.options.scales.yAxes[0].display = false;
this.myChart.update()
}

   //PopupExample = () => alert('No Data Available in betwean  those Dates fro selected Group ..!')
    
// PopupExample = () => {
//   confirmAlert({
//     // title: 'Try Again !',
//     // message: 'No Data Available in betwean those Dates for selected Group ..!',
//     customUI: ({ title, message, onClose }) => {
//       return (
//         <div className='custom-ui' style={{
//           border: '3px solid red',
//         width: 500, height: 150, padding:10,
//         borderRadius: 15, backgroundColor: "lightgrey",}} >
//           <h1>Try Again !</h1>
//           <p>No Data Available in betwean those Dates for selected Group ..!</p>
//           <button onClick={onClose}>OK</button>
    
//         </div>
//       );
//     },
//     // buttons: [
//     //   {
//     //     label: 'Ok',
//     //    // onClick: () => alert('Click Yes')
//     //   },
     
//     // ]
//   })
// };




//ChartDtaa----------------
     

//Start and Stop Button ------------------
handleStopButtonOnClick = (e) =>
{
console.log("Stop&Resume Button Clicked");
if(this.state.isGraphOn == true)
{
  clearInterval(this.timer);
  this.setState({isGraphOn :false});
}else{
this.timer = setInterval(() => this.update(),this.state.timeInterval);
this.setState({isGraphOn :true});
}
}


//SampleRate Handler------------
handleSampleRateChange = (e) => {
  console.log("sample rate dropdown clicked");
  const val = e.target.value;
  clearInterval(this.timer);
  this.setState({timeInterval :val*1000},() => {
    this.timer = setInterval(()=>this.update(),this.state.timeInterval);
  })

}
   //OnClick Zoom or Pan 
   panOnClick = (e) => {
    console.log("Pan Clicked");

    this.myChart.options.pan.enabled = !this.myChart.options.pan.enabled
    this.setState({
      pan:!this.state.pan
    })
  
    this.myChart.options.zoom.enabled = !this.myChart.options.zoom.enabled
    this.setState({
      zoom:!this.state.zoom
    })

  }

//Window Span Handler---
WIndowSpanhandler = (e) => {
  console.log("WIndow SPan CLicked");
  const val = e.target.value;
  clearInterval(this.timer)
  this.setState({currentWindowSpan:val*60},() => {

    this.timer = setInterval(() => this.update(),this.state.timeInterval);

  })
  
}
//ResetGraph--------------------------------------------
ResetGraphhandleClick = (e) => {
  console.log("Reset Graph Clicked");
  clearInterval(this.timer);
  

  this.myChart.resetZoom();
 // this.scrollView.scrollTo({ x: this.state.graphWidth });
 // this.timer = setInterval(() => this.componentDidUpdate(), this.state.timerInterval);

}

replaceModalItem = (e) =>{

  this.setState({
    requiredItem: e
  });
  console.log("edit button clicked")
  console.log(e)

}


converAndroidColortoRGB(androidColor){
  

  return "#000000";
}


saveModalDetails(item) {
  console.log(item);

  
  function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  function rgbToHex(r, g, b,a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  if(item.color)
  {
  var r =item.color.r
  var g =item.color.g
  var b =item.color.b
  var a =item.color.a
  var color = rgbToHex(r,g,b,a)
  console.log(color)

  if (color !== "#" + 24111219){
    this.graph[this.state.requiredItem] = color;
    this.myChart.data.datasets[this.state.requiredItem].borderColor  = color;
  }
  this.setState({})
}
  console.log(this.state.requiredItem)
  if (item.UPPERVALUE != " " && item.LOWERVALUE != ""){
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.ULarray;
    tempbrochure[requiredItem] = item;
    this.setState({ item: tempbrochure });
   
  
  }
   
  
  if (item.UPPERVALUE != " " && item.LOWERVALUE !=" "){
this.myChart.options.scales.yAxes[this.state.requiredItem+1].ticks.max  = Number(item.UPPERVALUE);
this.myChart.options.scales.yAxes[this.state.requiredItem+1].ticks.min = Number(item.LOWERVALUE);
  }
this.myChart.options.scales.yAxes.map((value,i)=>{
  if(i!=this.state.requiredItem+1)
  {
    //value.display = false;
  }else{
  //  value.display = true;
   // value.ticks.display = false;
  }

})
this.myChart.update();
  console.log(this.state.ULarray);
  
}


hiddenOnClick = (e) =>{
  console.log("hidden Selected");

  console.log(e);
  this.myChart.data.datasets[e].hidden  = !this.myChart.data.datasets[e].hidden;
  this.myChart.update();
  this.setState({
 
  });
  
}
/////////....................... this for setting group statically ...........//////////////
change = (e)=>{
  const name = e.target.name;
  const value = e.target.value;
  console.log(name,value)
  this.setState({
    currentGroup:value
  },()=>{
    console.log(this.state.currentGroup)
  })
  

}

changeHandlerStart = (e) =>{

  this.setState({    
    startDate: e   
}); 
console.log("startdate")
console.log(e)
 
} 

changeHandlerEnd = (e) =>{
  this.setState({    
    endDate: e   
  });
  // console.log(enddate)
  console.log("enddate")
  console.log(e)
}


    render(){

      // let stopButton = (this.state.isGraphOn == true)?
      // <button className="btn btn-primary" style={{backgroundColor:"#337ab7"}} onClick={this.handleStopButtonOnClick}>StopGraph</button>:
      // <button className="btn btn-primary" style={{backgroundColor:"#337ab7"}} onClick={this.handleStopButtonOnClick}>Resume</button>
    
      let  pan =   <button   className="btn btn-primary" onClick={this.panOnClick} style={{backgroundColor:this.state.pan == true ? "green" : "red"}}>Pan</button>
      let zoom  =  <button   className="btn btn-primary" onClick={this.panOnClick} style={{backgroundColor:this.state.zoom == true ? "green" : "red"}}>Zoom</button>
     
  
    return(
        <body className="font-montserrat">

<div id="main_content">

    <div className="page">
    <div class="section-body">
            <div class="container-fluid">
                <div class="row clearfix">
                    <div class="col-lg-12">
                        <div class="d-lg-flex justify-content-between">
                            <ul class="nav nav-tabs page-header-tab">
                                <li class="nav-item"><Link to="/AreaTrends" class="nav-link " data-toggle="tab" href="#Area_Charts">Trends</Link></li>

                                <li class="nav-item"><Link to="/HistoricTrends" class="nav-link active show" data-toggle="tab" href="#Email_Settings">Historic Trends</Link></li>
                                
                                <li class="nav-item"><Link to="/TabularTrends" class="nav-link" data-toggle="tab" href="#Change_Password">Tabular Trends </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
       
        <div className="section-body">
                <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">View Trends</h3>
                                <div className="card-options">
					
        <div class="dropdown" style={{marginRight:"34px"}}> 

        <section className="wrapper">
        <div className="wrapper_inner"> 
        {/*   <h2 className="title">Currency Converter</h2> */}

           <div className="flex">
            <form className="flex-column"> 
            
            
                                <div class="form-group" style={{}}>
                                   {/*  THIS FOR STATIC GROUP NAME BINDING BECAUSE API'S ARE NOT WORKING */}
                                    <select name="currentGroup" 
                                        className="form-control"  value={this.state.currentGroup} onChange={this.change}>
                                    <option value=""></option>
                                    <option value="DAS_GRP2" onClick={this.handleSelectedGroupDropDOwn}>DAS_GRP2</option>
                                    <option value="sample">sample</option>

                                    </select>
                                    {/* ...........FOR SHOWING THE ERROR...... */}
                                    <span style={{ fontWeight: "", color: "red" }}>{this.state.GroupnameError}</span>
                                </div>
                            
            {/* <select name="currentGroup" className="form-control" style={{ width: "56%" }} value={this.state.currentGroup} onChange={this.change}>
                  <option value=""></option>
                  <option value="DAS_GRP2">DAS_GRP2</option>
                  <option value="sample">sample</option>

             </select> */}
        
               {/* <select className="custom-select" onChange={this.handleSelectedGroupDropDOwn} >
              
                {this.state.name.map(name => (
                  <option key={name} value={name.CURTRENDTITLE} >
                    {name.CURTRENDTITLE} 
                  </option>
                ))} 
                
              </select> */}
              {/* <input
                className="result_input"
                type="number"
                value={amount}
                onChange={this.handleInput}
              /> */}
            </form>
            </div>
            </div>
            </section> 
  
                      </div>
                                    {/* <div class="dropdown" style={{marginRight:"34px"}}>
                                    <button className="custom-select" id="dropbtn">Trends in Area</button>
                                    <div class="dropdown-content">
                                       
                                        <Link to="/LineTrends">Trends in Line</Link>
                                        <Link to="/BarTrends">Trends in Bar</Link>                                     
                                       
                                    </div>
                                </div> */}
					
			
                                    {/* <button className="btn btn-sm btn-outline-secondary mr-1" id="one_month">1M</button>
                                    <button className="btn btn-sm btn-outline-secondary mr-1" id="six_months">6M</button>
                                    <button className="btn btn-sm btn-outline-secondary mr-1" id="one_year" class="active">1Y</button>
                                    <button className="btn btn-sm btn-outline-secondary mr-1" id="ytd">YTD</button>
                                    <button className="btn btn-sm btn-outline-secondary" id="all">ALL</button> */}
                                </div>
                            </div>
                            
                        </div>                
                    </div>
                    
              </div>  
              </div>
</div>
         
<div className="section-body">
         <div className="tab-content" style={{marginBottom:"300px"}}>
                <div className="tab-pane fade show active" id="list" role="tabpanel">
                <div className="col-lg-12">
              
               <div className="">
             
      {/* <div className="chartWrapper" style={{ width:"100%"}}> 
     <div className="chartContainer" style={{ }}>    */}
              <ScrollView  ref={(ref) => {
                this.ScrollView = ref;
              }}>

               <canvas 
              id="myChart"
              ref={this.chartRef} height="400px"></canvas>
              </ScrollView>
             {/* </div>
              
              </div>    */}
            {/* <Line height={'400px'} width={'1000px'} data={this.state.Data}
               options={{
                responsive: true,
                title: { text: "Trends", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                 suggestedMin: 200,
                        suggestedMax: 250,
                      },
                      gridLines: {
                        display: true,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: true,
                      },
                    },
                  ],
                },
                pan: {
                  enabled: true,
                  drag: true,
                  mode: "xy",
                  speed: 10,
                  threshold: 10,
                },
                zoom: {
                  enabled: true,
                  drag: false,
                  mode: "xy",
                  limits: {
                    max: 300,
                    min: 5,
                  },
                },
              }}
               /> 
                 */}
               </div> 
               </div>

               <div className="section-body">
                <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-xl-12 col-lg-12">
                    <div class="row" style={{marginTop:"20px"}}>
                    
                    <div className="col-xs-6 col-md-2" class="dropdown"  style={{marginRight:"100px"}}>
                                             {/* <button className="custom-select" id="dropbtn">15 seconds</button>
                                             <div class="dropdown-content">
                                                 <Link to =''>30 seconds</Link>
                                                 <Link to="">1 min</Link>
                                                 <Link to="">5 min</Link>
                                                 <Link to="">15 min</Link>
                                                 <Link to="">30 min</Link>
                                                 <Link to="">1 hour</Link>
                                                 <Link to="">2 hour</Link>
                                     
                                                
                                             </div><br/> */}
                                              {/* Sample Rate :
                                             <select id="SAmpleRate" onChange={this.handleSampleRateChange}>
                                               <option value="1">1 Sec</option>
                                               <option value="2">2 Sec</option>
                                               <option value="3">3 Sec</option>
                                               <option value="5">5 Sec</option>
                                               <option value="5">10 sec</option>

                                             </select>
                       */}
                                         </div>
                                        
                                        
                   <div style={{marginRight:"0px"}}>   
                                    
                     <label>
                      Marker Time :   {this.state.Mtime}                   
                     </label>
                     <br/>
                     
                     
                     
                       
                   </div>
                                     
                   <div className="col-xs-6 col-md-2" style={{marginLeft:"100px"}}>
                   Window Span(min) :
                    {/* <div class="dropdown"  >
                                             <button className="custom-select" id="dropbtn">5 min</button>
                                             <div class="dropdown-content"> */}
                                             <select id="Window Span" onChange={this.WIndowSpanhandler}>
                                               <option value="1">1 Min</option>
                                               <option value="2">2 Min</option>
                                               <option value="3">3 Min</option>
                                               <option value="5">5 Min</option>
                                               <option value="10">10 Min</option>

                                             </select>
                      
                 {/* //  </div></div> */}
                 </div>


                   <div className="col-xs-6 col-md-2" style={{marginLeft:"50px", color:"white"}}>
                   
                   </div>
                   
        {pan}
        
        {zoom}

                  <button   className="btn btn-primary" style={{ color:"white", height:"35px", backgroundColor:"rgb(51, 122, 183)"}}onClick={this.ResetGraphhandleClick}>Reset Graph</button>
      
                  
                   <div style={{marginLeft:"25px",marginTop:"0px", fontWeight:"bold", fontSize:"15px"}}>{this.state.currentDateTime}</div>
                   
                   </div>  
<br/>
                   <div class="row">
                     {/*  ..................................DISABLED CLOCK AND ADDED MAX DATE ........................ */}
                                                    <div className="col-md-3 col-sm-12" style={{marginLeft:"550px"}}>  
                                                Start Date:    <DateTimePicker className="form-control" type="datetime-local" name="startdate" style={{marginLeft:"75px", marginTop:"-30px", width:"70%"}}  
                                                    value={this.state.startDate} placeholderText="Start Date"     disableClock={true}  maxDate={new Date()} clearAriaLabel="Clear value"
                                                    onChange={this.changeHandlerStart} 
                                                    />  
                         {/*...............................FOR SHOWING THE ERROR................................ */}
                                                       <span style={{ fontWeight: "", color: "red" }}>{this.state.startdateError}</span> 
                                                    
                                                    </div>
                            {/*  ..................................DISABLED CLOCK AND ADDED MAX DATE ........................ */}
                                                    <div className="col-md-3 col-sm-12" style={{marginLeft:"0px"}}>  
                                                End Date:    <DateTimePicker className="form-control" type="datetime-local" name="enddate" style={{marginLeft:"75px", marginTop:"-30px", width:"70%"}} 
                                                    value={this.state.endDate} placeholderText="End Date"    disableClock={true} maxDate={new Date()} clearAriaLabel="Clear value"
                                                    onChange={this.changeHandlerEnd} 
                                                    /> 
                                  {/*...............................FOR SHOWING THE ERROR................................ */}                   
                                                    <span style={{ fontWeight: "", color: "red" }}>{this.state.EnddateError}</span>
                                                       
                                                    
                                                    </div>
                                                    <button className="btn btn-primary" style={{marginTop:"25px", color:"white", height:"35px", backgroundColor:"rgb(51, 122, 183)"}} onClick={this.Historic}>Submit</button>

                     </div>    
                    </div>
                    
              </div>  
              </div>
</div>

</div></div></div>

{/* <div className="section-body">
            
            <div className="tab-content">
                <div className="tab-pane fade show active" id="list" role="tabpanel">
                    <div className="row clearfix" style={{marginTop:"-300px"}}>
                        <div className="col-lg-12">
                            <div className="table-responsive"  id="users">
                                <table style={{width:"75%", marginTop:"10px"}}> 
                            
                                    <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42", height:"25px"}}>
                                        <tr>
                                        <th style={{textTransform:"none", color:"#E5E5E5"}}>Enable/Disable</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Tag Name</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>High Limit</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Low Limit</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Current Value</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Marker Value</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Edit</th>
                                        </tr>
                                    </thead>
                                   <tbody >
                                     {this.state.chart.map((chart,i) => (
                                     <tr onClick={() => this.RowClicked(i)}>
                                       
                                       <td style={{textAlign:"-webkit-center",width:"10px"}} > <input type="checkbox"  checked = {!this.myChart?.data?.datasets[i]?.hidden} onChange={() => this.hiddenOnClick(i)}  /> </td>
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{chart.POINTNAME}</label> </td>
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}> { this.state.ULarray[i] == null ? chart.UPPERVALUE :this.state.ULarray[i]?.UPPERVALUE}</label> </td>
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{ this.state.ULarray[i] == null ? chart.LOWERVALUE :this.state.ULarray[i]?.LOWERVALUE}</label> </td> 
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{chart.fvalue}</label>  </td>
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{chart.PENCOLOR}</label> </td>
                                       <td style={{textAlign:"center", marginLeft:"0"}}>   <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" style={{backgroundColor:"#337ab7",width:"50px"}} onClick={() => this.replaceModalItem(i)} >Edit</button> </td>
                                     </tr>
                                     ))}
                                    </tbody>
                                </table>
                    
                                <Modal 
                                        UPPERVALUE= "0"
                                        LOWERVALUE= "0"
                                        color="0"
                                        saveModalDetails={this.saveModalDetails}
                                />


                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div> */}

 <div className="section-body">
            
 <div className="tab-content">
                <div className="tab-pane fade show active" id="list" role="tabpanel">
                    <div className="row clearfix" style={{marginTop:"-300px"}}>
                        <div className="col-lg-12">
                            <div className="table-responsive"  id="users">
                                <table style={{width:"75%", marginTop:"10px"}}> 
                                    <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
                                        <tr>
                                        <th style={{textTransform:"none", color:"#E5E5E5"}}>Enable/Disable</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Tag Name</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>High Limit</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Low Limit</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Current Value</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Marker Value</th>
                                    
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Edit</th>
                                        </tr>
                                    </thead> 
                                  <tbody>
                                   {this.state.chart.map((chart,i) => (
                                     <tr>
                                       
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0"}} > <input type="checkbox"  checked = {!this.myChart?.data?.datasets[i]?.hidden} onChange={() => this.hiddenOnClick(i)}  /> </td>
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{chart.POINTNAME}</label> </td>
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}> { this.state.ULarray[i] == null ? chart.UPPERVALUE :this.state.ULarray[i]?.UPPERVALUE}</label> </td>
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{ this.state.ULarray[i] == null ? chart.LOWERVALUE :this.state.ULarray[i]?.LOWERVALUE}</label> </td> 
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{this.state.Mvalue[i] ?? ""}
                                       {/* //  {chart.fvalue} */}
                                         </label>  </td>
                                       <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{chart.PENCOLOR}</label> </td>
                                       {/* <td style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{chart.PENCOLOR}</label> </td> */}
                                       <td style={{textAlign:"center", marginLeft:"0"}}>   <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" style={{backgroundColor:"#337ab7",width:"50px"}} onClick={() => this.replaceModalItem(i)} >Edit</button> </td>
                                   </tr>
))} 
                                        </tbody>
                                
                                </table>
                                <Modal 
                                        UPPERVALUE= "0"
                                        LOWERVALUE= "0"
                                        color={this.state?.chart[this.state.requiredItem]?.color}
                                        COLOR = {this.converAndroidColortoRGB("color")}
                                        POINTNAME = {this.state?.chart[this.state.requiredItem]?.POINTNAME}
                                        saveModalDetails={this.saveModalDetails}
                                />
      
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
 