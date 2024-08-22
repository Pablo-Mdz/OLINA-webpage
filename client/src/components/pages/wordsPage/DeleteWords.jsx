import React from 'react';
import Modal from 'react-modal';

export const DeleteWords = ({
  deleteModalIsOpen,
  handleDeleteModalClose,
  handleDeleteWord,
  deleteWord,
}) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      width: '90%',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      padding: '20px',
    },
  };

  return (
    <div>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={handleDeleteModalClose}
        style={customStyles}
        contentLabel="Delete Word Modal"
      >
        <h2 className="text-center text-2xl font-bold text-red-600 my-4">
          Delete Word
        </h2>
        <p className="text-center text-gray-700 mb-4">
          Are you sure you want to delete this word?
        </p>
        <div className="text-center">
          <button
            onClick={() => handleDeleteWord(deleteWord)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
          <button
            onClick={handleDeleteModalClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};
