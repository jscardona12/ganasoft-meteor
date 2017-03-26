import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Fincas = new Mongo.Collection('fincas');

if (Meteor.isServer) {
  Meteor.publish('fincas', function farmsPublication() {
    return Fincas.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'fincas.insert'(name) {
    check(name, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Fincas.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
    });
  },
  'fincas.remove'(taskId) {
    console.log(taskId);
    //check(taskId, String);


    const task = Fincas.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Fincas.remove(taskId);
  },
});
