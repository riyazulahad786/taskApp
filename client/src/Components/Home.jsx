import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null); // State to keep track of the task being edited
  const [search, setSearch] = useState(''); // State for search query
  const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
  const token = localStorage.getItem('token'); // Get token from localStorage

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Clear userId as well
    toast.success('Logged out successfully');
    navigate('/register');
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`https://serverapp-2vre.onrender.com/api/getAllTasksForUser/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !userId) {
      toast.error('Title and userId are required');
      return;
    }
    try {
      const response = await axios.post(
        'https://serverapp-2vre.onrender.com/api/createTask',
        { title, description, status, userId },
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]); // Add the new task to the list
      toast.success('Task created successfully');
      setTitle('');
      setDescription('');
      setStatus('todo');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create task');
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editTask.title || !userId) {
      toast.error('Title and userId are required');
      return;
    }
    try {
      const response = await axios.put(
        `https://serverapp-2vre.onrender.com/api/updateTask/${editTask._id}`,
        { title: editTask.title, description: editTask.description, status: editTask.status },
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
      );
      setTasks(tasks.map(task => task._id === editTask._id ? response.data : task)); // Update the task in the list
      toast.success('Task updated successfully');
      setEditTask(null); // Reset the edit task
    } catch (error) {
      console.error(error);
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://serverapp-2vre.onrender.com/api/deleteTask/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTasks(tasks.filter(task => task._id !== taskId)); // Remove the deleted task from the list
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
  
  const sortedTasks = filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-center mb-3">
    <button className="btn btn-primary mx-5 shadow" data-bs-toggle="modal" data-bs-target="#createTaskModal">
          Create Task
          <img
            className="create mx-2"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAUlEQVR4nO2Zz0tUURTHP4yTIbnItEXqaiLal6V/QRHaRiTalP0PQpZStqhsmWi0KRqSViVELV2U6D+QuNIRyiK10q3ZxrhwBg6XO2/evfNm3hTzhQOPee98zz3v3Xt+DTTQQANJIAP0AWPAHLAC7AJ/RHbltzfAbaBXdFJHNzAJfAMOPOUr8BDoSmPh7cBTYD9g4bb8Bp4Ax2q1+KvAL8dCvgPPgGvAGXHykEgHcBa4DjwHNh36P4Er1Vx4Vt66bfgD0A80eXINAB8dfDNyP1G0AO8tQ6vAhQS4LwFrFvc7sZkIso7F54EjSRkAWoGXDicS+RL2trlD9XDXsjWdxIGt1eJLOTFEINqtaGO2Ta0wq+z+ANoq3TqrAXv+NLABfAZOBZyJQiVbqdtKUhd9CaSsKOqb8iEkOh2oZNfpozxpxfkQ3FMc5joEC4rjQVylJqu2MUkqLQcGFMeXuAVgn1UeZFN0IAtsKZ7zcZTGlYKpbUjRAYMXimeUGJhTCqYwS9uBYcXzOo7CilIwVWXaDvQonuU4CjtKwSSzUjgJjMhndcm84pmPeG4EyEXYOW6V3GWh439zxHM60VQqhQg7h6188P87sBNzC+UkYj0qIUuKZyniufGkt5A+xKYNTPsQn/M9xDqMmh42bQdu+IbRsTpLZHnFczOOQq9S2KyDUmJb8ZicUBYZGTrVQzF3OaSYQyZmRUUz+kjLgUXFcd9HsUtiblHZNBe+GPUtwiz0K/0934YGGfcVCdakzfNBThJUoUycd8HYWlf2pwhAuySOIomZ29QKr5Td7dCmHplV6pRvRh7VxoRlc7BSwpkaOjFh2XqcBGlWxnyaeDbgTESh1do2Rt56Dowj0eJwohAYnVzRZt2x+MSGu/pLTDtK4QWZHvhk7KwkqUUH31SSb96FISu9F2VLGvBhSfkd0k80y3WPFGb5CP1BaoQ2+Ro62YXKnrz1o6SATpmYbQQs3NQ2pjw4QR0gI0OnW1KzL0tnty9irj/JvVFpUurib9YGGuAfx18eKsRFV7jUgwAAAABJRU5ErkJggg=="
          />
        </button>
        <div className="btn btn-danger mx-3" onClick={logout}>
          Logout
        </div>
    </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control border"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>

      <div className="row border mt-3">
        <div className="col-lg-4 border d-flex flex-column align-items-center">
          <h5>Todo</h5>
          {sortedTasks.filter(task => task.status === 'todo').map(task => (
            <div key={task._id} className="card my-2" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title"><span>Title : </span>{task.title}</h5>
                <p className="card-text"><span>Description :</span>{task.description}</p>
                <span className="badge bg-secondary"><span>Status : </span>{task.status}</span>
                <div className="d-flex justify-content-around my-2 ">
                  <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#updateTaskModal" onClick={() => setEditTask(task)}>Update</button>
                  <button className='btn btn-warning' onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-4 border d-flex flex-column align-items-center">
          <h5>In Progress</h5>
          {sortedTasks.filter(task => task.status === 'in-progress').map(task => (
            <div key={task._id} className="card my-2" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title"><span>Title : </span>{task.title}</h5>
                <p className="card-text"><span>Description :</span>{task.description}</p>
                <span className="badge bg-primary"><span>Status : </span>{task.status}</span>
                <div className="d-flex justify-content-around my-2 ">
                  <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#updateTaskModal" onClick={() => setEditTask(task)}>Update</button>
                  <button className='btn btn-warning' onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-4 border d-flex flex-column align-items-center">
          <h5>Done</h5>
          {sortedTasks.filter(task => task.status === 'done').map(task => (
            <div key={task._id} className="card my-2" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title"><span>Title : </span>{task.title}</h5>
                <p className="card-text"><span>Description :</span>{task.description}</p>
                <span className="badge bg-success"><span>Status : </span>{task.status}</span>
                <div className="d-flex justify-content-around my-2 ">
                  <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#updateTaskModal" onClick={() => setEditTask(task)}>Update</button>
                  <button className='btn btn-warning' onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Task Modal */}
      <div className="modal fade" id="createTaskModal" tabIndex="-1" aria-labelledby="createTaskModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createTaskModalLabel">Create Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Update Task Modal */}
      {editTask && (
        <div className="modal fade" id="updateTaskModal" tabIndex="-1" aria-labelledby="updateTaskModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateTaskModalLabel">Update Task</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleUpdateSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="updateTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="updateTitle" value={editTask.title} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="updateDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="updateDescription" rows="3" value={editTask.description} onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="updateStatus" className="form-label">Status</label>
                    <select className="form-select" id="updateStatus" value={editTask.status} onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}>
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
