// Include React as a dependency
const React = require("react");

// Include the Helper (for the saved recall)
const profileHelpers = require("../utils/profileHelpers");

const moment = require('moment');

class PlantProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plant: [],
      reminders: [],
    };
  }
  
  componentDidMount() {
    var id = this.props.params.id
    profileHelpers.getPlantInfo(id).then(function(data) {
      console.log("component plantData", data[0])
      console.log("component reminderData", data[1])
      this.setState({ 
        plant: data[0],
        reminders: data[1]
      });
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
              {/*REMINDERS RENDER HERE*/}
              {this.renderReminders()}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderReminders () {
    return this.state.reminders.map(function(reminder, index) {
      return (
        <div key={index}>
          <ul className="list-group">
            <li className="list-group-item">
              {reminder.type}, {reminder.days}, {reminder.frequency}
              {reminder._id}, {reminder.created}
            </li>
          </ul>
        </div>
      )
    }.bind(this));
  }
}
// Export the module back to the route
module.exports = PlantProfile;