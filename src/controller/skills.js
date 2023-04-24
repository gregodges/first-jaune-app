const { dataSource } = require('../utils');
const Skills = require('../entity/skills');

module.exports = {
  getAllSkills: async (req, res) => {
    const db = dataSource.getRepository(Skills);

    try {
      const allSkills = await db.find();
      res.send(allSkills);
    } catch (err) {
      res.send('could not load all Skills', err);
    }
  },
  getOneSkill: async (req, res) => {
    const db = dataSource.getRepository(Skills);
    const { id } = req.params;
    try {
      const oneSkill = await db.findBy({ id });
      res.send(oneSkill);
    } catch (error) {
      res.status(401).send('could not find the skill');
    }
  },
  createOneSkill: async (req, res) => {
    const db = dataSource.getRepository(Skills);
    const name = req.body;
    try {
      await db.save(name);
      res.send('new skill has been added');
    } catch (err) {
      console.log(err);
      res.send('could not create new skill', err);
    }
  },

  deleteOneSkill: async (req, res) => {
    const db = dataSource.getRepository(Skills);
    const { id } = req.params;
    try {
      const skillToDelete = await db.findBy({
        id,
      });
      await db.remove(skillToDelete);
      res.send(`skill ${id} has been deleted`);
    } catch (error) {
      console.log(error);
      res.send('could not delete skill');
    }
  },
  updateOneSkill: async (req, res) => {
    const db = dataSource.getRepository(Skills);
    const { id } = req.params;
    const { newData } = req.body;
    try {
      const skillToUpdate = await db.findBy({ id });
      await db.update(skillToUpdate, { name: newData });
      console.log(newData);
      res.send(`skill ${id} has been updated`);
    } catch (error) {
      res.send('could not update the skill');
      console.log(error);
    }
  },
};
