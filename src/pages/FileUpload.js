import axios from 'axios'; 

import React,{Component} from 'react'; 

import {Link} from 'react-router-dom';

export default class FileUpload extends Component { 

	state = { 

	// Initially, no file is selected 
	selectedFile: null
	}; 
	
	// On file select (from the pop up) 
	onFileChange = event => { 
	
	// Update the state 
	this.setState({ selectedFile: event.target.files[0] }); 
	
	}; 
	
	// On file upload (click the upload button) 
	onFileUpload = () => { 
	
	// Create an object of formData 
	const formData = new FormData(); 
	
	// Update the formData object 
	formData.append( 
		"myFile", 
		this.state.selectedFile, 
		this.state.selectedFile.name 
	); 
	
	// Details of the uploaded file 
	console.log(this.state.selectedFile); 
	
	// Request made to the backend api 
	// Send formData object 
	axios.post("api/uploadfile", formData); 
	}; 
	
	// File content to be displayed after 
	// file upload is complete 
	fileData = () => { 
	
	if (this.state.selectedFile) { 
		
		return ( 
		<div> 
			<h2>File Details:</h2> 
			<p>File Name: {this.state.selectedFile.name}</p> 
			<p>File Type: {this.state.selectedFile.type}</p> 
			<p> 
			Last Modified:{" "} 
			{this.state.selectedFile.lastModifiedDate.toDateString()} 
			</p> 
		</div> 
		); 
	} else { 
		return ( 
		<div> 
			<br /> 
			<h4></h4> 
		</div> 
		); 
	} 
	}; 
	
	render() { 
	
	return ( 
<body className="font-montserrat">


<div id="main_content">

    <div className="page">  

		<div className="section-body">
            
		<div className="row clearfix">
			<div className="col-xl-12 col-lg-12">
				<div className="card">
					<div className="card-header">
					<h3 className="card-title">XML File Upload</h3>
			{/* 		<ul class="nav nav-tabs page-header-tab">
					<li class="nav-item"><Link to="/ViewAlarms" class="nav-link active show" data-toggle="tab">View Alarms</Link></li>

					<li class="nav-item" class="nav-link active show"  href="#Area_Charts"> <a href='/assets/samples/alarm.html'style={{height:"30px"},{width:"150px"}} > Historic Alarms</a></li>
				
				</ul> */}
					  
				{/* 		<div className="card-options">
						
				   
			
	
							<button className="btn btn-sm btn-outline-secondary mr-1" id="one_month">1M</button>
							<button className="btn btn-sm btn-outline-secondary mr-1" id="six_months">6M</button>
							<button className="btn btn-sm btn-outline-secondary mr-1" id="one_year" class="active">1Y</button>
							<button className="btn btn-sm btn-outline-secondary mr-1" id="ytd">YTD</button>
							<button className="btn btn-sm btn-outline-secondary" id="all">ALL</button>
						</div> */}
					</div>
				 
				</div>                
			</div>
	  </div> 
	  </div>
		<div>  
			<h3> 
			 
			</h3> 
			<div> 
				<input style={{cursor:"pointer", marginLeft:"25px"}} type="file" onChange={this.onFileChange} /> 
				<button className="btn btn-success" onClick={this.onFileUpload}> 
				Upload! 
				</button> 
			</div> 
		{this.fileData()} 
		</div> 
		</div>
		</div>
		</body>
	); 
	} 
} 

