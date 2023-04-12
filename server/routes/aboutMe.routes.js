const router = require("express").Router();
const AboutMe = require('../models/AboutMe');

router.post('/', (req, res) => {
    const { aboutMe } = req.body;
    AboutMe.create({textBody: aboutMe})
        .then(newAboutMe => {
            res.status(200).json(newAboutMe);
        })
        .catch(err => console.log(err));
});

router.get("/", (req, res) => {
    AboutMe.find()
        .then(aboutMeFromDB => {
            res.json(aboutMeFromDB);
        })
        .catch(err => console.log(err));
})

module.exports = router;