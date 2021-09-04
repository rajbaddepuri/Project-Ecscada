import React,{Components} from 'react';
import './App.css';
import Home from './pages/home';
import AdminDashboard from './pages/AdminDashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Model2 from './pages/Models/Model2';
import Model3 from './pages/Models/Model3';
import Model4 from './pages/Models/Model4';
import Model5 from './pages/Models/Model5';
import Model6 from './pages/Models/Model6';
import Model7 from './pages/Models/Model7';
import Model8 from './pages/Models/Model8';
import Model9 from './pages/Models/Model9';
import button from './pages/Models/button';
import cylinder from './pages/Models/cylinder';
import dataElipse from './pages/Models/dataElipse';
import ellipse from './pages/Models/ellipse';
import pipe from './pages/Models/pipe';
import WorkingAllShapes from './pages/Models/WorkingAllShapes';
import data from './pages/Models/data';
import ProcessFlowmodel from './pages/ProcessFlowmodel';
import Trends from './pages/Trends';
import TabularTrends from './pages/TabularTrends';
import LineTrends from './pages/LineTrends';
import LineGraph from './pages/LineGraph';
import Historictrends from './pages/HistoricTrends'
import BarTrends from './pages/BarTrends';
import AreaTrends from './pages/AreaTrends';
import Events from './pages/Events';
import ViewEvents from './pages/ViewEvents';
import HistoricEvents from './pages/HistoricEvents';
import Model1 from './pages/Models/Model1';
import ForgotPassword from './pages/ForgotPassword';
import Alarms from './pages/Alarms';
import ViewAlarms from './pages/ViewAlarms';
import HistoricAlarms from './pages/HistoricAlarms';
import HistTrends from './pages/HistTrends';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar'; 
import Header from './components/Header';
import Footer from './components/Footer'; 
import datepicker from './pages/datepicker'; 
import DTms_0010 from './pages/DTms_0010'; 
import AlarmsEvents from './pages/AlarmsEvents'; 
import FileUpload from './pages/FileUpload'; 
import Modal from './pages/Modal'
// import LineChartDemo from './pages/LineChartDemo'; 
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom';
import Report from "./pages/Report";
import SketchExample from './pages/sketch';






class App extends React.Component {
  

  
  render(){
    
    if(window.location.pathname ==="/")
    {
      
      return(
      
      <div>
        
      <Router>
                  
      <Route exact path="/" component={Home} />
      
      </Router>
      </div>
      )
    }
    else if (window.location.pathname==="/ForgotPassword"){
      return(
        <div>
          <Router>
            <Route exact path="/ForgotPassword" component={ForgotPassword}/>
          </Router>
        </div>
      )
      
    }
    else
    {
      return(
        
  <div>
     <Router >
     
       
       <Sidebar/>
      
        <Switch>
        
       <Route exact path="/" component={Home} />
       <Route exact path="/AdminDashboard" component={AdminDashboard}/>
       <Route exact path="/SupervisorDashboard" component={SupervisorDashboard}/>
       <Route exact path="/EmployeeDashboard" component={EmployeeDashboard}/>
        <Route exact path="/Model1" component={Model1}/>
      <Route exact path="/Model2" component={Model2}/>
      <Route exact path="/Model3" component={Model3}/>
      <Route exact path="/Model4" component={Model4}/>
      <Route exact path="/Model5" component={Model5}/>
      <Route exact path="/Model6" component={Model6}/>
      <Route exact path="/Model7" component={Model7}/>
      <Route exact path="/Model8" component={Model8}/>
      <Route exact path="/Model9" component={Model9}/>
      <Route exact path="/button" component={button}/>
      <Route exact path="/cylinder" component={cylinder}/>
      <Route exact path="/data" component={data}/>
      <Route exact path="/dataElipse" component={dataElipse}/>
      <Route exact path="/ellipse" component={ellipse}/>
      <Route exact path="/pipe" component={pipe}/>
      <Route exact path="/WorkingAllShapes" component={WorkingAllShapes}/>
      <Route exact path="/ProcessFlowmodel" component={ProcessFlowmodel}/>
      <Route exact path="/Trends" component={Trends}/>
      <Route exact path="/TabularTrends" component={TabularTrends}/>
      <Route exact path="/LineTrends" component={LineTrends}/>
      <Route exact path="/LineGraph" component={LineGraph}/>
      <Route exact path="/Historictrends" component={Historictrends}/>
      <Route exact path="/BarTrends" component={BarTrends}/> 
      <Route exact path="/AreaTrends" component={AreaTrends}/>
      <Route exact path="/Events" component={Events}/>
      <Route exact path="/ViewEvents" component={ViewEvents}/>
      <Route exact path="/HistoricEvents" component={HistoricEvents}/>
      {/* <Route exact path="/LineChartDemo" component={LineChartDemo}/> */}
      <Route exact path="/Alarms" component={Alarms}/>
      <Route exact path="/ViewAlarms" component={ViewAlarms}/>
      <Route exact path="/HistoricAlarms" component={HistoricAlarms}/>
      <Route exact path="/Profile" component={Profile}/>
      <Route exact path="/Settings" component={Settings}/>
      <Route exact path="/datepicker" component={datepicker}/>
      <Route exact path="/DTms_0010" component={DTms_0010}/>
      <Route exact path="/AlarmsEvents" component={AlarmsEvents}/>
      <Route exact path="/FileUpload" component={FileUpload}/>
      <Route exact path="/HistTrends" component={HistTrends}/>
      <Route exact path="/Reports" component={Report}/>
      <Route exact path="/Modal" component={Modal}/>
      <Route exact path="/SketchExample" component={SketchExample}/>


  
    

    
     
        </Switch>
         
      
     
      
      <Footer/>
      
      </Router> 
    </div>
 );
      }
}
}
export default App;
