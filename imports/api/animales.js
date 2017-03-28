
/**s
 * Created by Juan on 16/03/2017.
 */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Animales = new Mongo.Collection('animales');

if (Meteor.isServer) {
  Meteor.publish('animales', function animalsPublication(finca) {
    return Animales.find({
      $or: [
        { farm: finca },
      ],
    });
  });
}

Meteor.methods({
  'animales.insert'(farm, number, especie, raza, sexo, foto, descripcion) {
    check(number, Number);
    check(especie, String);
    check(raza, String);
    check(sexo, String);
    check(foto, String);
    check(descripcion, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Animales.insert({
      farm,
      number,
      especie,
      raza,
      sexo,
      foto,
      descripcion,
      fechaNacimiento: new Date(),
      owner: this.userId
    });
  },
  'animales.remove'(animalId) {
    console.log(animalId);
    //check(taskId, String);


    const task = Animales.findOne(animalId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Animales.remove(animalId);
  },
});
