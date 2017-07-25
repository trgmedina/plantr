// Include React as a dependency
const React = require("react");

const Link = require("react-router").Link;

// Create the Main component
class Main extends React.Component {

  render() {

    return (
        <div className="container-fluid" id="wrap">
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                {/*header*/}
                <h1 className="align-middle">Plantr<span className="fa fa-leaf fa"></span></h1>
              </div>
              {/*Navigation*/}
              <div className="row">
                <div className="col-md-1 col-xs-12" id="nav-column">
                    <div className="nav-icon">
                      <Link to="/app"><i className="fa fa-exclamation fa-lg hvr-bounce-in" aria-hidden="true"></i></Link>
                    </div>
                    {/*<div className="nav-icon">
                        <Link to="/app/Calendar"><i className="fa fa-calendar fa-lg hvr-bounce-in" aria-hidden="true"></i></Link>
                      </div>*/}
                    <div className="nav-icon">
                      <Link to="/app/Plants"><i className="fa fa-leaf fa-lg hvr-bounce-in" aria-hidden="true"></i></Link>
                    </div>
                    <div className="nav-icon">
                      <Link to="/app/AddPlant"><i className="fa fa-plus fa-lg hvr-bounce-in" aria-hidden="true" id="addsign"></i></Link>
                    </div>
                    <div className="nav-icon">
                      <a href="/Profile"><i className="fa fa-user fa-lg hvr-bounce-in" aria-hidden="true"></i></a>
                    </div>
                    <div className="nav-icon">
                      <a href="/logout" id="logout-btn"><i className="fa fa-sign-out fa-lg hvr-bounce-in" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div className="col-md-11 col-xs-12">
                  <div id="content-wrapper">
                      {/* Here we will deploy the sub components */}
                      {/* These sub-components are getting passed as this.props.children */}
                      {this.props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
    );
  }
};

// Export the module back to the route
module.exports = Main;