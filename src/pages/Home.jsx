
import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";
import Modal from "../components/Modal";
import noteService from "../services/noteService";

function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotes = async () => {
    const data = await noteService.getNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const openModalForNew = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleAddOrUpdate = async (note) => {
    if (note._id) {
      await noteService.updateNote(note._id, {
        title: note.title,
        content: note.content,
      });
    } else {
      await noteService.createNote(note);
    }
    fetchNotes();
    closeModal();
  };

  const handleDelete = async (id) => {
    await noteService.deleteNote(id);
    fetchNotes();
  };

  return (

    <div className="max-w-5xl mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6 text-center mt-20">📝 My Notes</h1>

    <button
      onClick={openModalForNew}
      className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      + Add Note
    </button>


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
          onDelete={handleDelete}
          onEdit={() => openModalForEdit(note)}
        />
      ))}
    </div>

    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <NoteForm
        onSubmit={handleAddOrUpdate}
        selectedNote={selectedNote}
        clearSelectedNote={() => setSelectedNote(null)}
      />
    </Modal>
  </div>
  );
}
export default Home