import React from 'react';
import axios from 'axios';
import '../../public/styles.css';

class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      activeSession: -1,
      sessions: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit() {
    this.setState({
      ['isSubmitted']: true,
    });
    axios.get('/sessions')
      .then(res => {
        const sessions = res.data;
        this.setState({
          ['sessions']: sessions,
        });
      });
    event.preventDefault();
  }

  handleClick(id) {
    this.setState({
      ['activeSession']: id
    });
  }

  render() {
    if (this.state.isSubmitted) {
      return (
        <div>
          <h1>Sessions</h1>
          <div>
            {this.state.sessions.map(session => {
              return (
                <div 
                  onClick={() => {this.handleClick(session._id)}} 
                  className={this.state.activeSession === session._id ? 'sessionClicked' : 'session'} 
                  key={session._id}>
                  <p>Location: {session.location}</p>
                  <p>Buy-in amount: {session.buyin}</p>
                  <p>Stakes: {session.tableLimit} no-limit</p>
                  <p>Cashed Out: {session.cashout}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Submit" /> 
        </form>
      </div>
    );
  }
}

export default Sessions;
