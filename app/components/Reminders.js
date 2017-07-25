// Include React as a dependency
const React = require("react");
import { Button, Popup } from 'semantic-ui-react'
import Modal from 'react-modal';
import { browserHistory } from 'react-router';
const moment = require('moment');
const reminderHelpers = require("../utils/reminderHelpers");
const helpers = require("../utils/helpers");

const customStyles = {
  content : {
    position                   : 'absolute',
    top                        : '15%',
    left                       : '20%',
    right                      : '20%',
    bottom                     : '50%',
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
// Create the Main component
class Reminders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      todaysDate: "",
      savedPlants: [],
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

    // When this component mounts, get all reminders
  componentDidMount() {
    let date = moment().format("dddd, MMMM Do YYYY");
    let dateToDisplay = "Today is " + date;
    reminderHelpers.getReminders().then(function(reminderData) {
      helpers.getUserPlants().then(function(plantData) {
        this.setState({ 
          reminders: reminderData,
          todaysDate: dateToDisplay,
          savedPlants: plantData
          });
        if (plantData.length===0){
          this.setState({modalIsOpen:true})
        }
        reminderHelpers.getCalendar(reminderData);
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

  redirect() {
    browserHistory.push('/app/AddPlant/');
  }

  renderModal() {
    return (
      <li className="list-group-item">
        <Modal isOpen={this.state.modalIsOpen} 
        onAfterOpen={this.afterOpenModal} 
        onRequestClose={this.closeModal} 
        style={customStyles} 
        contentLabel="Example Modal">
          <span type="button" className="glyphicon glyphicon-remove modal-close hvr-bounce-in" aria-hidden="true" onClick={this.closeModal}></span>
          <h2 className="text-center">Hello There!</h2>
          <span className="text-center">
            You do not have any saved plants. Click 
            <i className="fa fa-plus fa-lg" aria-hidden="true"/>
            in the navigation menu or the button below to add a plant and get started using Plantr!</span>
          <button type="button" className="btn btn-success modal-button" onClick={(e)=>{ e.preventDefault(); this.closeModal(); this.redirect() }}>Add a Plant</button>
        </Modal>
        <h3>
          <span>
            <em>No upcoming reminders to display...</em>
          </span>
        </h3>
      </li>
    )
  }

  redirect() {
    browserHistory.push('/app/AddPlant/');
  }

  renderEmpty() {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>No upcoming reminders to display...</em>
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

        <div className="row">
	        <div className="row">
	          	<div className="col-xs-12 text-center">
	          		<h2>Upcoming Plant Care Reminders</h2>
                <p id="todays-date">{this.state.todaysDate}</p>
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
      if (this.state.savedPlants.length===0) {
        return this.renderModal()
      }
      return this.renderEmpty();
    }
    
    return this.renderContainer();
    
  }
};

// Export the module back to the route
module.exports = Reminders;