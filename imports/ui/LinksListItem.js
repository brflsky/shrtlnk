import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

class LinkListItem extends React.Component {
  state = {
    copied: false
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.btn);
    this.clipboard.on('success', (e) => {
      console.log(this.state.copied);
      this.setState({ copied: true });
      console.log(this.state.copied);
      setTimeout(() => this.setState({ copied: false }), 1500);
      e.clearSelection();
    }).on('error', () => {});
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats = (lastVisitidAt, visitidCount) => {
    return (
      <p className="item__message">Visitid: {visitidCount} time(s) {visitidCount !== 0 &&
        <span>- last {moment(lastVisitidAt).fromNow()}</span>}
      </p>
    );
  }
  render() {
    console.log(this.state.copied);
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortURL}</p>
        {this.renderStats(this.props.lastVisitidAt, this.props.visitidCount)}
        <a href={this.props.shortURL} target="_blank" className="button button--pill button--link">Visit</a>
        <button
          className="button button--pill"
          data-clipboard-text={this.props.shortURL}
          ref={(button) => { this.btn = button; }}
        >{this.state.copied ? 'copied' : 'copy'}
        </button>
        <button
          onClick={() => {
            Meteor.call('links.setVisible', this.props._id, !this.props.visible);
          }}
          className="button button--pill"
        >{this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}



LinkListItem.propTypes = {
  // _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortURL: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitidCount: PropTypes.number.isRequired,
  lastVisitidAt: PropTypes.number
  // userId: PropTypes.string.isRequired
};

export default LinkListItem;
