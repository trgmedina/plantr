// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
// var helpers = require("../utils/helpers");

// Create the Main component
var AddPlant = React.createClass({
  render: function() {

    return (
        <div className="container-fluid">
          <div className="row">
              <div className="col-xs-12 text-center">
                <h2>Add a Plant</h2>
              </div>
          </div>
          <div className="row">
              <div className="col-xs-12">
                <div>Add Plant Form Goes Here</div>
              </div>
          </div>          
      </div>
    );
  }
});

// Export the module back to the route
module.exports = AddPlant;