// Include React as a dependency
const React = require("react");
import { Rating } from 'semantic-ui-react'

// Include the Helper (for the saved recall)
const profileHelpers = require("../utils/profileHelpers");

import Modal from 'react-modal';

const moment = require('moment');

const customStyles = {
  content : {
    position                   : 'absolute',
    top                        : '10%',
    left                       : '30%',
    right                      : '30%',
    bottom                     : '20%',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  },
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(229, 255, 242, 0.75)'
  },
}

class PlantProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plant: [],
      reminders: [],
      newReminder: {
        reminderType: "",
        days: [],
        frequency: "",
        created: ""
      },
      modalIsOpen: false,
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    var id = this.props.params.id
    profileHelpers.getPlantInfo(id).then(function(data) {
      this.setState({ 
        plant: data[0],
        reminders: data[1]
      });
    }.bind(this));
  }

  handleClick (reminder) {
    var reminderId = reminder.id;
    var id = this.props.params.id
    // Delete the reminder
    profileHelpers.deleteSaved(reminderId).then(function() {

      // Get the revised data
      profileHelpers.getPlantInfo(id).then(function(data) {
        this.setState({ 
          plant: data[0],
          reminders: data[1] 
        });
      }.bind(this));

    }.bind(this));
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleReminders(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;
    let addReminder = Object.assign({}, this.state.newReminder);

    if (name === "reminderType") {
      addReminder.reminderType = value;
    }
    else if (name === "days") {
      addReminder.days.push(value);
    }
    else if (name === "frequency") {
      addReminder.frequency = value;
    }
    
    addReminder.created = moment().format("MM-DD-YYYY");

    this.setState({
      newReminder: addReminder
    })
    console.log("from handlereminders: addReminder", addReminder)
  }

  handleSubmit() {
    let plantId = this.props.params.id
    let reminder = this.state.newReminder

    profileHelpers.saveReminder(reminder, plantId).then(function() {
      profileHelpers.getPlantInfo(plantId).then(function(data) {
        this.setState({ 
          plant: data[0],
          reminders: data[1] 
        });
      }.bind(this));

    }.bind(this));
  }

  newReminderModal() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.openModal}>Create New</button>
        <Modal isOpen={this.state.modalIsOpen} 
        onAfterOpen={this.afterOpenModal} 
        onRequestClose={this.closeModal} 
        style={customStyles} 
        contentLabel="Example Modal">
          <h2 className="text-center">New Reminder</h2>
          <span type="button" className="glyphicon glyphicon-remove modal-close hvr-bounce-in" aria-hidden="true" onClick={this.closeModal}></span>
          <form>
            <div className="row">
              <div className="form-group">
                <label>Type
                  <select name="reminderType"
                  className="reminders form-control" 
                  id="frequency-input"
                  onChange={this.handleReminders.bind(this)}
                  value={this.state.value}>
                    <option></option>
                    <option value="Water">Water</option>
                    <option value="Fertilize">Fertilize</option>
                    <option value="Prune">Prune</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="weekdays-selector form-group">
                <label>Day(s) of the week</label><br></br>
                <input 
                  name="days"
                  type="checkbox" 
                  id="weekday-sun" 
                  className="reminders weekday" 
                  onChange={this.handleReminders.bind(this)}
                  value="Sunday" />
                <label htmlFor="weekday-sun">SUN</label>
                <input 
                  name="days"
                  type="checkbox" 
                  id="weekday-mon" 
                  className="reminders weekday" 
                  onChange={this.handleReminders.bind(this)}
                  value="Monday" />
                <label htmlFor="weekday-mon">MON</label>
                <input 
                  name="days"
                  type="checkbox" 
                  id="weekday-tue" 
                  className="reminders weekday" 
                  onChange={this.handleReminders.bind(this)}
                  value="Tuesday" />
                <label htmlFor="weekday-tue">TUE</label>
                <input 
                  name="days"
                  type="checkbox" 
                  id="weekday-wed" 
                  className="reminders weekday" 
                  onChange={this.handleReminders.bind(this)}
                  value="Wednesday" />
                <label htmlFor="weekday-wed">WED</label>
                <input 
                  name="days"
                  type="checkbox" 
                  id="weekday-thu" 
                  className="reminders weekday" 
                  onChange={this.handleReminders.bind(this)}
                  value="Thursday" />
                <label htmlFor="weekday-thu">TUE</label>
                <input 
                  name="days"
                  type="checkbox" 
                  id="weekday-fri" 
                  className="reminders weekday" 
                  onChange={this.handleReminders.bind(this)}
                  value="Friday" />
                <label htmlFor="weekday-fri">FRI</label>
                <input 
                  name="days"
                  type="checkbox" 
                  id="weekday-sat" 
                  className="reminders weekday" 
                  onChange={this.handleReminders.bind(this)}
                  value="Saturday" />
                <label htmlFor="weekday-sat">SAT</label>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label>Frequency
                  <select 
                    name="frequency"
                    className="reminders form-control" 
                    id="frequency-input"
                    onChange={this.handleReminders.bind(this)}
                    value={this.state.value}>
                    <option></option>
                    <option value="Every week">Every week</option>
                    <option value="Every other week">Every other week</option>
                    <option value="Once a month">Once a month</option>
                  </select>
                </label>
              </div>
            </div>
            <button type="button" className="btn btn-success modal-button" onClick={(e)=>{ e.preventDefault(); this.closeModal(); this.handleSubmit() }}>Save</button>
          </form>
        </Modal>
      </div>
    )
  }
  renderEmpty() {
    return (
      <div>
        <p className="text-center">No saved reminders</p>
      </div>
    );
  }

  render () {
    return (
      <div className="row">

        <div className="col-xs-12 col-md-6">
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
                
        <div className="col-xs-12 col-md-6">
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
          <div className="panel panel-success" id="reminder-prof-panel">
            <div className="panel-heading">
              Plant Care Reminders
            </div>
            <ul className="list-group">
              {/*REMINDERS RENDER HERE*/}
              {this.renderReminders()}

              {this.newReminderModal()}
            </ul>
          </div>
          <div className="panel panel-success" id="rating-panel">
            <div className="panel-heading">
              Rate This Plant
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                <Rating maxRating={5} defaultRating={0} icon='star' size='massive' /><br/>
                <a className="text-center" href="#">Write a Review</a>
              </li>
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
        <div>
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
        </div>
      )
    }.bind(this));
  }
}
// Export the module back to the route
module.exports = PlantProfile;