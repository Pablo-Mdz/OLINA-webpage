const router = require("express").Router();
// const { findByIdAndUpdate } = require("../models/Word.model");

const Word = require("../models/Word")
// const fileUploader = require("../config/cloudinary.config.back")
// const { uploader, cloudinary } = require("../config/cloudinary")

const path = 'word'

//get read words 
router.get(`/${path}`, (req, res) => {
    console.log('first')
    Word.find()
        .then(Word => res.json(Word))
        // , user: req.session.user
        .catch(err => console.log(err))
    // , { user: req.session.user }
});


//create new word
router.post(`/${path}`, (req, res) => {
    const { word, description, translation } = req.body
    console.log("words", req.body)
    Word.create({
        word,
        description,
        translation,
        // author,
        // createdAt,
    })
        .then(Words => res.json(Words))
        .catch(err => res.status)
});



//delete word form list
router.delete(`/${path}/:id`, (req, res) => {
    const id = req.params.id
    Word.findByIdAndRemove(id)
        .then(deletedWord => {
            res.json(deletedWord)
        })
        .catch(err => console.log(err))
});




//edit post Word
router.post(`/${path}/:id/edit`, async (req, res) => {
    const id = req.params.id
    const updateData = req.body // asumiendo que el cliente está enviando los datos de edición en el cuerpo de la solicitud POST
    try {
        const event = await Word.findByIdAndUpdate(id, updateData, { new: true }) // actualiza el objeto Word en la base de datos y devuelve la versión actualizada
        res.json(event)
        // { user: req.session.user, Word }
    } catch (err) {
        console.log(err)
    }
})







module.exports = router;

