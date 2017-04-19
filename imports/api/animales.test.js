/**
 * Created by Juan on 19/04/2017.
 */
import { Meteor } from 'meteor/meteor';
import {chai, expect } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import faker from 'faker';
import {Animales} from './animales.js';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';


Factory.define('animalestest', Animales, {

    name:()=>'TestAnimales',
    description:()=> 'testing',
    url: ()=>'google.com'
});

if(Meteor.isClient()) {

    describe('Accounts', function () {

        beforeEach(function () {
            resetDatabase();
        });

        it('Should be able to create a user from the client side', function () {
            const tusername = faker.internet.userName();
            const temail = faker.internet.email();
            const tpassword = 'hola1234';

            const createUser = new Promise((resolve, reject) => {
                Accounts.createUser({
                    username: tusername,
                    email: temail,
                    password: tpassword,
                }, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        const newUser = Meteor.users.findOne();
                        resolve(newUser);
                    }
                });
            });
            return createUser.then(function (newUser) {
                expect(newUser).to.not.be.undefined;
                console.log(newUser);
                expect(newUser.username).to.equal(tusername);
            });
        });
    });
}

    describe('Animales', function() {
        describe('add animal', function () {
            beforeEach(function () {
                resetDatabase();
                console.log('Animal DB has been reseted');
            });
            it('Should insert an animal', function () {
                const tfarm = faker.lorem.word();
                const tnumber = 1;
                const tespecie = faker.lorem.word();
                const traza = faker.lorem.word();
                const tsexo = faker.lorem.word();
                const tdescripcion = faker.lorem.sentence();
                const tdate = new Date();
                const towner = faker.lorem.word();

                Meteor.call('animales.insert',
                    tfarm,
                    tnumber,
                    tespecie,
                    traza,
                    tsexo,
                    tdescripcion,
                    tdate
                )
                console.log(Animales.find().count())
                chai.assert.equal(Animales.find().count(), 1);
            });
        });
    });

    var numberA;
    describe('AnimalesDelete', function () {
        describe('delete animals', function () {
            beforeEach(function () {
                resetDatabase();
                const tfarm = faker.lorem.word();
                const tnumber = 2;
                const tespecie = faker.lorem.word();
                const traza = faker.lorem.word();
                const tsexo = faker.lorem.word();
                const tdescripcion = faker.lorem.sentence();
                const tdate = new Date();
                const towner = faker.lorem.word();
                numberA = tnumber;

                Meteor.call('animales.insert',
                        tfarm,
                        tnumber,
                        tespecie,
                        traza,
                        tsexo,
                        tdescripcion,
                        tdate
                )
                chai.assert.equal(Animales.find().count(), 1);
            });
            it('should delete a animal', function () {
                Meteor.call('animales.deleteByNumber',numberA
                )
                chai.assert.equal(Animales.find().count(), 0);
            });
        });
    });



