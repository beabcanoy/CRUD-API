import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [
  // Adding users to our mock database //GET
  {
    id: uuidv4(), // Add id to mock users
    first_name: 'Kylander',
    last_name: 'Silvenia',
    email: 'kylndrs@example.com',
  },
  {
    id: uuidv4(),
    first_name: 'Yanna',
    last_name: 'Wren',
    email: 'yannabanana@example.com',
  },
];

// GET /users → list all users
router.get('/', (req, res) => {
  res.json(users);
});

// POST /users → add new user
router.post('/', (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  res.send(`${user.first_name} has been added to the database`);
});

// GET /users/id → get user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    return res.status(404).send('User not found');
  }

  res.json(foundUser);
});

// DELETE /users/id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`${id} deleted successfully from database`);
});

// PATCH /users/id
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const { first_name, last_name, email} = req.body;

  const user = users.find((user) => user.id === id)

  if(first_name) user.first_name = first_name;
  if(last_name) user.last_name = last_name;
  if(email) user.email = email;

  res.send(`User with the ${id} has been updated`)

});


export default router;
