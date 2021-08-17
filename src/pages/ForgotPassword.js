import React,{Component} from 'react';


class ForgotPassword extends React.Component{
    render(){
        return(
            <div>
            <div className="auth">
    <div className="auth_left">
        <div className="card">
  
            <div className="card-body">
                
            <img src="assets/images/ecillogo.JPG" className="ecillogo" style={{marginBottom: "30px"},{marginLeft: "70px"}} alt=""/>
			
                <div className="card-title">Forgot password</div>
                <p className="text-muted">Enter your email address and your password will be reset and emailed to you.</p>
                <div className="form-group">
                    <label className="form-label" for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-footer">
                    <button type="submit" className="btn btn-primary btn-block">Send me new password</button>
                </div>
            </div>
            <div className="text-center text-muted">
                Forget it, <a href="index.html">Send me Back</a> to the Sign in screen.
            </div>
        </div>        
    </div>
    <div className="auth_right full_img"></div>
</div>
</div>
        )

        
    }  
}

export default ForgotPassword