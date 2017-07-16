// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

helpers.getPlantsNames();

// Create the Main component
var AddPlant = React.createClass({

  getInitialState: function() {
    return {
      name: "",
      description: "",
      origin: "",
      sunlightAmt: "",
      waterSchedule: "",
      imageURL: "",
      reminders: {
        reminderType: "",
        days: [],
        frequency: "",
        created: ""
      }
    }
  },

  handleChange: function(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  },

  handleReminders: function(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newReminder = Object.assign({}, this.state.reminders);

    if (name === "reminderType") {
      newReminder.reminderType = value;
    }
    else if (name === "days") {
      newReminder.days.push(value);
    }
    else if (name === "frequency") {
      newReminder.frequency = value;
    }
    else {
      newReminder.created = new Date();
    }

    this.setState({
      reminders: newReminder
    })
  },

  handleSubmit: function(event) {
    event.preventDefault();

    helpers.savePlant({
      name: this.state.name,
      description: this.state.description,
      origin: this.state.origin,
      sunlightAmt: this.state.sunlightAmt,
      waterSchedule: this.state.waterSchedule,
      imageURL: this.state.imageURL, 
      reminders: this.state.reminders
    })
      .then(function() {
        console.log("Posted to MongoDB");
      })
  },

  render: function() {

    return (
        <div className="container-fluid">
          <div className="row">
              <div className="col-xs-12 text-center">
                <h2>Add a Plant</h2>
              </div>
          </div>
          <div className="row">
              <div className="col-xs-10 col-xs-offset-1">
                <form onSubmit={this.handleSubmit}>
                  <div id="addPlant-search">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for Plant Name..."></input>
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="button">Go!</button>
                        </span>
                      </div>
                  </div>
                  <div id="addPlant-remaining">
                    <div>
                      <label>
                        Name
                        <input
                          name="name" 
                          type="text"
                          className="form-control"
                          id="nickname-input"
                          onChange={this.handleChange}
                          value={this.state.value}
                          placeholder="Name of Plant (if new)">
                        </input>
                      </label>
                    </div>
                    <div>
                      <label>
                        Nickname
                        <input
                          name="nickname" 
                          type="text"
                          className="form-control"
                          id="nickname-input"
                          onChange={this.handleChange}
                          value={this.state.value}
                          placeholder="Nickname">
                        </input>
                        <small id="nickname-help" className="form-text text-muted">We'll use this name for your plant if you prefer.</small>
                      </label>
                    </div>
                    <div>
                      <label>
                        Image URL
                        <input 
                          name="imageURL"
                          type="text" 
                          className="form-control" 
                          id="image-input" 
                          onChange={this.handleChange}
                          value={this.state.value}
                          placeholder="Image URL" 
                          required>
                        </input>
                      </label>
                    </div>
                    <div>
                      <label>
                        Description
                        <textarea
                          name="description"
                          type="text"
                          className="form-control" 
                          id="description-input" 
                          onChange={this.handleChange}
                          value={this.state.value}
                          placeholder="Add Description Here"
                          rows="3"
                          required>
                        </textarea>
                      </label>
                    </div>
                    <div>
                      <label>
                        Plant Origin
                        <input 
                          name="origin"
                          type="text" 
                          className="form-control" 
                          id="origin-input" 
                          onChange={this.handleChange}
                          value={this.state.value}
                          placeholder="Origin">
                        </input>
                      </label>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label>
                            Preferred Light
                            <select 
                              name="sunlightAmt"
                              className="form-control" 
                              id="light-input" 
                              onChange={this.handleChange}
                              value={this.state.value}>
                              <option></option>
                              <option value="Full Sun">Full Sun</option>
                              <option value="Partial Sun">Partial Sun</option>
                              <option value="Bright Light">Bright Light</option>
                              <option value="Shade">Shade</option>
                          </select>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label>
                            Preferred Watering Frequency
                            <select 
                              name="waterSchedule"
                              className="form-control" 
                              id="water-input"
                              onChange={this.handleChange}
                              value={this.state.value}>
                              <option></option>
                              <option value="Once a Day">Once a Day</option>
                              <option value="Once a Week">Once a Week</option>
                              <option value="Every Other Week">Every Other Week</option>
                              <option value="Once a Month">Once a Month</option>
                              <option value="Infrequent">Infrequent</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="additional">Additional Special Care Instructions</label>
                      <textarea className="form-control" id="additional-input" rows="3"></textarea>
                    </div>
                    <h4 className="text-center">Create a Reminder</h4>
                    <div className="row">
                      <div className="col-md-4 col-xs-12">
                        <div className="form-group">
                          <label>Type
                            <select 
                              name="reminderType"
                              className="reminders form-control" 
                              id="frequency-input"
                              onChange={this.handleReminders}
                              value={this.state.value}>
                              <option></option>
                              <option value="Water">Water</option>
                              <option value="Fertilize">Fertilize</option>
                              <option value="Prune">Prune</option>
                            </select>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4 col-xs-12">
                        <div className="weekdays-selector form-group">
                          <label>Day(s) of the week</label><br></br>
                          <input 
                            name="days"
                            type="checkbox" 
                            id="weekday-mon" 
                            className="reminders weekday" 
                            onChange={this.handleReminders}
                            value="Monday" />
                          <label htmlFor="weekday-mon">M</label>
                          <input 
                            name="days"
                            type="checkbox" 
                            id="weekday-tue" 
                            className="reminders weekday" 
                            onChange={this.handleReminders}
                            value="Tuesday" />
                          <label htmlFor="weekday-tue">T</label>
                          <input 
                            name="days"
                            type="checkbox" 
                            id="weekday-wed" 
                            className="reminders weekday" 
                            onChange={this.handleReminders}
                            value="Wednesday" />
                          <label htmlFor="weekday-wed">W</label>
                          <input 
                            name="days"
                            type="checkbox" 
                            id="weekday-thu" 
                            className="reminders weekday" 
                            onChange={this.handleReminders}
                            value="Thursday" />
                          <label htmlFor="weekday-thu">T</label>
                          <input 
                            name="days"
                            type="checkbox" 
                            id="weekday-fri" 
                            className="reminders weekday" 
                            onChange={this.handleReminders}
                            value="Friday" />
                          <label htmlFor="weekday-fri">F</label>
                          <input 
                            name="days"
                            type="checkbox" 
                            id="weekday-sat" 
                            className="reminders weekday" 
                            onChange={this.handleReminders}
                            value="Saturday" />
                          <label htmlFor="weekday-sat">S</label>
                          <input 
                            name="days"
                            type="checkbox" 
                            id="weekday-sun" 
                            className="reminders weekday" 
                            onChange={this.handleReminders}
                            value="Sunday" />
                          <label htmlFor="weekday-sun">S</label>
                        </div>
                      </div>
                      <div className="col-md-4 col-xs-12">
                        <div className="form-group">
                          <label>Frequency
                            <select 
                              name="frequency"
                              className="reminders form-control" 
                              id="frequency-input"
                              onChange={this.handleReminders}
                              value={this.state.value}>
                              <option></option>
                              <option value="Every week">Every week</option>
                              <option value="Every other week">Every other week</option>
                              <option value="Once a month">Once a month</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
              </form>          
            </div>
          </div>
        </div>
    );
  }
});

// Export the module back to the route
module.exports = AddPlant;