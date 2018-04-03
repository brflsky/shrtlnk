import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

class LinksListFilters extends React.Component {
  state = {
    showVisible: true
  }
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      this.setState({ showVisible: Session.get('showVisible') });
    });
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  render() {
    console.log(this.state.showVisible);
    return (
      <div>
        <label className="checkbox">
          <input
            className="checkbox__box"
            type="checkbox"
            onChange={(e) => {
              Session.set('showVisible', !e.target.checked);
              // this.setState({ showVisible: !e.target.checked });
            }}
            checked={!this.state.showVisible}
          />
          Show hidden links
        </label>
      </div>
    );
  }
}

export default LinksListFilters;
