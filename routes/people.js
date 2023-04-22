const express = require('express')
const router = express.Router()
const person = require('../models/person')

router.get('/', async(req,res) => {
    try {
        const people = await person.find();
        res.json(people)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async(req,res) => {
    const people = new person({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
    })
    try {
        const newperson = await people.save()
        res.status(201).json(newperson)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

//patch will only update a single value of a user but put will update evrything 
router.patch('/:id', getperson, async (req,res) => {
    if(req.body.firstname != null) {
        res.people.firstname = req.body.firstname
    }
    try {
        const updatedperson = await res.people.save()
        res.json(updatedperson)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/:id', getperson, (req,res) => {
    res.send(res.people.firstname)
})

router.delete('/:id', getperson, async (req,res) => {
    try {
        await res.people.deleteOne()
        res.json({message: "Person deleted from databse"})
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

async function getperson(req,res,next) {
    let people
    try {
        people = await person.findById(req.params.id)
        if(people == null) {
            return res.status(404).json({ message: 'Cannot find the person'}) //404 when there is no info in database
        }
    }
    catch(error) {
        res.status(500).json({message: error.message}) //problem with our server
    }
    res.people = people
    next()
}

module.exports = router