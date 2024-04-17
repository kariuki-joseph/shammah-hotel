import express from 'express';
import { FoodControllers } from './food.controller';
const router = express.Router();

router.post("/", FoodControllers.addFood);
router.get("/", FoodControllers.getAllFood);
router.get("/:foodId", FoodControllers.getSingleFood);
router.delete("/:foodId", FoodControllers.deleteFood);
router.put('/:id', FoodControllers.updateFood);

export const FoodRoutes = router;