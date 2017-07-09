// Include React as a dependency
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
// https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
var Link = require("react-router").Link;

// Create the Main component
var Main = React.createClass({

  render: function() {

    return (
        <div className="container-fluid" id="wrap">
            {/*header*/}
            <div className="row" id="header">
              <div className="col-xs-10">
                <h1 className="navbar-left">Plant App</h1>
              </div>
              <div className="col-xs-2">
                <a href="#" className="navbar-right">LOGOUT</a>
              </div>
            </div>

            {/*Navigation*/}
            <div className="row">
              <div className="col-xs-1" id="navbar">
                <div>
                  <Link to="/Reminders"><i className="fa fa-exclamation fa-2x" aria-hidden="true"></i></Link>
                </div>
                <div>
                  <Link to="/Calendar"><i className="fa fa-calendar fa-2x" aria-hidden="true"></i></Link>
                </div>
                <div>
                  <Link to="/Plants"><i className="fa fa-leaf fa-2x" aria-hidden="true"></i></Link>
                </div>
                <div>
                  <Link to="/AddPlant"><i className="fa fa-plus fa-2x" aria-hidden="true"></i></Link>
                </div>
              </div>
            <div className="col-xs-11" id="content-wrapper">
              {/* Here we will deploy the sub components */}
              {/* These sub-components are getting passed as this.props.children */}
              {this.props.children}
            </div>
        </div>

          {/*footer*/}
          <div className="row">
            <footer className="footer">
              <div className="col-xs-offset-4 col-xs-4">
                <p className="text-center">&copy; 2017 Plant App</p>
              </div>
              <div className="col-xs-4">
                <span className="pull-right">
                  <a href="#"><i className="fa fa-info-circle" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-github-alt" aria-hidden="true"></i></a>
                </span>
              </div>
            </footer>
          </div>
      </div>
    );
  }
});

// Export the module back to the route
module.exports = Main;