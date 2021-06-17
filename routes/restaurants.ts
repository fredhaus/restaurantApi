import * as express from "express";
import * as _ from "lodash";
import bodyParser from "body-parser";
const router = express.Router();
const jsonParser = bodyParser.json();

// Models
const Restaurant = require("../models/restaurant");

// Interfaces
import { IRestaurant } from "../utils/interfaces";

// Functions
import { isValidRestaurant } from "../utils/validations";

// Variables
const paginationDefaults = {
  page: 1,
  limit: 10,
};

// get restaurants, paginated, with defaults of limit=10 and page=1, possibly filtered
router.get("/", async (req: express.Request, res: express.Response) => {
  const paginationOptions = {
    page: req.query.page ?? paginationDefaults.page,
    limit: req.query.limit ?? paginationDefaults.limit,
  };
  const { page, limit, ...rest } = req.query;
  const filterOptions = rest;

  try {
    const filteredRestaurants: express.Response = await Restaurant.paginate(
      filterOptions,
      paginationOptions
    );
    res.status(200).json(filteredRestaurants);
  } catch (error) {
    res.status(404).send(error);
  }
});

// get one restaurant by id
router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const foundRestaurant: IRestaurant = await Restaurant.findById(
      req.params.id
    );
    res.status(200).json(foundRestaurant);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Create a new Restaurant
router.post(
  "/",
  jsonParser,
  async (req: express.Request, res: express.Response) => {
    if (!isValidRestaurant(req.body)) {
      return res
        .status(400)
        .send(
          "Posted restaurant does not include all minimal necesarry requirements of address, borough, cuisine, name"
        );
    }
    const newRestaurant: IRestaurant = req.body;

    try {
      const newlyCreatedRestaurant = await Restaurant.create(newRestaurant);
      res
        .status(201)
        .send(
          `Restaurant ${newlyCreatedRestaurant.name} with id ${newlyCreatedRestaurant._id} created sucessfully`
        );
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// update single or multiple properties of one restaurant by id
router.patch(
  "/:id",
  jsonParser,
  async (req: express.Request, res: express.Response) => {
    try {
      const updatedRestaurant = await Restaurant.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json(updatedRestaurant);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Delete restaurant by id
router.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    await Restaurant.findOneAndDelete({ id: req.params.id });
    res
      .status(200)
      .send(`Restaurant with id ${req.params.id} deleted sucessfully`);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
