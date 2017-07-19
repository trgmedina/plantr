// Include React as a dependency
var React = require("react");

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

	renderSavedPlants() {
    	return this.state.savedPlants.map(function(plant, index) {
    		// console.log(plant);
    		// console.log(index);

			return (
	        	<div key={index}>
	          		<div className="panel panel-default plant-panel">
						<div className="panel-body plant-panel-body">
						 	<h5 className="plantpg-name">{plant.name}</h5>
							<img src={plant.imageURL} className="plantpg-img"></img>
						    <i className="fa fa-minus-square fa-lg" aria-hidden="true"></i>
						</div>
						<div className="panel-group" role="tablist">
							<div className="panel panel-default">
								<div className="panel-heading" role="tab" id="collapseListGroupHeading1">
									<h4 className="panel-title">
										<a href="#collapseListGroup1" className="collapsed" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseListGroup1"> <i className="fa fa-chevron-circle-down  fa-2x" aria-hidden="true"></i> </a>
									</h4>
								</div>
								<div className="panel-collapse collapse" role="tabpanel" id="collapseListGroup1" aria-labelledby="collapseListGroupHeading1" aria-expanded="false">
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
								</div>
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
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (this.state.savedPlants.length===0) {
      
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
};

// Export the module back to the route
module.exports = Plants;