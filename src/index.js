const express = require('express');

const app = express();
const { dataSource } = require('./utils');
const wilderController = require('./controller/wilder');
const skillsController = require('./controller/skills');

const port = 5001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello G');
});

app.post('/api/wilder', wilderController.create);
app.get('/api/wilder', wilderController.get);
app.get('/api/wilder/:id', wilderController.getOne);
app.put('/api/wilder/:id', wilderController.updateOne);
app.delete('/api/wilder/:id', wilderController.deletOne);

app.post('/api/skills', skillsController.createOneSkill);
app.get('/api/skills', skillsController.getAllSkills);
app.get('/api/skills/:id', skillsController.getOneSkill);
app.put('/api/skills/:id', skillsController.updateOneSkill);
app.delete('/api/skills/:id', skillsController.deleteOneSkill);
const start = async () => {
  await dataSource.initialize();
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
};

start();
