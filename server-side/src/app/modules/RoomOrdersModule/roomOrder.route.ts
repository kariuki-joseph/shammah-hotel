import express from "express"
import { RoomOrderControllers } from "./roomOrder.controller";
const router = express.Router();

router.post("/",RoomOrderControllers.orderRoom);
router.get("/",RoomOrderControllers.getAllRoomOrders);
router.get("/:email",RoomOrderControllers.getRoomOrdersByEmail);
router.delete("/:id",RoomOrderControllers.deleteRoomOrder);
export const RoomOrderRoutes = router;