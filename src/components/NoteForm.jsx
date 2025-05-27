import { useState, useEffect } from "react";

function NoteForm({ onSubmit, selectedNote, clearSelectedNote }) {
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (selectedNote) setNote(selectedNote);
  }, [selectedNote]);

  const handleChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!note.title || !note.content) return;
    onSubmit(note);
    setNote({ title: "", content: "" });
    clearSelectedNote();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="content"
        placeholder="Content"
        value={note.content}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {note._id ? "Update" : "Add"} Note
        </button>
        {note._id && (
          <button
            type="button"
            onClick={() => {
              clearSelectedNote();
              setNote({ title: "", content: "" });
            }}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}
export default NoteForm;