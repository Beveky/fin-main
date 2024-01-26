const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  numero: { type: Number, required: true },
  medecin: { type: Number, required: true },
  pharmacie: { type: Number, required: true },
  labo: { type: Number, required: true },
  postedBy: { type: Object },
});

module.exports = mongoose.model("Todo", todoSchema);
