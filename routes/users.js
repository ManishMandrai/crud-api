import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = []

router.get('/', (req, res) => {
    res.send(users);
})


router.post('/', (req, res) => {
    const user = req.body

    users.push({ ...user, id: uuidv4() })

    res.send(`User with the name ${user.firstName} added to the db`);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id)
    res.send(foundUser)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id)

    res.send(`User with the ${id} deleted from the db`)
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;

    const { firstName, lastname, age } = req.body;

    const user = users.find((user) => user.id == id)

    if (firstName) user.firstName = firstName;
    if (lastname) user.lastname = lastname
    if (age) user.age = age

    res.send(`User with the ${id} has beed updated`)
})



export default router;

