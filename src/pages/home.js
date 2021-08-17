import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom';
import ProcessFlowmodel from './ProcessFlowmodel';



class Home extends React.Component{
/*      debugger; 
var a = document.getElementById("roles").value 
 alert(a); */

  change(a,b) {

    a=document.getElementById("inp").value = document.getElementById("roles").value;
    
  b=document.getElementById("exampleInputPassword1").value="Password";
 
   }

   
     
 myFunction() {
           
    switch(document.getElementById("roles").value)
    {
    case "administrator@ecil.co.in":
    window.location="./AdminDashboard"
    break;
    
    case "supervisor@ecil.co.in":
    window.location="./SupervisorDashboard"
    break;
    
    case "project-employee@ecil.co.in":
    window.location="./EmployeeDashboard"
    break;
    
    }
      } 
    


    render(){
        

   
        return(
            
            <div>
                <body className="font-montserrat">
                <div className="auth">
    <div className="auth_left">
        <div className="card">
            <div className="text-center mb-2">
               
            </div>
			 <div className="card-body">
			 <h3 style={{textAlign:"center"}}> ECSCADA Web Client Application </h3>
			 </div>
            <div className="card-body">
			<img className="text-center mb-2" src="assets/images/ecillogo.jpg"  style={{width:"150px"},{height:"170px"},{marginLeft:"75px"}} alt=""/>
                <div className="card-title" style={{textAlign: "center"}}>Login to ECSCADA Application</div>
                <div className="form-group">
                    <select id="roles" className="custom-select" onChange={this.change}>
						<option>Choose Role...</option>
                        <option value="administrator@ecil.co.in">Administrator</option>
                        <option value="supervisor@ecil.co.in">Supervisor</option>
                        <option value="project-employee@ecil.co.in">Employee</option>
                    </select>
                </div>
					<div className="form-group">
                    <input type="email" aria-describedby="emailHelp" className="form-control" id="inp" name="input" placeholder="Username"/>
                </div>
                <div className="form-group">
                   
                <input type="password" placeholder="Password" className="form-control" id="exampleInputPassword1" />
					 <label className="form-label"><a href='/ForgotPassword' className="float-right small">I forgot password</a></label>
                </div>
                <div className="form-group">
                    <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <span className="custom-control-label">Remember me</span>
                    </label>
                </div>
                <div className="form-group">
                   
                 <Link to='/' onClick={this.myFunction}  className="btn btn-primary btn-block" > Sign in</Link> 
                </div>
            </div>

        </div>        
    </div>

    <div className="auth_right full_img" ></div>
   
</div>


</body>
            </div>

        );
    }
}

export default Home;