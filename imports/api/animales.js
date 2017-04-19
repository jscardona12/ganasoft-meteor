/**s
 * Created by Juan on 16/03/2017.
 */

// Con ESlint todos estos imports les aparecerian con error ya que el modo "correcto" debería ser con espacio después y antes del corchete
// e.g. { Meteor }
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

        // se deberían eliminar los logs y comentarios del código
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
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        // Para el usuario no es claro si number es el número de animales
        // los ids deberían agregarse incrementalmente
        // Está el atributo de todo docuemtno en mongo llamado _id que es único y es un objecto tipo Mongo.ObjectId(), aunque tal vez visualmente no sea apropiado

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
    'animales.get'(farmId){
        const animales = Animales.find({}).fetch();
        console.log("ANIMALES");
        console.log(animales);
        return animales;
    }

});
