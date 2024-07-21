const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todo_db')
.then(() => console.log("connection successful"))
.catch((err) => console.log('Failed to connect to MongoDB', err));

const todoSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Todo = mongoose.model('Todo', todoSchema);

app.post('/add-todo',async(req,res)=>{
    const {title,description} = req.body;

    try{
        const newTodo = new Todo({
            title,
            description
        });

        const savedTodo=await newTodo.save();
        res.json(savedTodo);
    }
    catch(err)
    {
        res.json({error:err.message});
    }

})

app.get('/get-todo',async(req,res) => {
  try{
    const todo = await Todo.find();
    res.json(todo);
  }
  catch(error)
  {
    console.log(error);
  }
});

app.delete('/delete-item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.deleteOne({ _id: id });

    if (deletedTodo.deletedCount > 0) {
      res.json({ message: "Todo deleted successfully !!" });
    } else {
      res.json({ message: "Todo not found with this specified id !!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

app.put('/update-item',async (req,res) => {
  try{
    const {editId,editTitle,editDescription} = req.body;
    const updated_todo = await Todo.updateOne({_id:editId},{$set:{title:editTitle,description:editDescription}});
    res.json(updated_todo);
  }
  catch(error)
  {
    console.log(error);
    res.json(error)
  }

});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


