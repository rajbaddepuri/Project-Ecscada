import React,{Component} from 'react';
import {Link} from 'react-router-dom';


class Profile extends React.Component{
    render(){
        return( 

     <div>     
            
        
                <div className="section-body">
            
                <div className="row clearfix">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card" style={{background:'#D3D3D3'}}> 
                            <div className="card-header">
                                <h3 className="card-title"  style = {{marginLeft:"750px",fontSize:"20px"}}>Profile</h3>
                            </div>
                        </div>                
                    </div>
              </div>  
         </div>  
            
        <div class="card-body" class="container" style={{maxWidth:'40%',marginLeft:"550px",background:'	#D3D3D3',borderRadius:'10px',borderStyle:'outset'}}><br/>
        <div class="row clearfix">
            <div class="col-md-5">
                <div class="form-group">
                    <label class="form-label">Company</label>
                    <input type="text" class="form-control" disabled="" placeholder="Company" value="Epic Theme"/>
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="form-group">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-control" placeholder="Username" value="michael23"/>
                </div>
            </div>
            <div class="col-sm-6 col-md-4">
                <div class="form-group">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" placeholder="Email"/>
                </div>
            </div>
            <div class="col-sm-6 col-md-6">
                <div class="form-group">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control" placeholder="Company" value="Jane"/>
                </div>
            </div>
            <div class="col-sm-6 col-md-6">
                <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control" placeholder="Last Name" value="Pearson"/>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label class="form-label">Address</label>
                    <input type="text" class="form-control" placeholder="Home Address" value="455 S. Airport St. Moncks Corner"/>
                </div>
            </div>
            <div class="col-sm-6 col-md-4">
                <div class="form-group">
                    <label class="form-label">City</label>
                    <input type="text" class="form-control" placeholder="City" value="New York"/>
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="form-group">
                    <label class="form-label">Postal Code</label>
                    <input type="number" class="form-control" placeholder="ZIP Code"/>
                </div>
            </div>
            <div class="col-md-5">
                <div class="form-group">
                    <label class="form-label">Country</label>
                    <select class="form-control custom-select">
                        <option value="">USA</option>
                    </select>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group mb-0">
                    <label class="form-label">About Me</label>
                    <textarea rows="5" class="form-control" placeholder="Here can be your description">Oh so, your weak rhyme You doubt I'll bother, reading into it I'll probably won't, left to my own devices But that's the difference in our opinions.</textarea>
                </div>
            </div>
        </div>
        <div class="card-footer text-right" style={{marginRight:'160px'}}>
             <button type="submit" class="btn btn-primary">Update Profile</button>
        </div>
    </div>

    </div>  
    

        
            
            
        );
    }   
            
    
}
export default Profile;
{/*  
                                    <div>
< div className="font-montserrat">


<div id="main_content">

   
    

    <div className="page">
        
                <div className="section-body">
            
                <div className="row clearfix">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title"  style = {{marginLeft:"400px"}}>Profile</h3>
                            </div>
                        </div>                
                    </div>
              </div>  
         </div>   
    </div>
       
</div>
</div>    


<div className="card" style={{width:'30%', marginLeft:'600px', height:'400px', backgroundColor:'#D3D3D3'}}>
    

       <div >    
      {/* 1 st container      
      


    <div className="card" style={{width:"95%",margin:'auto',height:'18%'}}> 
        <div className="card-body" >
        <td >
          <tr >
          <Link to='/Profile' className="dropdown-item" ><img className="media-object" src="assets/images/xs/avatar4.jpg" alt=""/> rajkumar@1996</Link>
          </tr>
      </td>  
   
        </div>
    
    </div>      */} 
    
{/* 2 nd container 

    <div className="card" style={{width:"95%",margin:'auto'}}>
        <div className="card-body"  >
        <div >
                    <th >
                    <tr><Link to='/ChangePassword' className="dropdown-item" ><i className="dropdown-icon fe fe-settings"></i> Change Password</Link></tr>
                   
                    <tr><Link to='/Notification' className="dropdown-item" ><i className="fa fa-bell"></i> Notification</Link></tr>
                    </th>
                </div>    
        </div>
            
        
    </div>  */}  
 {/* 3rd container    

 <div className="card" style={{width:"95%",margin:'auto'}}>
        <div className="card-body" >
        <li>Active project</li>
                
                    
         <th>
            <tr><Link to='/project1' className="dropdown-item" > project 1</Link></tr>
            <tr><Link to='/project 2' className="dropdown-item" > project 2</Link></tr>
         </th>
        
            
        </div>/}  
    </div> 
{/* 4th container */}   

{/*<div className="card" style={{width:"95%",margin:'auto'}} >
        <div className="card-body" style={{width:"95%",margin:'auto',height:'20%'}}>
        <div className="dropdown-divider"></div>
        <div className="form-group">
                   
                 <Link to='/'  className="btn btn-primary btn-block" > Logout</Link> 
                </div>
        </div>
    </div> 



    </div>
    </div>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    </div>

*/}