// Include React as a dependency
const React = require("react");

// Include the Helper (for the saved recall)
const profileHelpers = require("../utils/profileHelpers");

const moment = require('moment');

class PlantProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plant: []
    };
  }
  
  componentDidMount() {
    var id = this.props.params.id
    profileHelpers.getPlantInfo(id).then(function(plantData) {
      console.log("react", plantData)
      this.setState({ plant: plantData });
    }.bind(this));
  }

  render () {
        return (
            <div className="row">
              <div className="col-xs-6">
                <div className="panel panel-success" id="main-prof-panel">
                  <div className="panel-heading">
                    {this.state.plant.name} AKA {this.state.plant.nickname}
                  </div>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <img id="profile-img" src={this.state.plant.imageURL}/>
                      </li>
                      <li className="list-group-item">
                        <p>Origin : {this.state.plant.origin}</p>
                        <p>{this.state.plant.description}</p>
                      </li>
                    </ul>
                </div>
              </div>
                <div className="col-xs-6">
                  <div className="panel panel-success" id="care-prof-panel">
                    <div className="panel-heading">
                      Plant Care Information
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <span>
                          <i className="fa fa-sun-o" aria-hidden="true"></i>
                          {this.state.plant.sunlightAmt}
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span>
                          <i className="fa fa-tint" aria-hidden="true"></i>
                          {this.state.plant.waterSchedule}
                        </span>
                      </li>
                      <li className="list-group-item">
                        {this.state.plant.specialCare}
                      </li>
                    </ul>
                  </div>
                  <br></br>
                  <div className="panel panel-success" id="reminder-prof-panel">
                    <div className="panel-heading">
                    Plant Care Reminders
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item">
                        {this.state.plant.reminders}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

      );
  }
}

// Export the module back to the route
module.exports = PlantProfile;