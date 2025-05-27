import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/notes";

const getNotes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const createNote = async (note) => {
  const res = await axios.post(API_URL, note);
  return res.data;
};

const deleteNote = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};


const updateNote = async (id, updatedNote) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedNote);
  return res.data;
};

export default {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
};