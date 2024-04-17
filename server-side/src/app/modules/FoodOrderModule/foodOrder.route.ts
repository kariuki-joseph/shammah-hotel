import express from 'express';
import { FoodOrderControllers } from './foodOrderController';
const router = express.Router();

router.post("/",FoodOrderControllers.orderFood);
router.get("/",FoodOrderControllers.getAllFoodOrders);
router.get("/:email", FoodOrderControllers.getFoodOrdersByEmail);
router.delete("/:orderId", FoodOrderControllers.deleteFoodOrder);

export const FoodOrderRoutes = router;