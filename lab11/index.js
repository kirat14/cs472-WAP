import express from 'express';
import data from './data/mock.json';

const app = express();
const PORT = 3000;

/* Q1 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/mountains_1.jpeg');
  });
/* Q2 */
// Get courses
app.get('/courses', (req, res) => {
    res.send(data);
});

//POST
app.post('/addCourse', (request, response) => {
    response.send('This is a POST request at /addCourse')
});

// Get course by id
app.get('/class/:courseId', (req, res) => {
    res.send(data.filter((student) => student.id == req.params.courseId));
})

// Error handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // Define a route that throws an error
  app.get('/', (req, res) => {
    throw new Error('Oops! Something went wrong.');
  });

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});