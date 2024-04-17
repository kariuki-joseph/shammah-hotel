import express from 'express';
import { sendStkPush } from './mpesa.controller';

const router = express.Router();

router.post("/stkpush",sendStkPush);
export const MpesaRouter = router;