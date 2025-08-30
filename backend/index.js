const express=require('express');
const app=express();
const connectDB=require('./db');
const cors=require('cors');
const PersonRoutes=require('./Routes/PersonRoutes')
const aiRoutes=require('../backend/Routes/ai.routes');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/person',PersonRoutes);
app.use('/ai',aiRoutes)

const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(3000)
