// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Create the Main component
var AddPlant = React.createClass({

  getInitialState: function() {
    return {
      name: "",
      description: "",
      origin: "",
      sunlightAmt: "",
      waterSchedule: "",
      imageURL: ""
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

  handleSubmit: function(event) {
    event.preventDefault();

    helpers.savePlant({
      name: this.state.name,
      description: this.state.description,
      origin: this.state.origin,
      sunlightAmt: this.state.sunlightAmt,
      waterSchedule: this.state.waterSchedule,
      imageURL: this.state.imageURL
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
                    <h4 className="text-center">Create a Reminder (optional)</h4>
                    <div className="row">
                      <div className="col-md-4 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="frequency">Type</label>
                          <select className="form-control" id="frequency-input">
                            <option></option>
                            <option>Water</option>
                            <option>Fertilize</option>
                            <option>Prune</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4 col-xs-12">
                        <div className="weekdays-selector form-group">
                          <label htmlFor="light">Day(s) of the week</label><br></br>
                          <input type="checkbox" id="weekday-mon" className="weekday" />
                          <label htmlFor="weekday-mon">M</label>
                          <input type="checkbox" id="weekday-tue" className="weekday" />
                          <label htmlFor="weekday-tue">T</label>
                          <input type="checkbox" id="weekday-wed" className="weekday" />
                          <label htmlFor="weekday-wed">W</label>
                          <input type="checkbox" id="weekday-thu" className="weekday" />
                          <label htmlFor="weekday-thu">T</label>
                          <input type="checkbox" id="weekday-fri" className="weekday" />
                          <label htmlFor="weekday-fri">F</label>
                          <input type="checkbox" id="weekday-sat" className="weekday" />
                          <label htmlFor="weekday-sat">S</label>
                          <input type="checkbox" id="weekday-sun" className="weekday" />
                          <label htmlFor="weekday-sun">S</label>
                        </div>
                      </div>
                      <div className="col-md-4 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="frequency">Frequency</label>
                          <select className="form-control" id="frequency-input">
                            <option></option>
                            <option>Every week</option>
                            <option>Every other week</option>
                            <option>Once every three weeks</option>
                            <option>Once a Month</option>
                          </select>
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