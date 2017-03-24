/**
 * Created by Juan on 16/03/2017.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Farms = new Mongo.Collection('fincas');
