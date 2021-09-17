import { useState } from "react";
import axios from "axios";
import React from "react";
import ReactApexChart from "react-apexcharts";

import "reactjs-popup/dist/index.css";
import MyVerticallyCenteredModal from "./Model/model";
import Blink from 'react-blink-text';

const TIME_RANGE_IN_MILLISECONDS = 300 * 1000;
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
const ADDING_DATA_RATIO = 0.8;

var tempDataPoints = [{ name: "", data: [], color: "" }];

const ChartSpace = () => {
  const nameList = ["Tag 1", "Tag 2"];
  const lineColors = ["#FEB019", "#008FFB"];

  //UseState for SampleRate
  const [sampleRate, setSampleRate] = React.useState(1000);
  //UseState for ToStoptheGraph
  const [isGraphStopped, stopGraph] = React.useState(false);

  //Data to be taken when Clicking Edit Button
  const [selectedTagData, SetSelectedTagData] = React.useState({
    tagName: "",
    axisIndex: 0,
    color: "",
    upperValue: "",
    lowerValue: "",
  });

  //State variable for stop/start validation----
  const [length, setLength] = useState(0);

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
    console.log("Clicked");
    console.log(value);

    console.log(chartOptions.yaxis.length);

    setChartOptions({
      yaxis: chartOptions.yaxis.map((axis, i) => {
        if (value.axisIndex == i) {
          return {
            ...chartOptions.yaxis[i],
            axisBorder: {
              show: true,
              color: value.color,
            },
            labels: {
              show: true,
              style: {
                colors: value.color.toString(),
              },
            },
            max: parseInt(value.upperValue),
            min: parseInt(value.lowerValue),
          };
        } else {
          return {
            ...axis,
          };
        }
      }),
    });

    setDataList(
      dataList.map((list, i) => {
        if (value.axisIndex == i) {
          return {
            ...list,
            color: value.color,
          };
        } else {
          return {
            ...list,
          };
        }
      })
    );

    setShow(false);
  };

  //AppexCharts Options---
  const options = {
    chart: {
      //Display the toolbar / menu in the top right corner.
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
        autoSelected: true,
        //zoom
        //pan
        //selection
      },
      zoom: {
        
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
        
        zoomedArea: {
          fill: {
            color: "#90CAF9",
            opacity: 0.4,
          },
          stroke: {
            color: "#0D47A1",
            opacity: 0.4,
            width: 1,
          },
        },
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
      curve: ["smooth", "smooth"],
      //smooth,straight,stepline
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
    
     labels: {
        datetimeUTC: false,
        // format: 'HH:mm',
       }

      
    },
    yaxis: nameList.map((v, i) => {
      return {
        seriesName: v,
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
      //isGraphStopped is  equal to false
      if (!isGraphStopped) {
        console.log("Graph is Active", length);
        //Validation to plot points to graph even the chart is stopped
        if (length != 0) {
          setDataList(tempDataPoints);
          setLength(0);
          console.log("Length is", length);
        } else {
          setDataList(
            dataList.map((val) => {
              return {
                name: val.name,
                data: addDataRandomly(val.data),
                color: val.color,
              };
            })
          );
        }
      } else {
        console.log("Graph Stopped");
        //Validation to plot points to graph even the chart is stopped
        if (length == 0) {
          console.log(dataList);
          tempDataPoints = dataList;
          console.log(tempDataPoints);
          setLength(dataList.length);
        }
        console.log(tempDataPoints);
        tempDataPoints = tempDataPoints.map((val) => {
          //   console.log(addDataRandomly(val.data))
          return {
            name: val.name,
            data: addDataRandomly(val.data),
            color: val.color,
          };
        });
      }
    }, sampleRate);

    return () => clearInterval(interval);
  });

  return (
    <div class="page">
      <div class="row">
        <div class="col-md-12 col-xs-7 ">
          <br></br>
          <div class="card text-black bg-light mb-3">
            {/* <div class="card-header">Graph</div> */}
            <div class="card-body">
              {/* Chart---------------------------------------------- */}
              <div class="row">
                <div class="col-md-12 col-xs-7 ">
                  <div id="chart">
                    <div id="chart-timeline">
                      <ReactApexChart
                        height={window.screen.height / 2}
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
                <div class="col-md-4" style={{ textAlign: "right" }}>
                  {/* //   <div style={{textAlign:"right"}}> */}
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
                  {/* </div> */}
                </div>

                <div class="col-md-4" style={{ textAlign: "right" }}>
                  <div class="toolbar">
                    <label>Window Span: </label> &nbsp; &nbsp;
                    <button
                      id="one_month"
                      onClick={() => {
                        //setWindowSpan(60),
                        setChartOptions({
                          ...chartOptions,
                          xaxis: {
                            range: 60 * 1000,
                          },
                        });
                      }}
                      // className={this.state.selection === "one_month" ? "active" : ""}
                    >
                      1M
                    </button>
                    &nbsp;
                    <button
                      id="six_months"
                      onClick={() => {
                        setChartOptions({
                          ...chartOptions,
                          xaxis: {
                            range: 120 * 1000,
                          },
                        });
                      }}
                      // className={this.state.selection === "six_months" ? "active" : ""}
                    >
                      2M
                    </button>
                    &nbsp;
                    <button
                      id="one_year"
                      onClick={() =>
                        setChartOptions({
                          ...chartOptions,
                          xaxis: {
                            range: 180 * 1000,
                          },
                        })
                      }
                      // className={this.state.selection === "one_year" ? "active" : ""}
                    >
                      3M
                    </button>
                    &nbsp;
                    <button
                      id="ytd"
                      onClick={() =>
                        setChartOptions({
                          ...chartOptions,
                          xaxis: {
                            range: 300 * 1000,
                          },
                        })
                      }
                      // className={this.state.selection === "ytd" ? "active" : ""}
                    >
                      5M
                    </button>
                  </div>
                </div>

                <div class="col-md-4" style={{ textAlign: "right" }}>
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

{/* //Table ----------------------------------------------------------------------------------------------------------- */}
      <div class="row">
        <div class="col-md-12 ">
          {/* <button onClick={this.handleClick}>
    HI  USER!
 </button><br/>   */}

          <table class="table table-bordered">
            <th scope="col">Name</th>
            <th scope="col">HigherValue</th>
            <th scope="col">LowerValue</th>
            <th scope="col">FValue</th>
            <th scope="col">LastUpdated</th>
            <th scope="col">Edit</th>

            {nameList.map((tag, i) => {
              return (
                <tr>
                
                  <td style={{ color: dataList[i].color }}><Blink color='red' text={nameList[i]}fontSize='20'></Blink></td>
                  <td style={{ color: dataList[i].color }}>
                  <Blink color='red' text= {chartOptions.yaxis[i].max}fontSize='20'></Blink>
                  </td>
                  <td style={{ color: dataList[i].color }}>
                    {chartOptions.yaxis[i].min}
                  </td>
                  <td style={{ color: dataList[i].color }}>
                    {dataList[i]?.data[dataList[i]?.data.length - 1]?.y}
                  </td>
                  <td style={{ color: dataList[i].color }}>
                    {dataList[i]?.data[dataList[i]?.data.length - 1]?.x}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleShow({
                          tagName: nameList[i],
                          axisIndex: i,
                          color: chartOptions.yaxis[i].axisBorder.color,
                          upperValue: chartOptions.yaxis[i].max,
                          lowerValue: chartOptions.yaxis[i].min,
                        })
                      }
                      style={{ background: dataList[i].color }}
                      className="btn btn-secondary btn-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <>
        <MyVerticallyCenteredModal
          show={show}
          tagData={selectedTagData}
          onHide={() => setShow(false)}
          onSave={onSave}
        />
      </>
    </div>
  );
};

export default ChartSpace;