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
    	helpers.getUserPlants().then(function(data) {
    		console.log(data);

     		this.setState({ savedPlants: data });

    	}.bind(this));
  	}

  	// This code handles the deleting of a user's plant 
	handleDelete(plant) {
		// console.log("CLICKED")
	 //    console.log(plant);
	 //    console.log(plant.id);

	    // Delete from the user's plants list
	    helpers.deleteUserPlant(plant).then(function() {

	      // Get the revised list
	      	helpers.getUserPlants().then(function(plantData) {
	      		// console.log(plantData);
	      		
		        this.setState({ savedPlants: plantData });
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
    		return (
	        	<div key={index}>
	        		<div id={plant.id} type="submit">
		          		<div className="panel panel-success plant-panel">
		          			<div className="panel-heading">{plant.name}<i onClick={() => this.handleDelete(plant)} className="fa fa-minus-square fa-lg" aria-hidden="true"></i></div>
							<div className="panel-body plant-panel-body">
								<img src={plant.imageURL} onClick={this.handleClick.bind(null,plant.id)} className="plantpg-img"></img>
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
		          		<h2>Your Plants</h2>
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