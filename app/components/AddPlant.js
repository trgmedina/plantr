// Include React as a dependency
var React = require("react");
import { browserHistory } from 'react-router';

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

helpers.getPlantsNames();

var moment = require('moment');
// Create the Main component
var AddPlant = React.createClass({

  getInitialState: function() {
    return {
      name: "",
      nickname: "",
      description: "",
      origin: "",
      sunlightAmt: "",
      waterSchedule: "",
      imageURL: "",
      specialCare: "",
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
    
    newReminder.created = moment().format("MM-DD-YYYY");

    this.setState({
      reminders: newReminder
    })
  },

  handleSearchSubmit: function(event){
    event.preventDefault();
    var searchName = this.state.searchPlant;
    
    helpers.searchPlant(searchName)
    .then(function(res){
      this.setState({ 
        name: res.name,
        description: res.description,
        origin: res.origin,
        sunlightAmt: res.sunlightAmt,
        waterSchedule: res.waterSchedule,
        specialCare: res.specialCare,
        imageURL: res.imageURL
      })
    }.bind(this));
  },

  handleSubmit: function(event) {
    event.preventDefault();

    helpers.savePlant({
      name: this.state.name,
      nickname: this.state.nickname,
      description: this.state.description,
      origin: this.state.origin,
      sunlightAmt: this.state.sunlightAmt,
      waterSchedule: this.state.waterSchedule,
      imageURL: this.state.imageURL, 
      specialCare: this.state.specialCare,
      reminders: this.state.reminders
    })
      .then(function(res) {
        console.log("Posted to MongoDB");
        
        browserHistory.push('/app/plants/');
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
                      <div className="row">
                        <div className="col-xs-12"> 
                          <div id="addPlant-search">
                            <div className="input-group">
                              <input 
                                  name="searchPlant" 
                                  id="search-input" 
                                  onChange={this.handleChange}
                                  value={this.state.value} 
                                  type="text"
                                  className="awesomplete form-control" 
                                  list="mylist" 
                                  placeholder="Search for Plant Name..."/>
                                <datalist id="mylist">
                                        <option>Aloe Vera</option>
                                        <option>African Violet</option>
                                        <option>Arrowhead Plant</option>
                                        <option>Asparagus Fern</option>
                                        <option>Begonia</option>
                                        <option>Cactus</option>
                                        <option>Chinese Evergreen</option>
                                        <option>Elephant's Ear</option>
                                        <option>English Ivy</option>
                                        <option>Grape Ivy Plant</option>
                                        <option>Heartleaf Philodendron</option>
                                        <option>Holly Fern</option>
                                        <option>Geranium</option>
                                        <option>Iresine herbstii</option>
                                        <option>Lucky Bamboo</option>
                                        <option>Hawaiian Tropical Flowers</option>
                                        <option>Kentia Palm</option>
                                        <option>Ornamental Pepper Plant</option>
                                        <option>Papyrus Plant</option>
                                        <option>Rubber Plant</option>
                                        <option>Venus Fly Trap</option>
                                        <option>Zebra Plant</option>
                                        <option>Swedish Ivy</option>
                                        <option>Snapdragon (Antirrhinum)</option>
                                        <option>Wax Plant (Hoya Carnosa)</option>
                                        <option>Yucca</option>
                                        <option>Snake Plant</option>
                                        <option>ZZ Plant</option>
                                        <option>Weeping Fig Tree</option>
                                </datalist>
                                <span className="input-group-btn">
                                  <button className="btn btn-default" onClick={this.handleSearchSubmit} type="button">Add!</button>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-6">
                            <div> 
                              <label>
                                Name
                                <input
                                  name="name" 
                                  type="text"
                                  className="form-control"
                                  id="nickname-input"
                                  onChange={this.handleChange}
                                  value={this.state.name||this.state.value}
                                  placeholder="Name">
                                </input>
                              </label>
                            </div>
                          </div>
                          <div className="col-xs-6">
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
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-6">    
                            <div>
                              <label>
                                Image URL
                                <input 
                                  name="imageURL"
                                  type="text" 
                                  className="form-control" 
                                  id="image-input" 
                                  onChange={this.handleChange}
                                  value={this.state.imageURL||this.state.value}
                                  placeholder="Image URL" 
                                  required>
                                </input>
                              </label>
                            </div>
                          </div>
                        <div className="col-xs-6"> 
                          <div>
                            <label>
                              Plant Origin
                              <input 
                                name="origin"
                                type="text" 
                                className="form-control" 
                                id="origin-input" 
                                onChange={this.handleChange}
                                value={this.state.origin||this.state.value}
                                placeholder="Origin">
                              </input>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-12">     
                          <div>
                            <label>
                              Description
                              <textarea
                                name="description"
                                type="text"
                                className="form-control" 
                                id="description-input" 
                                onChange={this.handleChange}
                                value={this.state.description||this.state.value}
                                placeholder="Add Description Here"
                                rows="3"
                                required>
                              </textarea>
                            </label>
                          </div>
                        </div>
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
                                <option>{this.state.sunlightAmt}</option>
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
                                <option>{this.state.waterSchedule}</option>
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
                      <div className="row">
                        <div className="col-xs-12">
                          <div className="form-group">
                            <label htmlFor="additional">Additional Special Care Instructions</label>
                            <textarea
                              name="specialCare"
                              type="text"
                              className="form-control"
                              id="additional-input"
                              onChange={this.handleChange}
                              rows="3"
                              value={this.state.specialCare||this.state.value}>
                            </textarea>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-center">Create a Plant Care Reminder</h4>
                      <small className="form-text text-muted">
                        You will be able to delete or create additional reminders from your plant's info page.
                      </small>
                      <div className="row">
                        <div className="col-md-6 col-xs-12">
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

                        <div className="col-md-6 col-xs-12">
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

                        <div className="col-xs-12">
                          <div className="weekdays-selector form-group">
                            <label className="text-left" id="check-label">Day(s) of the week</label>
                              <input 
                                name="days"
                                type="checkbox" 
                                id="weekday-sun" 
                                className="reminders-weekday" 
                                onChange={this.handleReminders}
                                value="Sunday" />
                              <label htmlFor="weekday-sun">SUN</label>
                              <input 
                                name="days"
                                type="checkbox" 
                                id="weekday-mon" 
                                className="reminders-weekday" 
                                onChange={this.handleReminders}
                                value="Monday" />
                              <label htmlFor="weekday-mon">MON</label>
                              <input 
                                name="days"
                                type="checkbox" 
                                id="weekday-tue" 
                                className="reminders-weekday" 
                                onChange={this.handleReminders}
                                value="Tuesday" />
                              <label htmlFor="weekday-tue">TUE</label>
                              <input 
                                name="days"
                                type="checkbox" 
                                id="weekday-wed" 
                                className="reminders-weekday" 
                                onChange={this.handleReminders}
                                value="Wednesday" />
                              <label htmlFor="weekday-wed">WED</label>
                              <input 
                                name="days"
                                type="checkbox" 
                                id="weekday-thu" 
                                className="reminders-weekday" 
                                onChange={this.handleReminders}
                                value="Thursday" />
                              <label htmlFor="weekday-thu">THU</label>
                              <input 
                                name="days"
                                type="checkbox" 
                                id="weekday-fri" 
                                className="reminders-weekday" 
                                onChange={this.handleReminders}
                                value="Friday" />
                              <label htmlFor="weekday-fri">FRI</label>
                              <input 
                                name="days"
                                type="checkbox" 
                                id="weekday-sat" 
                                className="reminders-weekday" 
                                onChange={this.handleReminders}
                                value="Saturday" />
                              <label htmlFor="weekday-sat">SAT</label>
                          </div>
                        </div>
                      </div>
                      <a href="/app"><button onClick={this.handleSubmit} type="submit" className="btn btn-success">Submit</button></a>
                    </form>          
              </div>
            </div>
          </div>
        );
      }
    });

// Export the module back to the route
module.exports = AddPlant;