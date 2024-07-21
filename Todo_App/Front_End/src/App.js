import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [deletesuccess, setDeleteSuccess] = useState("");
  const [editsuccess, setEditSuccess] = useState("");
  const [error_msg, setError_msg] = useState("");
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const header = {
    backgroundColor: "green",
    padding: "20px",
    textAlign: "center",
    color: "white"
  };

  const add_item = async () => {
    try {
      const response = await axios.post('http://localhost:8000/add-todo', {
        title,
        description
      });
      setTitle("");
      setDescription("");
      console.log('Todo added:', response.data);
      setSuccess("Task Added Successfully !!");
      fetchData();
      removeMessage(setSuccess);
    } catch (error) {
      console.log('Error adding Todo :', error);
      setError_msg(error.message);
      removeMessage(setError_msg);
    }
  };

  const delete_item = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete-item/${id}`);
      console.log(response.data.message);
      setDeleteSuccess("Task Deleted Successfully !!");
      fetchData();
      removeMessage(setDeleteSuccess);
    } catch (error) {
      console.log('Error deleting Todo:', error);
      setError_msg(error.message);
      removeMessage(setError_msg);
    }
  };

  const update_item = async () => {
    try {
      const response = await axios.put('http://localhost:8000/update-item', {
        editId,
        editTitle,
        editDescription
      });
      console.log(response.data);
      setEditId(null);
      setEditTitle("");
      setEditDescription("");
      setEditSuccess("Task Updated Successfully !!");
      fetchData();
      removeMessage(setEditSuccess);
    } catch (error) {
      setEditId(null);
      setEditTitle("");
      setEditDescription("");
      console.log("Error updating Todo :", error);
      setError_msg(error.message);
      removeMessage(setError_msg);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-todo');
      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const edit_item = (todoItem) => {
    setEditId(todoItem._id);
    setEditTitle(todoItem.title);
    setEditDescription(todoItem.description);
  }

  const removeMessage = (setMessage) => {
    setTimeout(() => {
      setMessage("");
    }, 1000);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="add-item">
        <h1 style={header}>ToDo Application</h1>
        <h2>Add Task</h2>
        {success && <p className="text-success">{success}</p>}
        {deletesuccess && <p className="text-success">{deletesuccess}</p>}
        {editsuccess && <p className="text-success">{editsuccess}</p>}
        {error_msg && <p className="text-danger">{error_msg}</p>}
        <input style={{ margin: "10px", padding: "5px", borderWidth: "2px", width: "400px" }} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input style={{ margin: "10px", padding: "5px", borderWidth: "2px", width: "600px" }} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button class="btn btn-primary btn-dark" type="submit" onClick={add_item}> Submit </button>
      </div>
      <h2>Tasks</h2>
      <div className="tasks">
        <ul className="list-group">
          {todo.map(todoItem => (
            <li key={todoItem._id} className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
              <div className="d-flex flex-column">
                {editId === todoItem._id ? (
                  <>
                    <input style={{ margin: "10px", padding: "5px", borderWidth: "2px", width: "400px" }} placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    <input style={{ margin: "10px", padding: "5px", borderWidth: "2px", width: "400px" }} placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                  </>
                ) : (
                  <>
                    <span className="fw-bold">{todoItem.title}</span>
                    <span>{todoItem.description}</span>
                  </>
                )}
              </div>
              <div>
                {editId === todoItem._id ? (
                  <button className="btn btn-warning me-2" onClick={update_item}>Update</button>
                ) : (
                  <button className="btn btn-warning me-2" onClick={() => edit_item(todoItem)}>Edit</button>
                )}
                <button className="btn btn-danger" onClick={() => delete_item(todoItem._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
