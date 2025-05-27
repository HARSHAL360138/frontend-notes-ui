function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />
      <div
        className="
          fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-white dark:bg-gray-800 p-6 z-50
          max-w-lg w-full rounded-lg shadow-lg
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {children}
      </div>
    </>
  );
}
export default Modal;