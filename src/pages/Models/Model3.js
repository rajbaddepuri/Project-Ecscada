import React from 'react';


class Model3 extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	downloadEmployeeData = () => {
		fetch('http://localhost/ScadaClient/api/ShpaesDataJson?name=two.xml')
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'employees.jsx';
					a.click();
				});
				//window.location.href = response.url;
		});
	}
	
	render() {
		return (
			<div id="container" style={{marginLeft:"100px"}}>
				<h1>Download File using React App</h1>
				<h3>Download Employee Data using Button</h3>
				<button onClick={this.downloadEmployeeData}>Download</button>
				<p/>
			
			</div>
		)
	}

}

export default Model3;