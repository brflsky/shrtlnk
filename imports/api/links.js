import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({
      userId: this.userId
    });
  });
}

Meteor.methods({
  'links.insert': function (url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authenticaded');
    }

    new SimpleSchema({
      url: {
        label: 'Your link',
        type: String,
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({
      url
    });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitidCount: 0,
      lastVisitidAt: null
    });
  },
  'links.setVisible': function (_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authenticaded');
    }
    new SimpleSchema({
      _id: {
        label: 'User ID',
        type: String
      },
      visible: {
        type: Boolean
      }
    }).validate({
      _id, visible
    });
    Links.update({ _id, userId: this.userId }, { $set: { visible } });
  },
  'links.trackVisit': function (_id) {
    new SimpleSchema({
      _id: {
        label: 'User ID',
        type: String
      }
    }).validate({
      _id
    });
    Links.update({ _id }, { $set: { lastVisitidAt: Date.now() }, $inc: { visitidCount: 1 } });
  }
});
