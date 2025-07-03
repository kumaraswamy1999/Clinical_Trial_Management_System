
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}
