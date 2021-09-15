import React from "react";

import "react-toastify/dist/ReactToastify.css";

import ChartSpace from './ChartSpace';


class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  
  }

  componentDidMount() {
    // window.setInterval(() => {
    //     const min = 1;
    //     const max = 100;
    //     const rand = min + Math.random() * (max - min);
    //     const rand1 = min + Math.random() * (max - min);
    //     this.options.xaxis.categories.push(new Date().getTime())
    //     this.series[0].data.push(rand);
    //     this.series[1].data.push(rand1);
    //     this.setState({})
    // }, 1000);
  }

  render() {
    return <ChartSpace></ChartSpace>
          
  }
}

export default Graph;


