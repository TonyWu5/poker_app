import React from 'react';
import Form from './Form';
import axios from 'axios';

class Button extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      location: '',
      buyin: '',
      tableLimit: '',
      cashout: '',
      isSubmitted: false,
      session: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onUserSubmit = this.onUserSubmit.bind(this);
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onUserSubmit(event) {
    // const session = {
    //   location: event.target.location
    // }
    const session = {
      location: this.state.location,
      buyin: this.state.buyin,
      tableLimit: this.state.tableLimit,
      cashout: this.state.cashout,
    };
    
    // console.log(event.target);
    axios.post('/sessions', session)
      .then(res => {
        this.setState({
          ['isSubmitted']: true,
        });
      });
    event.preventDefault();
  }

  render() {
    if (this.state.isSubmitted) {
      return (
        <Form />
      );
    }

    return (
      <div>
        <form onSubmit={this.onUserSubmit}>
          Location:<br />
          <input 
            type="text" 
            name="location" 
            value={this.state.location} 
            onChange={this.handleChange} />
          <br />
          Buy-in:<br />
          <input 
            type="text" 
            name="buyin" 
            value={this.state.buyin}
            onChange={this.handleChange} />
          <br />
          Table Limit:<br />
          <input
            type="text"
            name="tableLimit" 
            value={this.state.tableLimit}
            onChange={this.handleChange} />
          <br />
          Cash Out:<br />
          <input
            type="text"
            name="cashout" 
            value={this.state.cashout} 
            onChange={this.handleChange} />
          <br />
          <input 
            type="submit" 
            value="Submit" />    
        </form>
      </div>
    );
  }
}

export default Button;
