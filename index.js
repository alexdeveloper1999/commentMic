const express=require("express");
const bodyParser=require("body-parser");
const {randomBytes}=require("crypto");
const cors=require("cors")
const app=express();
// app.use(bodyPrser.json());
app.use(bodyParser.json());
app.use(cors())
let commentsByPostId={};
app.get("/posts/:id/comments",(req,res)=>{
    let {id}=req.params;
  let currentComments= commentsByPostId[id]||[];
  res.send(currentComments)
})
app.post("/posts/:id/comments",(req,res)=>{

    let currentComments=commentsByPostId[req.params.id] || [];
    let id=randomBytes(4).toString("hex");
    let {content}=req.body;
    
    currentComments.push({id,content});
    commentsByPostId[req.params.id]=currentComments;
    res.status(201).send(currentComments);
    


});

app.listen(4001,()=>{
    console.log("listening on 4001")
})