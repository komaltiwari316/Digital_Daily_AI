const express=require('express');
const aiController=require('../Controllers/ai.controller');

const router=express.Router();

router.post('/ai_assisant',aiController.getdata)

module.exports=router;