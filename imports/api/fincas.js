/**
 * Created by Juan on 16/03/2017.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const farms = new Mongo.Collection('fincas');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('fincas', function tasksPublication() {
        return farms.find({
            $or: [
                { owner: this.userId },
            ],
        });
    });
}
Meteor.methods({
    'fincas.insert'(text) {
        check(name, size);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            size,
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'fincas.remove'(fincaId) {
        check(fincaId, String);
        const finca = farms.findOne(taskId);
        if (task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }


        farms.remove(fincaId);
    },


});