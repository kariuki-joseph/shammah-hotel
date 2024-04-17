import express from 'express';
import { ProductControllers } from './room.controller';

const router = express.Router();

router.post('/', ProductControllers.addRoom);
router.get('/', ProductControllers.getAllRooms);
router.get("/available", ProductControllers.searchAvailableRooms)
router.get("/:id/available", ProductControllers.searchSingleAvailableRooms)
router.get('/:id', ProductControllers.getSingleRoom);
router.delete('/:id', ProductControllers.deleteRoom);
router.put('/:id', ProductControllers.updateRoom);
export const ProductRoutes = router;
