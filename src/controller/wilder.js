/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { dataSource } = require('../utils');
const Wilder = require('../entity/wilder');

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send('wilder created');
    } catch {
      // eslint-disable-next-line no-unused-expressions
      (error);
      res.send('error creating wilder');
    }
  },
  get: async (req, res) => {
    try {
      const allWilders = await dataSource.getRepository(Wilder).find();
      res.send(allWilders);
    } catch {
      (error);
      res.send('error while querying wilders');
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const oneWilder = await dataSource.getRepository(Wilder).findBy({
        id,
      });
      res.send(oneWilder);
    } catch {
      (error);
      res.send('error retrieving the wilder', error);
    }
  },
  deletOne: async (req, res) => {
    const { id } = req.params;
    const db = dataSource.getRepository(Wilder);
    try {
      const wilderToDelete = await db.findBy({
        id,
      });
      await db.remove(wilderToDelete);
      res.send(`user ${id} has been deleted`);
    } catch {
      (error);
      res.send(`could not delete user ${id}`, error);
    }
  },

  updateOne: async (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;
    const db = dataSource.getRepository(Wilder);
    try {
      const wilderToUpdate = await db.findBy({
        id,
      });
      await db.update(wilderToUpdate, { name: newName });
      res.send(`wilder ${id} has been updated`);
    } catch (err) {
      console.log(err);
      res.send(`could not update user ${id}`);
    }
  },

};
