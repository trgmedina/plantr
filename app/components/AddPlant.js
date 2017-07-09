// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
// var helpers = require("../utils/helpers");

// Create the Main component
var AddPlant = React.createClass({
  render: function() {

    return (
        <div className="container-fluid">
          <div className="row">
              <div className="col-xs-12 text-center">
                <h2>Add a Plant</h2>
              </div>
          </div>
          <div className="row">
              <div className="col-xs-8 col-xs-offset-2">
                <form>
                  <div id="addPlant-search">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for Plant Name..."></input>
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="button">Go!</button>
                        </span>
                      </div>
                  </div>
                  <div id="addPlant-remaining">
                    <div className="form-group">
                      <label htmlFor="nickname">Nickname</label>
                      <input type="text" className="form-control" id="nickname-input" aria-describedby="nickname" placeholder="Nickname"></input>
                      <small id="nickname-help" className="form-text text-muted">We'll use this name for your plant if you prefer.</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="plant-image">Image URL</label>
                      <input type="text" className="form-control" id="image-input" aria-describedby="image" placeholder="Nickname" required></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea className="form-control" id="description-input" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="origin">Plant Origin</label>
                      <input type="text" className="form-control" id="origin-input" aria-describedby="origin" placeholder="Origin"></input>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="light">Preferred Light</label>
                          <select className="form-control" id="light-input">
                            <option>Full Sun</option>
                            <option>Partial Sun</option>
                            <option>Bright Light</option>
                            <option>Shade</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="water">Preferred Watering Frequency</label>
                          <select className="form-control" id="water-input">
                            <option>Once a Day</option>
                            <option>Once a Week</option>
                            <option>Every Other Week</option>
                            <option>Once a Month</option>
                            <option>Infrequent</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <h5 className="text-center">Create a Water Reminder (optional)</h5>
                    <div className="row">
                      <div className="col-md-6 col-xs-12">
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
                      <div className="col-md-6 col-xs-12">
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
                    <button type="submit" className="btn btn-primary">Submit</button>
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