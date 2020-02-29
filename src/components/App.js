import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import {handleInitialData} from './../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
          <Nav />
            {this.props.loading?null:
            <div>
              <Route path="/" exact component={Dashboard} />
              <Route path="/tweet/:id" exact component={TweetPage} />
              <Route path="/new" exact component={NewTweet} />
            </div>
            }
            
          </div> 
        </Fragment>  
      </Router>

    )
  }
}
const mapStateToProps = ({authUser}) => {
  return {
    loading: authUser===null
  }
}

export default connect(mapStateToProps)(App)