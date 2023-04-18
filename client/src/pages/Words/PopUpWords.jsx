import React from 'react'
import Modal from 'react-modal'


const PopUpWords = ({
    modalIsOpen,
  handleModalClose,
  handleAddWord,
  newWord,
  handleInputChange,
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
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
        contentLabel="Add Word Modal"
      >
        <h2 className="text-center text-2xl font-bold text-violet-600 my-4">
          Add Word
        </h2>
        <form onSubmit={handleAddWord}>
          <div className="mb-2">
            <label
              htmlFor="word"
              className="block text-gray-700 font-bold mb-2"
            >
              Word:
            </label>
            <input
              type="text"
              id="word"
              name="word"
              value={newWord.word}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={newWord.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="spanish"
              className="block text-gray-700 font-bold mb-2"
            >
              Spanish Translation:
            </label>
            <input
              type="text"
              id="translation"
              name="translation"
              value={newWord.translation}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Word
          </button>

          <button
            onClick={handleModalClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default PopUpWords