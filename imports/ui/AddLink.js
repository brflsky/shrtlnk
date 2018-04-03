import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit = (e) => {
    const { url } = this.state;
    console.log(url);
    e.preventDefault();
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  };
  onChange = (e) => {
    this.setState({
      url: e.target.value.trim()
    });
  }
  handleModalClose = () => {
    this.setState({ isOpen: false, url: '', error: '' });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ isOpen: true })} className="button" >+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => { this.inputUrl.focus(); }}
          onRequestClose={this.handleModalClose}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.onSubmit} className="boxed-view__form">
            <input
              ref={(input) => { this.inputUrl = input; }}
              type="text"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange}
            />
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={() => this.handleModalClose()}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}

// const AddLinks = () => {
//   const onSubmit = (e) => {
//     const url = this.inputURL.value.trim();
//     e.preventDefault();
//     if (url) {
//       Meteor.call('links.insert', url, (err, res) => {
//         if (err) {
//           console.log('ERR', err);
//         } else {
//           this.inputURL.value = '';
//         }
//       });
//     }
//   };
//   return (
//     <div>
//       <p>Add Link</p>
//       <form onSubmit={onSubmit}>
//         <input type="text" placeholder="URL" ref={(input) => { this.inputURL = input; }} />
//         <button>Add Link</button>
//       </form>
//     </div>
//   );
// };

export default AddLink;
