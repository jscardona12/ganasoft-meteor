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

Meteor.methods({
    'animales.insert'(farm, number, especie, raza, sexo, descripcion, date) {

        console.log("ATRIBUTOS");
        console.log(farm);
        console.log(number);
        console.log(especie);
        console.log(raza);
        console.log(sexo);
        console.log(descripcion);

        //check(number, 'number');
        check(especie, String);
        check(raza, String);
        check(sexo, String);
        check(descripcion, String);
        check(date, Date);



        // Make sure the user is logged in before inserting a task
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }

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
        //check(taskId, String);


        const animal = Animales.findOne(animalId);
        if (animal.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Animales.remove(animalId);
    },
    'animales.deleteByNumber'(numberA){
        const animales = Animales.find({number:numberA}).fetch();
        Animales.remove(animales[0]._id);
    }

});
// Donde estan las pruebas?
