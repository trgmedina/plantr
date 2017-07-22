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

  handleClick (reminder) {
    console.log("CLICKED");
    console.log(reminder);
    var reminderId = reminder.id;
    var id = this.props.params.id
    // Delete the list!
    profileHelpers.deleteSaved(reminderId).then(function() {

      // Get the revised list!
      profileHelpers.getPlantInfo(id).then(function(data) {
        this.setState({ 
          plant: data[0],
          reminders: data[1] 
        });
        console.log("saved results", data);
      }.bind(this));

    }.bind(this));
  }

  renderEmpty() {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          There are no care reminders for this plant.
          <button type="button" className="btn btn-success">
            Create Reminder
          </button>
        </li>
      </ul>
    );
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
    if (this.state.reminders.length===0) {
      return this.renderEmpty();
    }
    return this.state.reminders.map(function(reminder, index) {
      return (
        <div key={index}>
          <ul className="list-group">
            <li className="list-group-item">
              <button type="button" className="btn btn-danger delete-btn" 
              onClick={() => this.handleClick(reminder)}>
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
              {reminder.type}, {reminder.days}, {reminder.frequency}
              {reminder.id}, {reminder.created}
            </li>
          </ul>
        </div>
      )
    }.bind(this));
  }
}
// Export the module back to the route
module.exports = PlantProfile;