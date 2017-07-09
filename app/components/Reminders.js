// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
// var helpers = require("../utils/helpers");

// Create the Main component
var Reminders = React.createClass({
  render: function() {

    return (
    	<div className="container-fluid">
	        <div className="row">
	          	<div className="col-xs-12 text-center">
	          		<h2>Reminders</h2>
	          	</div>
	        </div>
	        <div className="row">
	          	<div className="col-md-offset-2 col-md-8 col-xs-12">
	          		<div className="panel panel-default">
  						<div className="panel-body">
  							<span>
  								<img src="http://i.imgur.com/X8CLtJ6.jpg" alt="..." className="img-rounded reminder-img"></img>
    							Example Reminder for Aloe Vera
    						</span>
    						<i className="fa fa-check" aria-hidden="true"></i>
  						</div>
  						<div className="panel-footer">
  							<span><i className="fa fa-tint" aria-hidden="true"></i>  Water Tuesday</span>
  						</div>
					</div>
	          	</div>
	        </div>	        
	    </div>
    );
  }
});

// Export the module back to the route
module.exports = Reminders;