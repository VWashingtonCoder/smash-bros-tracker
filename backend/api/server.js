const express = require('express');
const cors = require('cors');

const Smash = require('./Smash/smash-model');

const server = express();

server.use(express.json());

server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/api/smash', (req, res) => {
    Smash.getAll()
        .then(characters => {
            res.status(200).json(characters);
        })
        .catch(err => {
            res.status(500).json({message: 'characters could not be retrieved'});
        });
});

server.get('/api/smash/:id', (req, res) =>{
    Smash.getById(req.params.id)
        .then(character => {
            if(!character){
                res.status(404).json({ message: 'character not found' });
            } else {
                res.status(200).json(character);
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'characters could not be retrieved'});
        });
});

server.post('/api/smash/add', (req, res) => {
    Smash.add(req.body)
        .then(newChar => {
            res.status(201).json(newChar);
        })
        .catch(() => {
            res.status(500).json({ message: 'character could not be added' });
        });
});

server.delete('/api/smash/:id', (req, res) => {
    Smash.remove(req.params.id)
        .then(deleted => { 
            if(!deleted){
                res.status(404).json({message: 'no character found at id'});
            } else {
                res.status(200).json(deleted);
            } 
        })
        .catch(() => { 
            res.status(500).json({message: 'could not remove character'})
        });
});

module.exports = server