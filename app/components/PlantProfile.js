// Include React as a dependency
const React = require("react");

// Include the Helper (for the saved recall)
const helpers = require("../utils/helpers");

const moment = require('moment');

class PlantProfile extends React.Component {



  getInitialState () {
    
  }
  
  componentDidMount() {
    var id = this.props.params.id
    console.log(id)
  }

  render () {
    return (
      <div></div>
    );
  }
};

// Export the module back to the route
module.exports = PlantProfile;