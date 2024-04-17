import express, { Application, Request, Response } from "express"
import cors from 'cors'
import { ProductRoutes } from "./app/modules/RoomModule/room.route";
import { RoomOrderRoutes } from "./app/modules/RoomOrdersModule/roomOrder.route";
import { UsersRouter } from "./app/modules/UserModule/user.route";
import { FoodRoutes } from "./app/modules/FoodModule/food.route";
import { FoodOrderRoutes } from "./app/modules/FoodOrderModule/foodOrder.route";
import { MpesaRouter } from "./app/modules/MPesaModule/mpesa.route";
const app : Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/rooms/orders", RoomOrderRoutes)
app.use("/api/v1/rooms", ProductRoutes)
app.use("/api/v1/users", UsersRouter)
app.use("/api/v1/foods/orders",FoodOrderRoutes)
app.use("/api/v1/foods", FoodRoutes)
app.use("/api/v1/mpesa", MpesaRouter);
app.get("/", (req : Request, res : Response)=> {
    res.send("Shammah Hotel Server is running..")
})

export default app;