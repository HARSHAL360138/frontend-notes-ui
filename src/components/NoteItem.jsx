
 function NoteItem({ note, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold">{note.title}</h2>
        <p className="text-gray-700 mt-2">{note.content}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-xs text-gray-400">
          {new Date(note.createdAt).toLocaleString()}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default NoteItem