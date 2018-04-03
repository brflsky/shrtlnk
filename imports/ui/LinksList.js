import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import FlipMove from 'react-flip-move';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import LinkListItem from './LinksListItem';

class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount = () => {
    console.log('Component did mount LinkList');
    Meteor.subscribe('links');
    this.linksTracker = Tracker.autorun(() => {
      const links = Links.find({ visible: Session.get('showVisible') }).fetch();
      this.setState({ links });
      // console.log(links);
    });
  }
  // componentDidUpdate = (prevProps, prevState) => {
  //   console.log('componentDidUpdate');
  //   if (prevState.showVisible !== this.state.showVisible) {
  //     const links = Links.find({ visible: this.state.showVisible }).fetch();
  //     this.setState({ links });
  //   }
  // }
  componentWillUnmount = () => {
    console.log('Component will unmount LinkList');
    this.linksTracker.stop();
  }
  renderLinkList = () => {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>
      );
    }
    return this.state.links.map((link) => {
      const shortURL = Meteor.absoluteUrl(link._id);
      return <LinkListItem key={link._id} {...link} shortURL={shortURL} />;
    });
  }



  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight>
          {this.renderLinkList()}
        </FlipMove>
      </div>
    );
  }
}
export default LinksList;
