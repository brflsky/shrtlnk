import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    const email = this.iEmail.value.trim();
    const password = this.iPass.value.trim();
    console.log(email, password);
    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState((state) => ({
          error: err.reason
        }));
      } else {
        this.setState({ error: '' });
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Link</h1>
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.onSubmit} className="boxed-view__form">
            <input type="text" ref={(input) => { this.iEmail = input; }} placeholder="email" />
            <input type="password" ref={(input) => { this.iPass = input; }} placeholder="password" />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Want account?</Link>
        </div>
      </div>
    );
  }
}

export default Login;
