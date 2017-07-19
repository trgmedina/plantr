// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
var reminderHelpers = require("../utils/reminderHelpers");

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

  renderReminders() {
    return this.state.reminders.map(function(reminder, index) {
      console.log(reminder);

      return (
        <div key={index}>
          <div className="panel panel-default">
            <div className="panel-body">
              <span>
                <img src={reminder.imageURL} alt="{reminder.plant}" className="img-rounded reminder-img pull-left"></img>
                <p>Reminder to {reminder.type} {reminder.plant} on {reminder.day}, {reminder.date}</p>
              </span>
            </div>
          </div>
        </div>
      );
    }.bind(this));
  }

  renderContainer() {
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