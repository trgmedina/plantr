// Include React as a dependency
const React = require("react");
import { Button, Popup } from 'semantic-ui-react'

const moment = require('moment');


// Include the Helper (for the saved recall)
const reminderHelpers = require("../utils/reminderHelpers");

// Create the Main component
class Reminders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      todaysDate: ""
    };
  }

    // When this component mounts, get all reminders
  componentDidMount() {
    let date = moment().format("dddd, MMMM Do YYYY");
    let dateToDisplay = "Today is " + date;
    reminderHelpers.getReminders().then(function(reminderData) {
      console.log("4. reminder data ", reminderData)
      this.setState({ 
        reminders: reminderData,
        todaysDate: dateToDisplay });
      // console.log("4. reminder data ", reminderData)
      this.setState({ reminders: reminderData });
      reminderHelpers.getCalendar(reminderData);
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
	          		<h2>Upcoming Plant Care Reminders</h2>
                {this.state.todaysDate}
	          	</div>
	        </div>
	        <div className="row" id="calendar-wrap">
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">SUN</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderSundayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">MON</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderMondayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">TUE</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderTuesdayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">WED</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderWednesdayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">THU</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderThursdayReminders()}
            </div>
	          <div className="pull-left calendar">
              <h5 className="calendar-day text-center">FRI</h5>
	          	{/*REMINDERS RENDER HERE*/}
              {this.renderFridayReminders()}
            </div>
            <div className="pull-left calendar">
              <h5 className="calendar-day text-center">SAT</h5>
              {/*REMINDERS RENDER HERE*/}
              {this.renderSaturdayReminders()}
            </div>
	        </div>
          <div>
            <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 text-center">
            <Popup
                trigger={<a href="./plantr_calendar.ics" download="plantr_calendar.ics"><Button size='huge' icon='add' color='olive' content='Export to iCalendar'/></a>}
                content='download ics'
                on='hover'
                size='huge'
              />
            </div>
            <div className="col-md-3"></div>  
             </div>
          </div>	        
        </div>
    );
  }

  render() {
    if (this.state.reminders.length===0) {
      
      return this.renderEmpty();
    }
    
    return this.renderContainer();
  }
};

// Export the module back to the route
module.exports = Reminders;