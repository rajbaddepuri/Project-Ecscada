import React, { Component } from 'react'
import axios from 'axios'

export default class Loops extends Component {
    constructor(props){
        super(props);

            this.state = {
                name: [],
            }
        }

        componentDidMount() {
            axios.get('https://cors-anywhere.herokuapp.com/http://coolaudit.com/api/values/').then(res => {
                console.log(res);
                this.setState({ name: res.data });
            });
        }


    render() { 
      const alarms = this.state.name.map(name =>{
      if(name.ACK === 0){
        return(
          <ul key={name}>
              <li>{name.DATETIME}</li>
        </ul>
        )
      }
      else if(name.ACK === 1){
        return(
          <ul key={name}>
              <li>{name.MSINCE}</li>
        </ul>
        )
      }
      return(
        <div>
          {alarms}
        </div>
      )
      
      });
    }
  }
