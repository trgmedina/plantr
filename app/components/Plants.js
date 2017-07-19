// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Create the Main component
class Plants extends React.Component {

	constructor(props) {
		super(props);
	    this.state = {
	    	name: "",
	    	description: "",
	    	origin: "",
	    	sunlightAmt: "",
	    	waterSchedule: "",
	    	imageURL: "",
	    	reminders: {
	    		reminderType: "",
	    		days: [],
	        	frequency: ""
	    	}
	    };
	}

    // When this component mounts, get all reminders
componentDidMount() {
    helpers.getUserPlants().then(function(data) {
    	console.log(data);

      this.setState({ 
      		name: data.name,
	    	description: data.description,
	    	origin: data.origin,
	    	sunlightAmt: data.sunlightAmt,
	    	waterSchedule: data.waterSchedule,
	    	imageURL: data.imageURL,
	    	reminders: {
	    		reminderType: data.reminders.reminderType,
	    		days: data.reminders.days,
	        	frequency: data.reminders.frequency
	    	}
      	 });
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


	render() {

		return (
	    	<div className="container-fluid">
		        <div className="row">
		          	<div className="col-xs-12 text-center">
		          		<h2>My Plants</h2>
		          	</div>
		        </div>
		        <div className="row">
		          	<div className="col-xs-12">
		          		<div className="panel panel-default plant-panel">
					  		<div className="panel-body plant-panel-body">
					    		<h5 className="plantpg-name">Plant Name</h5>
					    		<img src="http://i.imgur.com/X8CLtJ6.jpg" className="plantpg-img"></img>
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
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
												</span>
											</li>
											<li className="list-group-item plantpg-origin">
												<span>
													<i className="fa fa-globe" aria-hidden="true"></i>
													North America
												</span>
											</li>										
											<li className="list-group-item plantpg-sun">
												<span>
													<i className="fa fa-sun-o" aria-hidden="true"></i>
													Partial Sun
												</span>
											</li>
											<li className="list-group-item plantpg-water">
												<span>
													<i className="fa fa-tint" aria-hidden="true"></i>
													Once a week
												</span>
											</li>
											<li className="list-group-item plantpg-reminder">
												<span>
													<i className="fa fa-exclamation" aria-hidden="true"></i>
													Tuesday, Friday, Every Week
												</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
		          	</div>
				</div>	        
			</div>
		);
	}
};

// Export the module back to the route
module.exports = Plants;