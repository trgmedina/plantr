// Include React as a dependency
const React = require("react");

// Include the Helper (for the saved recall)
const reminderHelpers = require("../utils/reminderHelpers");

// Create the Main component
class Reminders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reminders: []
    };
  }

    // When this component mounts, get all reminders
  componentDidMount() {
    reminderHelpers.getReminders().then(function(reminderData) {
      // console.log("4. reminder data ", reminderData)
      this.setState({ reminders: reminderData });
    }.bind(this));
  }

  renderEmpty() {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>No reminders to display...</em>
          </span>
        </h3>
      </li>
    );
  }

  renderSundayReminders() {
    return this.state.reminders.map(function(reminder, index) {
      if(reminder.day==="Sunday"){
        return (
          <div key={index}>
            <div className="panel panel-default calendar-panel">
              <div className="panel-body calendar-body">
                <span>
                  <img src={reminder.imageURL} alt="{reminder.plant}" className="img-rounded reminder-img pull-left"></img>
                  <p className="reminder-date text-right">{reminder.date}</p>
                  <p className="reminder-type">{reminder.type} {reminder.nickname||reminder.plant}</p>
                </span>
              </div>
            </div>
          </div>
        );
      }
    }.bind(this));
  }

  renderMondayReminders() {
    return this.state.reminders.map(function(reminder, index) {
      if(reminder.day==="Monday"){
        return (
          <div key={index}>
            <div className="panel panel-default calendar-panel">
              <div className="panel-body calendar-body">
                <span>
                  <img src={reminder.imageURL} alt="{reminder.plant}" className="img-rounded reminder-img pull-left"></img>
                  <p className="reminder-date text-right">{reminder.date}</p>
                  <p className="reminder-type">{reminder.type} {reminder.nickname||reminder.plant}</p>
                </span>
              </div>
            </div>
          </div>
        );
      }
    }.bind(this));
  }
  renderTuesdayReminders() {
    return this.state.reminders.map(function(reminder, index) {
      if(reminder.day==="Tuesday"){
        return (
          <div key={index}>
            <div className="panel panel-default calendar-panel">
              <div className="panel-body calendar-body">
                <span>
                  <img src={reminder.imageURL} alt="{reminder.plant}" className="img-rounded reminder-img pull-left"></img>
                  <p className="reminder-date text-right">{reminder.date}</p>
                  <p className="reminder-type">{reminder.type} {reminder.nickname||reminder.plant}</p>
                </span>
              </div>
            </div>
          </div>
        );
      }
    }.bind(this));
  }

  renderWednesdayReminders() {
    return this.state.reminders.map(function(reminder, index) {
      if(reminder.day==="Wednesday"){
        return (
          <div key={index}>
            <div className="panel panel-default calendar-panel">
              <div className="panel-body calendar-body">
                <span>
                  <img src={reminder.imageURL} alt="{reminder.plant}" className="img-rounded reminder-img pull-left"></img>
                  <p className="reminder-date text-right">{reminder.date}</p>
                  <p className="reminder-type">{reminder.type} {reminder.nickname||reminder.plant}</p>
                </span>
              </div>
            </div>
          </div>
        );
      }
    }.bind(this));
  }

  renderThursdayReminders() {
    return this.state.reminders.map(function(reminder, index) {
      if(reminder.day==="Thursday"){
        return (
          <div key={index}>
            <div className="panel panel-default calendar-panel">
              <div className="panel-body calendar-body">
                <span>
                  <img src={reminder.imageURL} alt="{reminder.plant}" className="img-rounded reminder-img pull-left"></img>
                  <p className="reminder-date text-right">{reminder.date}</p>
                  <p className="reminder-type">{reminder.type} {reminder.nickname||reminder.plant}</p>
                </span>
              </div>
            </div>
          </div>
        );
      }
    }.bind(this));
  }

  renderFridayReminders() {
    return this.state.reminders.map(function(reminder, index) {
      if(reminder.day==="Friday"){
        return (
          <div key={index}>
            <div className="panel panel-default calendar-panel">
              <div className="panel-body calendar-body">
                <span>
                  <img src={reminder.imageURL} alt="{reminder.plant}" className="img-rounded reminder-img pull-left"></img>
                  <p className="reminder-date text-right">{reminder.date}</p>
                  <p className="reminder-type">{reminder.type} {reminder.nickname||reminder.plant}</p>
                </span>
              </div>
            </div>
          </div>
        );
      }
    }.bind(this));
  }
  renderSaturdayReminders() {
    return this.state.reminders.map(function(reminder, index) {
      if(reminder.day==="Saturday"){
        return (
          <div key={index}>
            <div className="panel panel-default calendar-panel">
              <div className="panel-body calendar-body">
                <span>
                  <img src={reminder.imageURL} alt="{reminder.plant}" className="img-rounded reminder-img pull-left"></img>
                  <p className="reminder-date text-right">{reminder.date}</p>
                  <p className="reminder-type">{reminder.type} {reminder.nickname||reminder.plant}</p>
                </span>
              </div>
            </div>
          </div>
        );
      }
    }.bind(this));
  }

  renderContainer() {
    return (

        <div className="container-fluid">
	        <div className="row">
	          	<div className="col-xs-12 text-center">
	          		<h2>Your Upcoming Plant Care Reminders</h2>
	          	</div>
	        </div>
	        <div className="row" id="calendar-wrap">
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">Su</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderSundayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">M</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderMondayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">Tu</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderTuesdayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">W</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderWednesdayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">Th</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderThursdayReminders()}
            </div>
	          <div className="pull-left calendar">
              <h5 className="calendar-day text-center">F</h5>
	          	{/*REMINDERS RENDER HERE*/}
              {this.renderFridayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">S</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderSaturdayReminders()}
            </div>
	        </div>	        
        </div>
    );
  }
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render() {
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (this.state.reminders.length===0) {
      
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
};

// Export the module back to the route
module.exports = Reminders;