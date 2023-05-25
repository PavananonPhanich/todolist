const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: String,
  imageUrl: String,
});

cardSchema.statics.findByName = function (title) {
  return this.where({ title: title });
};

cardSchema.statics.findByNameAndUpdate = function (title, body) {
  return this.findOneAndUpdate(
    { title: title },
    {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
    }
  );
};

cardSchema.statics.findByNameAndRemove = function (title) {
  return this.deleteOne({ title: title });
};

cardSchema.query.byName = function (title) {
  return this.where({ title: title });
};

cardSchema.pre("findOneAndUpdate", function (next) {
  this.updateOne({ updateTime: Date.now() });
  next();
});

module.exports = mongoose.model("card", cardSchema);
