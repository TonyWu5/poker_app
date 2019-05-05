import React from 'react';
import axios from 'axios';

class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      sessions: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    if (this.state.isSubmitted) {
      return (
        <div>
          <h1>Sessions</h1>
          <div>
            {this.state.sessions.map(session => {
              return (
                <div key={session._id}>
                  <p>{session.location}</p>
                  <p>{session.buyin}</p>
                  <p>{session.tableLimit}</p>
                  <p>{session.cashout}</p>
                  <p>--------------------------</p>
                </div>
              )
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