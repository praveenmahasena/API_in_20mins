const express = require("express");
const app = express();
const cors = require("cors");
const volleyball = require("volleyball");
const { Post } = require("./db/db.js");
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(volleyball);

app.get("/", async (req, res) => {
  const data = await Post.find();
  return res.status(200).json(data);
});

app.post("/", async (req, res) => {
  const { Title, Description, Content } = req.body;
  if (!Title || !Description || !Content)
    return res.status(400).json({ err: "invalid fields arent valid" });

  const post = new Post({ Title, Description, Content });
  post
    .save()
    .then((response) => {
      return res.status(201).json(response);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ err: "err is a err which is spelled as E-R-R" });
  const data = await Post.findById(id);
  return data
    ? res.status(200).json(data)
    : res.status(400).json({ err: "err" });
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { Title, Description, Content } = req.body;
  if (!Title || !Description || !Content || !id)
    return res.status(400).json({ err: "not found" });
    Post.findByIdAndUpdate(id,req.body)
  .then(result=>{
    return res.status(201).json(result)
  })
  .catch(err=>{
    return res.status(400).json(err)
  })
});

app.delete('/:id',async(req,res)=>{
  const {id}=req.params
  if(!id) return res.status().json({err:'nil values arent valid which means those are invalid'})
  Post.findByIdAndDelete(id)
  .then(result=>{
    res.status(300).json(result)
  })
  .catch(err=>{
    return res.status(400).json(err)
  })
})

module.exports = {
  app,
};
