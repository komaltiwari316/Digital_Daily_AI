const express = require('express');
const Person = require('../models/person');
const router = express.Router();
const { model } = require('mongoose');
const bcrypt = require('bcrypt')
require('dotenv').config()
const crypto = require('crypto')

// Create a new Person Sign up
router.post('/sign_up', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const saltround = parseInt(process.env.HASH_PASSWORD || '898989', 898989)
        const hashpassowrd = await bcrypt.hash(password, saltround)
        const newPerson = new Person({
            // name, email, password
            name, email, password: hashpassowrd
        })
        await newPerson.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// login up
router.post('/login_up', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newPerson = await Person.findOne({ email });

        if (!newPerson) {
            return res.status(400).json({ message: "User Does not found" });
        }

        const isMatch = await bcrypt.compare(password, newPerson.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invaild Credentials" });
        }

        res.status(200).json({
            message: "Login successfully",
            user: {
                name: newPerson.name,
                email: newPerson.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = router;