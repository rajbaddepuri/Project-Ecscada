import { useState } from "react";
import axios from "axios";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Button, Modal } from "react-bootstrap";
import "reactjs-popup/dist/index.css";
import Blink from 'react-blink-text';

const TIME_RANGE_IN_MILLISECONDS = 300 * 1000;
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
const ADDING_DATA_RATIO = 0.8;

const ChartSpace = () => {
  const nameList = ["Tag 1", "Tag 2"];
  const lineColors = ["#FEB019", "#008FFB"];


  //UseState for SampleRate
  const [sampleRate, setSampleRate] = React.useState(1000);
  //UseState for ToStoptheGraph
  const [isGraphStopped, stopGraph] = React.useState(false);

  //Data to be taken when Clicking Edit Button
  const [selectedTagData, SetSelectedTagData] = React.useState({
    color: "",
    upperValue: "",
    lowerValue: "",
  });

  //Model UseStates
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //Function 1
  const handleShow = (value) => {
    console.log(value);
    SetSelectedTagData(value);
    setShow(true);
  };

  //Function 2
  const onSave = (value) => {
    console.log(value);


    // var data  =chartOptions;
    // data.yaxis[0].max = 50;
    // data.yaxis[0].min = 10;

    // setChartOptions({data});

    setChartOptions({

      yaxis: [
        {
          ...chartOptions.yaxis[0],
          max:50,
          min:10
        } , {
          ...chartOptions.yaxis[1],
          max:80,
          min:20
        }
      ]
    })  
    setShow(false);
  };

  //AppexCharts Options---
  const options = {
    chart: {
      zoom: {
        enabled: true,
      },

      animations: {
        enabled: true,
        easing: "easein",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    title: {
      text: "Current Trends ",
      align: "left",
      offsetX: 110,
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yyyy hh:mm:ss",
      },
    },

    xaxis: {
      type: "datetime",
      range: 60 * 1000,
    },
    yaxis: nameList.map((v, i) => {
      return {
        seriesName: "Revenue",
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: lineColors[i],
        },
        labels: {
          show: true,
          style: {
            colors: lineColors[i],
          },
        },
        // title: {
        //   text: v,

        //   style: {
        //     color: lineColors[i],
        //   },
        // },
        min: 0,
        max: 100,
      };
    }),
  };



  //this will generate default chart Series Data-----
  const defaultDataList = nameList.map((name, i) => ({
    name: name,
    data: [
      //  {x: new Date()getMilliseconds-1,y:30.95}
    ],
    color: lineColors[i],
  }));



  //UseState for ChartSeries Data
  const [dataList, setDataList] = React.useState(defaultDataList);

  //UseState for ChartOPtions Data
  const [chartOptions, setChartOptions] = React.useState(options);




  //UseEffect 
  React.useEffect(() => {
    //AddDataRandomly  Function------------------
    const addDataRandomly = (data) => {
      // if (Math.random() < 1 - ADDING_DATA_RATIO) {
      //   return data;
      // }
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);

      return [
        ...data,
        {
          x: new Date().toLocaleString(),
          y: parseInt(rand, 10),
        },
      ];
    };

    //Timer for Every Selected Time Interval
    const interval = setInterval(() => {
      setDataList(
        dataList.map((val) => {
          //   console.log(addDataRandomly(val.data));
          return {
            name: val.name,
            data: addDataRandomly(val.data),
          };
          
        })
      );

      //   console.log(dataList[0].data[dataList[0].data.length-1]?.y)
    }, sampleRate);

    return () => clearInterval(interval);
  });



  return (
    <div className="page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 col-xs-7 green">
          <br></br>
          <div class="card text-black bg-light mb-3">
            {/* <div class="card-header">Graph</div> */}
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-xs-7 green">
                  <div id="chart">
                    <div id="chart-timeline">
                      <ReactApexChart
                        height={450}
                        type="line"
                        options={chartOptions}
                        series={dataList}
                      />
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-xs-7">
                  <label>start/stop: </label> &nbsp; &nbsp;
                  <button
                    id="all"
                    onClick={() => {
                      stopGraph(!isGraphStopped);
                      
                    }}
                    // className={this.state.selection === "all" ? "active" : ""}
                  >
                    {isGraphStopped ? "Start" : "Stop"}
                  </button>
                </div>
                <div class="col-md-3 col-xs-7">
                  <div class="toolbar">
                    <label>Window Span: </label> &nbsp; &nbsp;
                    <button
                      id="one_month"
                      onClick={() => {
                        //setWindowSpan(60),
                        setChartOptions({...chartOptions,xaxis:{
                        range:60*1000

                        }})
                      
                      }}
                      // className={this.state.selection === "one_month" ? "active" : ""}
                    >
                      1M
                    </button>
                    &nbsp;
                    <button
                      id="six_months"
                      onClick={() => {
                        setChartOptions({...chartOptions,xaxis:{
                          range:120*1000
  
                          }})
                      }}
                      // className={this.state.selection === "six_months" ? "active" : ""}
                    >
                      2M
                    </button>
                    &nbsp;
                    <button
                      id="one_year"
                      onClick={() => setChartOptions({...chartOptions,xaxis:{
                        range:180*1000

                        }})}
                      // className={this.state.selection === "one_year" ? "active" : ""}
                    >
                      3M
                    </button>
                    &nbsp;
                    <button
                      id="ytd"
                      onClick={() => setChartOptions({...chartOptions,xaxis:{
                        range:300*1000
                        }})}
                      // className={this.state.selection === "ytd" ? "active" : ""}
                    >
                      5M
                    </button>
                  </div>
                </div>
                <div class="col-md-3 col-xs-7">
                  <label>Sample Rate: </label> &nbsp; &nbsp;
                  <button
                    id="one_month"
                    onClick={() => setSampleRate(1000)}
                    // className={this.state.selection === "one_month" ? "active" : ""}
                  >
                    1s
                  </button>{" "}
                  &nbsp;
                  <button
                    id="one_month"
                    onClick={() => setSampleRate(2000)}
                    // className={this.state.selection === "one_month" ? "active" : ""}
                  >
                    2s
                  </button>{" "}
                  &nbsp;
                  <button
                    id="one_month"
                    onClick={() => setSampleRate(3000)}
                    // className={this.state.selection === "one_month" ? "active" : ""}
                  >
                    3s
                  </button>{" "}
                  &nbsp;
                  <button
                    id="one_month"
                    onClick={() => setSampleRate(5000)}
                    // className={this.state.selection === "one_month" ? "active" : ""}
                  >
                    5s
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-10 col-xs-7 green">
          {/* <button onClick={this.handleClick}>
    HI  USER!
 </button><br/>   */}

          <table class="table table-bordered" >
            <th scope="col">Name</th>
            <th scope="col">HigherValue</th>
            <th scope="col">LowerValue</th>
            <th scope="col">FValue</th>
            <th scope="col">LastUpdated</th>
            <th scope="col">Edit</th>

            <tr style={{height:50}}>
              
              <td style={{ color: "#FEB019" }}><Blink color='red' text={nameList[0]} fontSize='20'>
          
          </Blink> </td>
              <td style={{ color: "#FEB019" }}><Blink color='red' text={chartOptions.yaxis[0].max} fontSize='20'>
          
          </Blink></td>
              <td style={{ color: "#FEB019" }}><Blink color='red' text={chartOptions.yaxis[0].min} fontSize='20'>
          
          </Blink></td>
              <td style={{ color: "#FEB019" }}>
              <Blink color='red' text={dataList[0].data[dataList[0].data.length - 1]?.y} fontSize='20'>
          
          </Blink>
              </td>
              <td style={{ color: "#FEB019" }}>
              <Blink color='red' text={dataList[1].data[dataList[1].data.length - 1]?.x} fontSize='20'>
          
          </Blink>
              </td>
              {/* <td>
                
                <button
                  onClick={() =>
                    handleShow({
                      color: "#FEB019",
                      upperValue: options.yaxis[0].max,
                      lowerValue: options.yaxis[0].min,
                    })
                  }
                  style={{ background: "#FEB019" }}
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </button>
              </td> */}
            </tr>

           </table>
        </div>
      </div>
      <>
        <MyVerticallyCenteredModal
          show={show}
          tagData={selectedTagData}
          onHide={() => setShow(false)}
          onSave={() => onSave("Saved")}
        />
      </>
    </div>
    </div>
  );
};

export default ChartSpace;

{
  /* <div class="toolbar">
        <button
          id="one_month"
          // onClick={() => this.updateData("one_month")}
          // className={this.state.selection === "one_month" ? "active" : ""}
        >
          1M
        </button>
        &nbsp;
        <button
          id="six_months"
          // onClick={() => this.updateData("six_months")}
          // className={this.state.selection === "six_months" ? "active" : ""}
        >
          6M
        </button>
        &nbsp;
        <button
          id="one_year"
          // onClick={() => this.updateData("one_year")}
          // className={this.state.selection === "one_year" ? "active" : ""}
        >
          1Y
        </button>
        &nbsp;
        <button
          id="ytd"
          // onClick={() => this.updateData("ytd")}
          // className={this.state.selection === "ytd" ? "active" : ""}
        >
          YTD
        </button>
        &nbsp;
        <button
          id="all"
          // onClick={() => this.updateData("all")}
          // className={this.state.selection === "all" ? "active" : ""}
        >
          ALL
        </button>
      </div> */
}

{
  /* <button
          id="all"
           onClick={() =>{
             stopGraph(!isGraphStopped)
           }}
          // className={this.state.selection === "all" ? "active" : ""}
        >
      {isGraphStopped ?   "Start"  : "Stop"}
        </button> */
}

function MyVerticallyCenteredModal(props) {
  const [upperValue, setUpperValue] = React.useState(
    props.tagData["upperValue"]
  );
  const [lowerValue, setLowerValue] = React.useState(
    props.tagData["lowerValue"]
  );

  return (
    <Modal show={props.show} onHide={props.onHide} size="small" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.tagName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="form-group">
          UpperValue
          <input
            type="text"
            class="form-control"
            placeholder={props.tagData["upperValue"]}
            onChange={(e) => {
              setUpperValue(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          LowerValue
          <input
            type="text"
            class="form-control"
            placeholder={props.tagData["lowerValue"]}
            onChange={(e) => {
              setLowerValue(e.target.value);
            }}
          />
        </div>
        <label for="inputEmail">Select Pen Color : </label> &nbsp; &nbsp;
        <button
          type="submit"
          style={{ background: props.tagData["color"] }}
          class="btn btn-primary"
        >
          Color
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// import { useState } from "react";
// import axios from "axios";
// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
// const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
// const ADDING_DATA_RATIO = 0.8;

// const ChartSpace = () => {
//   const nameList = ["Tag 1", "Tag 2"];
//   const lineColors = ["#FEB019", "#008FFB"];
 

//   const options = {
//     chart: {
//       zoom: {
//         enabled: true,
//       },
//       animations: {
//         enabled: true,
//         easing: "linear",
//         dynamicAnimation: {
//           speed: 1000,
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       width: [2, 2],
//       curve: "straight",
//     },
//     title: {
//       text: "XYZ - Current Trends ",
//       align: "left",
//       offsetX: 110,
//     },
//     grid: {
//       row: {
//         colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
//         opacity: 0.5,
//       },
//     },
//     tooltip: {
//       x: {
//         format: "yyyy/MM/dd HH:mm:ss.f",
//       },
//     },

//     xaxis: {
//       type: "datetime",
//       range: TIME_RANGE_IN_MILLISECONDS,
//     },
//     yaxis: nameList.map((v, i) => {
//       return {
//         seriesName: "Revenue",
//         axisTicks: {
//           show: true,
//         },
//         axisBorder: {
//           show: true,
//           color: lineColors[i],
//         },
//         labels: {
//           style: {
//             colors: lineColors[i],
//           },
//         },
//         title: {
//           text: v,
//           style: {
//             color: lineColors[i],
//           },
//         },
//         min: 0,
//         max: 100,
//       };
//     }),
//   };

//   const defaultDataList = nameList.map((name, i) => ({
//     name: name,
//     data: [
//       //  {x: new Date()getMilliseconds-1,y:30.95}
//     ],
//     color: lineColors[i],
//   }));

//   const [dataList, setDataList] = React.useState(defaultDataList);
//   const [isGraphStopped, stopGraph] = React.useState(false);

  

//   React.useEffect(() => {
//     //AddDataRandomly  Function------------------
//     const addDataRandomly = (data) => {
//       if (Math.random() < 1 - ADDING_DATA_RATIO) {
//         return data;
//       }

//       const min = 1;
//       const max = 100;

//       const rand = min + Math.random() * (max - min);

//       return [
//         ...data,
//         {
//           x: new Date(),
//           y: parseInt(rand, 10),
//         },
//       ];
//     };

//     const interval = setInterval(() => {
//       setDataList(
//         dataList.map((val) => {
//           return {
//             name: val.name,
//             data: addDataRandomly(val.data),
//           };
//         })
//       );
//     }, ADDING_DATA_INTERVAL_IN_MILLISECONDS);

//     return () => clearInterval(interval);
    
//   });
//  function stopbutton(){
//  setDataList(null)

//   }

//   return (
//     <div id="chart">
//       {/* <div class="toolbar">
//         <button
//           id="one_month"
//           // onClick={() => this.updateData("one_month")}
//           // className={this.state.selection === "one_month" ? "active" : ""}
//         >
//           1M
//         </button>
//         &nbsp;
//         <button
//           id="six_months"
//           // onClick={() => this.updateData("six_months")}
//           // className={this.state.selection === "six_months" ? "active" : ""}
//         >
//           6M
//         </button>
//         &nbsp;
//         <button
//           id="one_year"
//           // onClick={() => this.updateData("one_year")}
//           // className={this.state.selection === "one_year" ? "active" : ""}
//         >
//           1Y
//         </button>
//         &nbsp;
//         <button
//           id="ytd"
//           // onClick={() => this.updateData("ytd")}
//           // className={this.state.selection === "ytd" ? "active" : ""}
//         >
//           YTD
//         </button>
//         &nbsp;
//         <button
//           id="all"
//           // onClick={() => this.updateData("all")}
//           // className={this.state.selection === "all" ? "active" : ""}
//         >
//           ALL
//         </button>
//       </div> */}

//       <div id="chart-timeline">
//         <ReactApexChart
//           height={550}
//           type="line"
//           options={options}
//           series={dataList}
//         />

//        <button
//           id="all"
//           onClick={stopbutton}
//         >
//        Start
//         </button>
//         <button
//           id="all"
//            onClick={() =>{
//             setDataList(dataList)
//            }}
//           // className={this.state.selection === "all" ? "active" : ""}
//         >
//       stop
//         </button>
//         {/* <Chart
//     options={chartOptionsBrush}
//     series={dataList}
//     type="area"
//     height="130"
//   /> */}
//       </div>
//     </div>
//   );
// };

// export default ChartSpace;
