/**s
 * Created by Juan on 16/03/2017.
 */

import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Animales = new Mongo.Collection('animales');

if (Meteor.isServer) {
    Meteor.publish('animales', function animalsPublication() {
        return Animales.find({
            $or: [
                {owner: this.userId},
            ],
        });
    });
}

// se recomienda cambiar el codigo ejemplo por variables que tengan relacion con el proyecto
// borrar codigo inutilizado
Meteor.methods({
    'animales.insert'(farm, number, especie, raza, sexo, descripcion, date) {

        console.log("ATRIBUTOS");
        console.log(farm);
        console.log(number);
        console.log(especie);
        console.log(raza);
        console.log(sexo);
        console.log(descripcion);

        
        check(especie, String);
        check(raza, String);
        check(sexo, String);
        check(descripcion, String);
        check(date, Date);



        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Animales.insert({
            farm,
            number,
            especie,
            raza,
            sexo,
            descripcion,
            date,
            owner: this.userId
        });
    },

    'animales.remove'(animalId) {
        console.log(animalId);
      


        const task = Animales.findOne(animalId);
        if (task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Animales.remove(animalId);
    },
});
