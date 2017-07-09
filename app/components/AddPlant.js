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
              <div className="col-xs-12">
                <form>
                  <div className="form-group">
                    <label for="plantName">Name of Plant</label>
                    <input type="text" class="form-control" id="name-input" aria-describedby="name" placeholder="Name" required></input>
                  </div>
                  <div className="form-group">
                    <label for="nickname">Nickname</label>
                    <input type="text" class="form-control" id="nickname-input" aria-describedby="nickname" placeholder="Nickname"></input>
                    <small id="nickname-help" class="form-text text-muted">We'll use this name for your plant if you prefer.</small>
                  </div>
                  <div className="form-group">
                    <label for="plant-image">Image URL</label>
                    <input type="text" class="form-control" id="image-input" aria-describedby="image" placeholder="Nickname" required></input>
                  </div>
                  <div className="form-group">
                    <label for="description">Description</label>
                    <textarea className="form-control" id="description-input" rows="3"></textarea>
                  </div>
                  <div className="form-group">
                    <label for="origin">Plant Origin</label>
                    <input type="text" class="form-control" id="origin-input" aria-describedby="origin" placeholder="Origin"></input>
                  </div>
                  <div className="form-group">
                    <label for="light">Preferred Light</label>
                    <select className="form-control" id="light-input">
                      <option>Full Sun</option>
                      <option>Partial Sun</option>
                      <option>Bright Light</option>
                      <option>Shade</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="exampleSelect2">Watering Frequency</label>
                    <select className="form-control" id="water-input">
                      <option>Once a Day</option>
                      <option>Once a Week</option>
                      <option>Every Other Week</option>
                      <option>Once a Month</option>
                      <option>Infrequent</option>
                    </select>
                  </div>
                  <fieldset className="form-group">
                    <legend>Create an alert</legend>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name="optionsCheck" id="sunday" value="Su"></input>
                        Su
                      </label>
                    </div>
                    <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name="optionsCheck" id="monday" value="monday"></input>
                        M
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name="optionsCheck" id="tuesday" value="tuesday"></input>
                        Tu
                      </label>
                    </div>
                    <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name="optionsCheck" id="wednesday" value="wednesday"></input>
                        W
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name="optionsCheck" id="thursday" value="thursday"></input>
                        Th
                      </label>
                    </div>
                    <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name="optionsCheck" id="friday" value="friday"></input>
                        F
                      </label>
                    </div>
                    <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name="optionsCheck" id="saturday" value="saturday"></input>
                        Sa
                      </label>
                    </div>
                  </fieldset>
                  <div className="form-group">
                    <label for="frequency">Frequency</label>
                    <select className="form-control" id="frequency-input">
                      <option></option>
                      <option>Every week</option>
                      <option>Every other week</option>
                      <option>Once every three weeks</option>
                      <option>Once a Month</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>          
            </div>
          </div>
    );
  }
});

// Export the module back to the route
module.exports = AddPlant;