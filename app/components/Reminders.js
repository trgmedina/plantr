// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
var reminderHelpers = require("../utils/reminderHelpers");

// Create the Main component
var Reminders = React.createClass({

  getInitialState: function() {
    return { reminders: "" };
  },
    // When this component mounts, get all reminders
  componentDidMount: function() {
    reminderHelpers.getReminders().then(function(reminderData) {
      console.log("reminder data ", reminderData)

      this.setState({ reminders: reminderData });
    }.bind(this));
  },

   renderEmpty: function() {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>No reminders to display...</em>
          </span>
        </h3>
      </li>
    );
  },

  renderReminders: function() {
    return this.state.reminders.map(function(reminder, index) {

      return (
        <div key={index}>
          <div className="panel panel-default">
            <div className="panel-body">
              <span>
                <img src={reminder.imageURL} alt="{reminder.plant}" className="img-rounded reminder-img"></img>
                <p>{reminder.plant}</p>
              </span>
            </div>
            <div className="panel-footer">
              <span>
                <i className="fa fa-tint" aria-hidden="true"></i>
                Reminder to {reminder.type} on {reminder.days}, {reminder.date}
              </span>
            </div>
          </div>
        </div>
      );
    }.bind(this));
  },

  renderContainer: function() {
    return (
        <div className="container-fluid">
	        <div className="row">
	          	<div className="col-xs-12 text-center">
	          		<h2>This week's Plant Care Reminders</h2>
	          	</div>
	        </div>
	        <div className="row">
	          <div className="col-md-offset-2 col-md-8 col-xs-12">
	          	{/*REMINDERS RENDER HERE*/}
              {this.renderReminders()}
            </div>
	        </div>	        
        </div>
    );
  },
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render: function() {
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.state.reminders) {
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
});

// Export the module back to the route
module.exports = Reminders;