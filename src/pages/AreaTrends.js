
import {Link} from 'react-router-dom'; 
import axios from 'axios'; 
import Moment from 'moment';
import { Chart } from "react-chartjs-2";
import React, { Component } from "react";
import { ScrollView } from "react-native";
import Modal from './Modal.js';


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
            ULarray:[],
            draw:[],
            Date: [],
            fvalue: [],
            editedIndexVaLUE: null,
            isGraphOn:true,
           timeInterval: 1000,
            currentDateTime: new Date().toLocaleString(),
            windowWidth : window.innerWidth,
            flag : false,
            //Default  window span is 5 min -- 5*60 =300
            currentWindowSpan :300,
            singlePoint :10,
            graphWidth:10,
            currentGroup:"",
            graphcolors:[],
            requiredItem: 0,
            baseUppervalue:100,
            baseLowervalue:0 ,
            logArray:[],
            pan :false,
            zoom:true,
            Mtime:[],
        };
} 


onHoverMethod(event, array) {
  var item = this.myChart.getElementAtEvent(event);
  console.log(item);
  if (item.length){
    //console.log("mouse on");
    console.log(this.myChart.data.labels[item[0]._index], this.myChart.data.datasets[0].data[item[0]._index])
    this.setState({
        Mtime : this.myChart.data.labels[item[0]._index],
    })
    this.myChart.data.datasets.forEach((datasets,i) => {
        console.log(this.myChart.data.datasets[i].data[item[0]._index])

    })
    
  }
}

componentDidMount() {
     axios.get('http://localhost/ScadaClient/api/GroupswithTrends?GroupName=').then(res => {
         console.log(res.data);
       
         this.setState({ name: res.data },()=>{

         console.log(this.state.name)
        
         //For Default Pupose
     
        {
          if(this.state.currentGroup == "")
          {      

            console.log(this.state.name[0]['CURTRENDTITLE'])
            this.setState({
           currentGroup :this.state.name[0]['CURTRENDTITLE']
          },() =>{
            this.logData()
            
          })
        } else{
          this.logData()
        }
      }
     
         });
         //this.saveModalDetails()
          
     });

     this.graph = [];
     this.draw=[];
     this.tagPointsArrays = [];
     this.tagPointLogLabels = [];

this.myChart = new Chart(this.chartRef.current, {
type: "line",
options: {
  scales: {
    
    yAxes: [{gridLines: { color: "white" }}]
    },
  title: {
    display: false,
    text: 'Current Trends'
  },
  maintainAspectRatio:false,
  response:true,
  zoomEnabled:true,
  animationEnabled: true,
  responsive:true,
  hover:{
    mode:'index',
    intersect:false,
  },
  onHover: this.onHoverMethod.bind(this),
  scales: {
    xAxes: [{
      distribution: 'linear',
       type: "time",
      time: {
       unit:"second",
      //   displayFormats: {
      // //    YYY-MM-DDThh:mm:ss
    //     minute: "YYY-MM HH:mm"
      //   }
      },
    }],
    yAxes: [{
      type: 'linear',
      display: true,
      gridLines: {
        zeroLineColor: 'white'
    },
      position:"right",
      scaleLabel: {
        display: true,
       // labelString: 'value'
      }, 
      ticks: {
        display:false,
        min: this.state.baseLowervalue,
        max: this.state.baseUppervalue
      },
    
    }],},
    tooltips: {
      mode: 'interpolate',
      intersect: false
    },
    pan: {
      enabled: this.state.pan,
      drag: true,
      mode: "x",
      // speed: 10,
      // threshold: 10
    },
    zoom: {
      enabled: this.state.zoom,
      drag: true,
      mode: "x",
      limits: {
        // max: 10,
        // min: 0.5
      },
      rangeMin: {
        // x: 0,
        // y: 0
      },
      rangeMax: {
        // x: 5,
        // y: 5
      }
    },
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        usePointStyle: true,
          fontColor: '#333'
      
    },
  
  }
 
}
});
}

async logData(){

  var tempararyforTagNames = []
  var api = 'http://localhost/ScadaClient/api/GroupwithTrendsTimestamp?GroupName='+this.state.currentGroup;
      
  console.log(api);
    axios.get(api)  
    .then(async(res) => {  
      //this.state.chart  is the Array of API data or Group DaTaa 
      tempararyforTagNames = res.data
      console.log(tempararyforTagNames.length)

    // var data = await  tempararyforTagNames.map((data)=>{
    //     this.tagPointsArrays.push([]);
    //     this.tagPointLogLabels.push([]);
    //   })

  //Log Data---------------------------------------
  axios.get('http://localhost/ScadaClient/api/GroupwithTrendsTimestamp?GroupName=/GroupswithTrends?GroupName='+this.state.currentGroup).then(res => {  
    this.setState({ logArray: res.data },async()=> {

      console.log(res.data.length)
  var result = await  this.state.logArray.map((log)=>{
    var name = log.POINTNAME
    
    for(var i=0;i<tempararyforTagNames.length;i++)
    {
      if(name == tempararyforTagNames[i].POINTNAME)
      {
  
         this.tagPointsArrays[i].push(log.fvalue)
       //  console.log(log)
        var logTime = Moment(log.timestamp).format('YYYY-MM-DDTHH:mm:ss')
       // console.log(logTime)
         this.tagPointLogLabels[i].push(logTime)
      }
    }

    // console.log(this.tagPointsArrays)
    // console.log("Length of single tag point before slice"+this.tagPointsArrays[0].length)
  })
    });


    console.log(this.tagPointsArrays)
    console.log(this.tagPointsArrays[0])
    console.log(this.tagPointLogLabels[0])
   this.trendsTagsaPI();
  this.timer = setInterval(() => this.trendsTagsaPI(),this.state.timeInterval);
    
    //this.saveModalDetails()
});
    })
}





singlePoint(){
  this.maxWidth = this.chartRef.current?.parentElement.offsetWidth ;
  const point = this.state.windowWidth / this.state.currentWindowSpan;
  // console.log( this.state.currentWindowSpan)
  // console.log( this.state.windowWidth)
  this.setState({
    singlePoint:point
  })
}


update() {

          if(this.state.currentDateTime != new Date().toLocaleString()){
            this.setState({
              currentDateTime :new Date().toLocaleString()
            });
          }

        var time = new Date().getTime();
         var logTime = Moment(time).format('YYYY-MM-DDTHH:mm:ss')
           // console.log(logTime)
          this.myChart.data.labels.push(logTime);
          // const min =1;
          // const max=100;
 
          this.myChart.data.datasets.forEach((dataset,i) => {
            // const lastValue = this.myChart.data.datasets[0].data[dataset.data.length-1];
            // console.log("value");
           // const value = this.myChart.data.labels.length;
             const rand = this.state.chart[i]['fvalue'];

            dataset.data.push(rand);
        });

        console.log("entered")
        console.log("entered")
        // this.singlePoint();

        // console.log("Chart Labels length"+this.myChart.data.labels.length);
        // console.log("Dataset Length"+this.myChart.data.datasets[0].data.length)

        if (this.myChart.data.labels.length > this.state.currentWindowSpan) {
          console.log("Scroll View Enteres");

          this.maxWidth = this.chartRef.current?.parentElement.offsetWidth ;
          const point = this.state.windowWidth / this.state.currentWindowSpan;
       const tempWidth = this.state.currentWindowSpan * point ;
     

        //  var maxWidth = this.chartRef.current.parentElement.offsetWidth;
    
          var width = tempWidth + this.state.singlePoint ;
        //  console.log(width)
    try{
      this.chartRef.current.parentElement.style.width = width + "px";
    }
    catch{
      console.log("Error in Accessing the PareneElemenet");
    }
     
    
     //  this.setState({graphWidth:width})
     this.ScrollView.scrollTo({x:width});
    
        }  

       this.myChart.update();    
       
}



//Assigning Datasets with the help od userINput and Api-----
trendsTagsaPI(){       

      var api = 'http://localhost/ScadaClient/api/GroupwithTrendsTimestamp?GroupName='+this.state.currentGroup;
      
     // console.log(api);
        axios.get(api)  
        .then(res => {  
          //condition to check the flag is true or false, if true -> update only fvalues, if false --> update all values fvalue, upper lower, pencolor 
          if(this.state.flag==false)
          {
          //this.state.chart  is the Array of API data or Group DaTaa 
             this.setState({chart: res.data},()=>{
               const val = [];
               const label = [];
             
              // console.log(this.state.chart.length)

               if(this.myChart.data.datasets.length !=  this.state.chart.length)
               {
                // var UPPERVALUE = [...this.state.chart].sort((a, b) => b['UPPERVALUE']- a['UPPERVALUE']) 
                // console.log(UPPERVALUE[0]['UPPERVALUE'])

                // var LOWERVALUE = [...this.state.chart].sort((a,b) => a['LOWERVALUE'] - b['LOWERVALUE'])
                // console.log(LOWERVALUE[0]['LOWERVALUE'])
                 //Running loop to get the Color values and Poinanems 
            for(var i=0;i<this.state.chart.length;i++)
            {

              this.draw.push(null)

              const color = this.state.chart[i]['PENCOLOR'];
      
              //Converting colors to hexRGB COlor
              const [, alpha, ...colorArray] = ('00000000' + color.toString(16)).slice(-8).match(/([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i)
           var   hexARGBColor =  `#${colorArray.join('')}${alpha}`
            
         //  console.log(hexARGBColor);
           this.graph.push( hexARGBColor);
          
          //
          //  var color1=this.draw[i]
          // console.log(color1)
          
            
              val.push( {                
                fill:false, 
                // label :this.state.histS[i][0].pointname ,        
                label :this.state.chart[i]['POINTNAME'],
                   //fillColor :this.draw[i]== null ? hexARGBColor:this.draw[i],
                   // strokeColor : "rgba(220,220,220,1)",
                   // pointColor : "rgba(220,220,220,1)",
                   // pointStrokeColor : "#fff",
                   borderColor :hexARGBColor,
                                   //backgroundColor:this.draw[i]== null ? hexARGBColor:this.draw[i],
                   pointRadius:0.0,
                   hidden:false,
                  
                   borderWidth:1.5,
                 //   data : this.tagPointsArrays[i],
                 data : [],
                  yAxisID:"yAxis"+[i]
                },
              )


              this.myChart.options.scales.yAxes.push({
                type:"linear",
                display:true,
                position:"right",
                id:"yAxis"+[i],
                scaleLabel :{
                  display:false,
                  labelString:"Value"
                },

                ticks:{
                  maxTicksLimit:10,
                  display:true,
                  fontColor:hexARGBColor,
                  // min:LOWERVALUE[0]['LOWERVALUE']  ,          
                  //  max:UPPERVALUE[0]['UPPERVALUE']
                  min:this.state.chart[i]['LOWERVALUE'],
                  max:this.state.chart[i]['UPPERVALUE'],
                },
                gridLines: {
                  drawOnChartArea: false,
                  display: true,
                },
            }) 
    
            } 
         //   console.log(this.graph.length);
          // console.log(this.tagPointLogLabels[0])
          
             //  this.myChart.data.labels = this.tagPointLogLabels[0];
             this.myChart.data.labels = [];
            this.myChart.data.datasets = val;
            //    this.myChart.options.scales.yAxes[0].ticks.min = LOWERVALUE[0]['LOWERVALUE'];
            // this.myChart.options.scales.yAxes[0].ticks.max = UPPERVALUE[0]['UPPERVALUE'];
            this.myChart.update();

          //  console.log(this.myChart.data.labels)
          }
          //  console.log(this.myChart.data.datasets.length);
             this.myChart.options.scales.yAxes[0].display = false
                  

              this.update();
          
             }        )}
             else{
             this.temp = this.state.chart   
              for(var i=0;i<this.state.chart.length;i++){
                this.temp[i]["fvalue"]= res.data[i]["fvalue"]
              }
              this.setState({
                chart:this.temp
              })


              this.myChart.options.scales.yAxes[0].display = false
                  

              this.update();
             }  
            })
}




//Curretn Group DropDown OnClick-----------------
handleSelectedGroupDropDOwn = (e) =>
{
console.log("DropdoWNclicked");
var  value = e.target.value ;
console.log(value);

// if (this.state.currentGroup)
// {
//   clearInterval(this.timer);
//   this.timer = setInterval(() => this.update(),this.state.timeInterval);
// }
// else{
//   clearInterval(this.mainTimer);

//   this.setState({currentGroup :value},() => {
//     console.log(this.state.currentGroup);
   
//     this.mainTimer = setInterval(() => this.trendsTagsaPI(),this.state.timeInterval);
//    // this.trendsTagsaPI();
//   })
// } 

if(value == this.state.currentGroup)
{

}else{

  clearInterval(this.timer)
  this.myChart.data.labels = [];
  this.myChart.data.datasets = [];
  this.tagPointLogLabels = [];
  this.tagPointsArrays = [];
  this.myChart.options.scales.yAxes = [];
  this.myChart.update();
  
  
  this.setState({
    chart:[]
  });
  
  this.setState({
    flag:false
  });

  this.setState({currentGroup :value},() => {
    console.log(this.state.currentGroup);
   
   this.componentDidMount();
  })

}
  //this.myChart.update() ;
}
/////marker time



//Start and Stop Button ------------------
handleStopButtonOnClick = (e) =>
{
console.log("Stop&Resume Butto Clicked");
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
    this.timer = setInterval(() => this.update(),this.state.timeInterval);
  })

}

//Hidden Clicked------------
hiddenOnClick = (e) =>{
  console.log("hidden Selected");

  console.log(e);
  this.myChart.data.datasets[e].hidden  = !this.myChart.data.datasets[e].hidden
}




//Window Span Handler---
WIndowSpanhandler = (e) => {
  console.log("WIndow SPan CLicked");
  const val = e.target.value;
  clearInterval(this.timer)
  this.setState({currentWindowSpan:val*60},() => {
    this.timer = setInterval(() => this.update(),this.state.timeInterval);
  })
  
  console.log(this.state.currentWindowSpan)
}

replaceModalItem = (e) =>{
  this.setState({
    requiredItem: e
  });
  console.log("edit button clicked")
  console.log(e)

  this.setState({
    editedIndexVaLUE : e
  },()=>{

    console.log("Before Editing------------------------")
    console.log(this.state.chart[this.state.editedIndexVaLUE]);
  
  })


}



saveModalDetails(item) {
  console.log(item);
  console.log(item.color)
  console.log(item.UPPERVALUE)

  console.log(this.state.editedIndexVaLUE)

    

  
  function componentToHex(c) {
    if ( c != undefined){
      let hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
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
    this.draw[this.state.editedIndexVaLUE] = color;
    this.myChart.data.datasets[this.state.editedIndexVaLUE].borderColor  = color;
    this.myChart.options.scales.yAxes[this.state.editedIndexVaLUE+1].ticks.fontColor=color;
 
  }
}

  

  console.log(this.state.draw)
if (item.UPPERVALUE !="" && item.LOWERVALUE !=""){
  const requiredItem = this.state.requiredItem;
  let tempbrochure = this.state.ULarray;
  tempbrochure[requiredItem] = item;
  this.setState({ item: tempbrochure });


  this.temp  = this.state.chart;
  console.log(this.temp[this.state.editedIndexVaLUE]['LOWERVALUE']);

  this.temp[this.state.editedIndexVaLUE]['LOWERVALUE'] = Number(item.LOWERVALUE);
  this.temp[this.state.editedIndexVaLUE]['UPPERVALUE'] = Number(item.UPPERVALUE);


  console.log(  this.temp[this.state.editedIndexVaLUE]['UPPERVALUE'])
 this.setState({ chart:this.temp });
 console.log(this.state.chart[this.state.editedIndexVaLUE]['LOWERVALUE'])
 this.setState({});
 

}
 this.setState({
   flag: true
 })

if (item.UPPERVALUE !="" && item.LOWERVALUE !=""){
  //if (item.LOWERVALUE  = 0 || item.UPPERVALUE = 0){
    
  this.myChart.options.scales.yAxes[this.state.requiredItem+1].ticks.max  = Number(item.UPPERVALUE);
  this.myChart.options.scales.yAxes[this.state.requiredItem+1].ticks.min = Number(item.LOWERVALUE);
  
  this.myChart.options.scales.yAxes[0].ticks.max  = Number(item.UPPERVALUE);
  this.myChart.options.scales.yAxes[0].ticks.min = Number(item.LOWERVALUE);

 
   // this.state.chart[this.state.requiredItem]['LOWERVALUE'] : item.LOWERVALUE);
}
  this.myChart.options.scales.yAxes.map((value,i)=>{
    if(i!=this.state.requiredItem+1)
    {
    //  value.display = false;
    }else{
     // value.display = true;

     // value.ticks.display = false;
    }
  
  })

  this.myChart.options.scales.yAxes[0].display = "true"
  this.myChart.update();
    console.log(this.state.ULarray)
}

ResetToDefaults = (e) =>{
  console.log("Reset to Defaults")
  this.draw = [];
  this.setState({})

}

RowClicked = (e) =>{
  console.log("ROw Clicked")
 
  if(this.state.ULarray[e])
  {
    console.log(this.state.ULarray[e].UPPERVALUE)
    console.log(this.state.ULarray[e].LOWERVALUE)
   
    this.myChart.options.scales.yAxes[0].ticks.max = Number(this.state.ULarray[e].UPPERVALUE);
    this.myChart.options.scales.yAxes[0].ticks.min = Number(this.state.ULarray[e].LOWERVALUE);
    this.myChart.update();

  }else{
    console.log("Entered Else")
    this.myChart.options.scales.yAxes[0].ticks.max = this.state.chart[e].UPPERVALUE;
    this.myChart.options.scales.yAxes[0].ticks.min = this.state.chart[e].LOWERVALUE;
    this.myChart.update();
    
   // var highvalue = this.state
  }
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

//RestGraph-----------------------------------------------------------
ResetZoomhandleStopButtonOnClick = (e) => {
  console.log("Reset Graph Clicked");
 // clearInterval(this.timer);
  this.myChart.resetZoom();
}


    render(){

      let stopButton = (this.state.isGraphOn == true)?
      <button className="btn btn-primary" style={{backgroundColor:"#337ab7"}} onClick={this.handleStopButtonOnClick}>StopGraph</button>:
      <button className="btn btn-primary" style={{backgroundColor:"#337ab7"}} onClick={this.handleStopButtonOnClick}>Resume</button>
      
        const requiredItem = this.state.requiredItem;
        let modalData = this.state.chart[requiredItem];

        let  pan =   <button   className="btn btn-primary" onClick={this.panOnClick} style={{backgroundColor:this.state.pan == true ? "green" : "red"}}>Pan</button>
    let zoom  =  <button   className="btn btn-primary" onClick={this.panOnClick} style={{backgroundColor:this.state.zoom == true ? "green" : "red"}}>Zoom</button>
    

    return(
        <body className="font-montserrat">

<div id="main_content" >

    <div className="page">
    <div class="section-body">
            <div class="container-fluid">
                <div class="row clearfix">
                    <div class="col-lg-12">
                        <div class="d-lg-flex justify-content-between">
                            <ul class="nav nav-tabs page-header-tab">
                                <li class="nav-item"><Link to="/AreaTrends" class="nav-link active show" data-toggle="tab" href="#Area_Charts">Trends</Link></li>

                                <li class="nav-item"><Link to="/HistTrends" class="nav-link " data-toggle="tab" href="#Email_Settings">Historic Trends</Link></li>
                                
                                <li class="nav-item"><Link to="/TabularTrends" class="nav-link " data-toggle="tab" href="#Change_Password">Tabular Trends </Link></li>
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
        
        {/* //Groups DropDown------------------------- */}
               <select className="custom-select" onChange={this.handleSelectedGroupDropDOwn} >
              
                {this.state.name.map(name => (
                  <option  value={name.CURTRENDTITLE}>
                    {name.CURTRENDTITLE} 
                  </option>
                ))} 
                
              </select>
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
                                    <div class="dropdown" style={{marginRight:"34px"}}>
                                    <button className="custom-select" id="dropbtn">Trends in Area</button>
                                    <div class="dropdown-content">
                                       
                                        <Link to="/LineTrends">Trends in Line</Link>
                                        <Link to="/BarTrends">Trends in Bar</Link>                                     
                                       
                                    </div>
                                </div>
					
			
                                    
                                </div>
                            </div>
                            
                        </div>                
                    </div>
                    
              </div>  
              </div>
</div>
         
         
<div className="section-body" style={{background:"white"}}>
         <div className="tab-content" style={{marginBottom:"300px"}}>
                {/* <div className="tab-pane fade show active" id="list" role="tabpanel"> */}
                <div className="col-lg-12" style={{position:"relative"}}>
            
              <ScrollView style={{height:"660px"}} ref={(ref) => {
                this.ScrollView = ref;
              }}>

               <canvas id="chartjs" 
              ref={this.chartRef} height="650px"></canvas>
              </ScrollView>
     

               {/* //</div> */}

               <div className="section-body">
                <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-xl-12 col-lg-12">
                    <div class="row" style={{marginTop:"20px"}}>
                    
                    <div className="col-xs-6 col-md-2" class="dropdown"  style={{marginRight:"100px"}}>
                                         
                                              <label >Sample Rate :</label>
                                             <select id="SAmpleRate" onChange={this.handleSampleRateChange}>
                                               <option value="1">1 Sec</option>
                                               <option value="2">2 Sec</option>
                                               <option value="3">3 Sec</option>
                                               <option value="5">5 Sec</option>
                                               <option value="5">10 sec</option>

                                             </select>
                      
                                         </div>
                 
                                     
                   {/* <div className="col-xs-6 col-md-2" style={{marginLeft:"-70px"}}>
                   Window Span(min) :
              
                                             <select id="Window Span" onChange={this.WIndowSpanhandler}>
                                               <option   value="1">1 Min</option>
                                               <option selected="selected" value="2">2 Min</option>
                                               <option value="3">3 Min</option>
                                               <option  value="5">5 Min</option>
                                               <option value="10">10 Min</option>

                                             </select>
                
                 </div> */}

                       
                                        
                 <div style={{marginLeft:"20px"}}>   
                                  
                    <label>Marker Time:  {this.state.Mtime}</label> 
                </div>
                    {/* <div> 
                        <input style={{width:"220px", marginLeft:"10px"}} type="text" name="name" ></input>   
                      </div> */}
              
                 <div  style={{marginLeft:"50px", color:"white"}}>{stopButton}
                 
                 </div>
                 {zoom}
                 {pan}

                <button className="btn btn-primary" style={{marginLeft:"50px", color:"white", height:"35px", backgroundColor:"rgb(51, 122, 183)"}} onClick={this.ResetZoomhandleStopButtonOnClick}>Reset Zoom</button>

                  <button className="btn btn-primary" style={{marginLeft:"50px", color:"white", height:"35px", backgroundColor:"rgb(51, 122, 183)"}} onClick={this.ResetToDefaults}>Reset to Defaults</button>
              
                 <div style={{marginLeft:"50px",marginTop:"0px", fontWeight:"bold", fontSize:"15px"}}>{Moment(this.state.currentDateTime).format('YYYY-MM-DDTHH:mm:ss')}</div>
                 
              
                 </div>     
                    </div>
                    
              </div>  
              </div>
</div>

</div></div></div>

<div className="section-body">
            
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
                                     <tr >
                                       
                                       <td style={{textAlign:"-webkit-center",width:"10px"}} > <input type="checkbox"  checked = {!this.myChart?.data?.datasets[i]?.hidden} onChange={() => this.hiddenOnClick(i)}  /> </td>
                                       <td onClick={() => this.RowClicked(i)} style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{chart.POINTNAME}</label> </td>
                                       <td onClick={() => this.RowClicked(i)} style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}> {  chart.UPPERVALUE }</label> </td>
                                       <td onClick={() => this.RowClicked(i)} style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{  chart.LOWERVALUE }</label> </td> 
                                       <td onClick={() => this.RowClicked(i)}style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{chart.fvalue}</label>  </td>
                                       <td onClick={() => this.RowClicked(i)} style={{textAlign:"-webkit-center", marginLeft:"0",color:this.draw[i]== null ? this.graph[i]:this.draw[i]}}>  <label  key={chart}>{chart.PENCOLOR}</label> </td>
                                       <td style={{textAlign:"center", marginLeft:"0"}}>   <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" style={{backgroundColor:"#337ab7",width:"50px"}} onClick={() => this.replaceModalItem(i)} >Edit</button> </td>
                                     </tr>
                                     ))}
                                    </tbody>
                                </table>
                    
                                <Modal 
                                        UPPERVALUE= "0"
                                        LOWERVALUE= "0"
                                        color="0"
                                        POINTNAME = {this.myChart?.data.datasets[this.state.requiredItem]?.label}
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
