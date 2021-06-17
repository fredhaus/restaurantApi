const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  building: {
    required: true,
    type: String
  },
  coord: Array,
  street: {
    required: true,
    type: String
  },
  zipcode: {
    required: true,
    type: String
  }
})

const RestaurantSchema = new Schema({
  address: {
    required: true,
    type: AddressSchema,
  },
  borough: {
    required: true,
    type: String,
  },
  cuisine: {
    required: true,
    type: String,
  },
  grades: Array,
  name: {
    required: true,
    type: String,
  },
  restaurant_id: String,
});

RestaurantSchema.plugin(mongoosePaginate);
const Restaurant = mongoose.model("Restaurants", RestaurantSchema);

module.exports = Restaurant;
