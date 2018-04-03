import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

class Signup extends React.Component {
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
    if (password.length < 3) {
      return this.setState({ error: 'Password should have at least 3 characters' });
    }
    console.log(email, password);
    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState((state) => ({
          error: err.reason
        }));
      } else {
        this.setState({ error: '' });
      }
    });

    // this.setState((state) => (
    //   { error: 'Something went wrong' }
    // ));
    return e; // to make eslint happy
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup Here</h1>
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.onSubmit} className="boxed-view__form" >
            <input type="text" ref={(input) => { this.iEmail = input; }} placeholder="email" />
            <input type="password" ref={(input) => { this.iPass = input; }} placeholder="password" />
            <button className="button" >Create Acount</button>
          </form>
          <Link to="/" >Have account?</Link>
        </div>

      </div>
    );
  }
}

export default Signup;
