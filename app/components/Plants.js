// Include React as a dependency
var React = require("react");
var Link = require("react-router").Link;
import { browserHistory } from 'react-router';

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Create the Main component
class Plants extends React.Component {

	constructor(props) {
		super(props);
	    this.state = {
	    	savedPlants: []
	    };
	}

    // When this component mounts, get all user plants
	componentDidMount() {
    	helpers.getUserPlants().then(function(plantData) {
    		console.log(plantData);

     		this.setState({ savedPlants: plantData });

    	}.bind(this));
  	}

  	// This code handles the deleting of a user's plant 
	handleDelete(plant) {
	    console.log(plant);
	    console.log(plant.id);

	    // Delete the list!
	    helpers.deleteUserPlant(
	    	plant.id
	    ).then(function() {

	      // Get the revised list!
	      helpers.getUserPlants().then(function(plantData) {
	        this.setState({ savedPlants: plantData });
	        console.log("saved results", plantData );

	      }.bind(this));

	    }.bind(this));
  	}

  	renderEmpty() {
    	return (
	      	<li className="list-group-item">
	        	<h3>
	          		<span>
	            		<em>You have no plants.</em>
	          		</span>
	        	</h3>
	      	</li>
    	);
  	}

  	handleClick(id){
  		browserHistory.push('/app/PlantProfile/' + id);
  	}

	renderSavedPlants() {
    	return this.state.savedPlants.map(function(plant, index) {
    		// console.log(plant);
    		// console.log(index);

			return (
	        	<div key={index}>
<<<<<<< HEAD
	          		<div className="panel panel-default plant-panel">
						<div className="panel-body plant-panel-body">
						 	<h5 className="plantpg-name">{plant.name}</h5>
							<img src={plant.imageURL} className="plantpg-img"></img>
						    <i className="fa fa-minus-square fa-lg" aria-hidden="true" onClick={this.handleDelete.bind(this, plant.id)}></i>
						</div>
						<div className="panel-group" role="tablist">
							<div className="panel panel-default">
								<Collapsible trigger="Test" className="fa fa-chevron-circle-down fa-2x">  
									<ul className="list-group">
										<li className="list-group-item plantpg-description">
											<span>
											<p></p>
											</span>
										</li>
										<li className="list-group-item plantpg-origin">
											<span>
												<i className="fa fa-globe" aria-hidden="true"></i>
												{plant.origin}
											</span>
										</li>										
										<li className="list-group-item plantpg-sun">
											<span>
												<i className="fa fa-sun-o" aria-hidden="true"></i>
												{plant.sunlightAmt}
											</span>
										</li>
										<li className="list-group-item plantpg-water">
											<span>
												<i className="fa fa-tint" aria-hidden="true"></i>
												{plant.waterSchedule}
											</span>
										</li>
										<li className="list-group-item plantpg-reminder">
											<span>
												<i className="fa fa-exclamation" aria-hidden="true"></i>
												{plant.reminders.frequency}
											</span>
										</li>
									</ul>
								</Collapsible>
=======
	        		<div onClick={this.handleClick.bind(null,plant.id)} id={plant.id} type="submit">
		          		<div className="panel panel-default plant-panel">
							<div className="panel-body plant-panel-body">
							 	<h5 className="plantpg-name">{plant.name}</h5>
								<img src={plant.imageURL} className="plantpg-img"></img>
							    <i className="fa fa-minus-square fa-lg" aria-hidden="true"></i>
>>>>>>> master
							</div>
						</div>
					</div>
	        	</div>
	      	);
    	}.bind(this));
	}


	renderContainer() {

		return (
	    	<div className="container-fluid">
		        <div className="row">
		          	<div className="col-xs-12 text-center">
		          		<h2>My Plants</h2>
		          	</div>
		        </div>
		        <div className="col-xs-12">
		      		{this.renderSavedPlants()}
		      	</div>      
			</div>
		);
	}

	render() {

    	if (this.state.savedPlants.length===0) {
    		return this.renderEmpty();
    	}

   		return this.renderContainer();
 	}
};

// Export the module back to the route
module.exports = Plants;