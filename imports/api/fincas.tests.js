import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Farms } from './fincas.js';

if (Meteor.isServer) {
  describe('Farms', () => {
    describe('methods', () => {
      const userId = Random.id();
      let farmId;

      beforeEach(() => {
        Farms.remove({});
        farmId = Farms.insert({
          name: 'test farm',
          createdAt: new Date(),
          owner: userId,
        });
      });

      it('can delete a owned farm', () => {

        const deleteFarm = Meteor.server.method_handlers['fincas.remove'];

        const invocation = { userId };

        deleteFarm.apply(invocation, [farmId]);

        assert.equal(Farms.find().count(), 0);
      });

      it('can add a new farm', () => {

        const addFarm = Meteor.server.method_handlers['fincas.insert'];

        const invocation = { userId };

        addFarm.apply(invocation, ["test farm 2"]);

        assert.equal(Farms.find().count(), 2);
      });
    });
  });
}
