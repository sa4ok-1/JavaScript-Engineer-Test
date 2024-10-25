const express = require("express");
const router = express.Router();
const Superhero = require("../models/Superhero");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/superheroes",
  upload.fields([{ name: "images", maxCount: 10 }]),
  async (req, res) => {
    // Збираємо дані з req.body
    const newSuperheroData = {
      ...req.body,
      images: req.files.images ? req.files.images.map((file) => file.path) : [], // Зберігаємо шляхи до файлів
    };

    const newSuperhero = new Superhero(newSuperheroData);
    await newSuperhero.save();
    res.status(201).send(newSuperhero);
  }
);

// Read all superheroes
router.get("/superheroes", async (req, res) => {
  const superheroes = await Superhero.find()
    .limit(5)
    .skip(req.query.page * 5);
  res.send(superheroes);
});

// router.get("/superheroes/:id", async (req, res) => {
//   const superhero = await Superhero.findById(req.params.id);
//   res.send(superhero);
// });

// Update superhero
router.put("/superheroes/:id", async (req, res) => {
  const superhero = await Superhero.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(superhero);
});

// Delete superhero
router.delete("/superheroes/:id", async (req, res) => {
  await Superhero.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
