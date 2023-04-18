import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AuthContext } from '../../context/auth.context';
import EditWords from './EditWords';
import DeleteWords from './DeleteWords';
import PopUpWords from './PopUpWords';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

export const Words = () => {
  const [words, setWords] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [deleteWord, setDeleteWord] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [newWord, setNewWord] = useState({
    word: '',
    description: '',
    translation: '',
    author: '',
    createdAt: '',
  });
  const [editWord, setEditWord] = useState({
    id: '',
    word: '',
    description: '',
    translation: '',
    createdAt: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWord({ ...newWord, [name]: value });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditWord({ ...editWord, [name]: value });
  };

  // get all words
  const GetWords = () => {
    axios
      .get(`${API_URL}/word`)
      .then((response) => {
        setWords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    GetWords();
  }, []);

  //add words
  const handleAddWord = () => {
    const newWordWithAuthor = {
      ...newWord,
      author: { id: user },
    };
    axios
      .post(`${API_URL}/word`, newWordWithAuthor)
      .then((response) => {
        setWords([...words, response.data]);
        setNewWord({
          word: '',
          description: '',
          translation: '',
          author: { id: user },
          createdAt: '',
        });
      })
      .catch((error) => {
        console.log("post doesn't work", error);
      });
  };

  //edit words
  const handleEditWord = () => {
    // event.preventDefault();
    axios
      .post(`${API_URL}/word/${editWord.id}/edit`, {
        editWord,
        user: user._id,
      })
      .then((response) => {
        setWords(
          words.map((word) =>
            word._id === response.data._id ? response.data : word,
          ),
        );
        setEditWord({
          id: '',
          word: '',
          description: '',
          translation: '',
          createdAt: '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete words
  const handleDeleteWord = (id) => {
    // event.preventDefault();
    axios
      .post(`${API_URL}/word/${id}`, { user: user._id })
      .then((response) => {
        setWords(words.filter((word) => word._id !== response.data._id));
        setDeleteWord('');
        handleDeleteModalClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //search bar

  const filtered = words.filter((oneData) => {
    if (!oneData.word) {
      return false;
    } else if (!oneData.translation) {
      return true;
    } else {
      return (
        (oneData.word &&
          oneData.word.toLowerCase().includes(search.toLowerCase())) ||
        (oneData.translation &&
          oneData.translation.toLowerCase().includes(search.toLowerCase()))
      );
    }
  });

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleEditModalOpen = (
    id,
    word,
    description,
    translation,
    author,
    createdAt,
  ) => {
    setEditWord({
      id,
      word,
      description,
      translation,
      author,
      createdAt,
    });
    setEditModalIsOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalIsOpen(false);
  };

  const handleDeleteModalOpen = (id) => {
    setDeleteWord(id);
    setDeleteModalIsOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalIsOpen(false);
  };
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

  Modal.setAppElement('#root');

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-center text-4xl font-bold text-violet-600 my-4">
        Word List
      </h1>
      {isLoggedIn && (
        <>
          <button
            onClick={() => setModalIsOpen(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Add Word
          </button>
        </>
      )}
      <label
        htmlFor="description"
        className="block text-gray-700 font-bold mb-2"
      >
        SEARCH BAR
      </label>
      <input
        placeholder="Search by name or translation"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">Word</th>
            <th className="text-left px-4 py-2">Description</th>
            <th className="text-left px-4 py-2">Spanish Translation</th>
            {isLoggedIn && (
              <>
                <th className="text-left px-4 py-2">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filtered &&
            filtered.map((uniqueWord) => (
              // .sort((a, b) => new Date(b.date) - new Date(a.date))
              <tr key={uniqueWord._id}>
                <td className="border px-4 py-2">{uniqueWord.word}</td>
                <td className="border px-4 py-2">{uniqueWord.description}</td>
                <td className="border px-4 py-2">{uniqueWord.translation}</td>
                <td className="border px-4 py-2">
                  {isLoggedIn && (
                    <>
                      <button
                        onClick={() =>
                          handleEditModalOpen(
                            uniqueWord._id,
                            uniqueWord.word,
                            uniqueWord.description,
                            uniqueWord.translation,
                            // word.author,
                            // word.createdAt
                          )
                        }
                        className="bg-bluePro hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteModalOpen(uniqueWord._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PopUpWords
        modalIsOpen={modalIsOpen}
        handleModalClose={handleModalClose}
        handleAddWord={handleAddWord}
        newWord={newWord}
        handleInputChange={handleInputChange}
      />

      <EditWords
        editModalIsOpen={editModalIsOpen}
        handleEditModalClose={handleEditModalClose}
        handleEditWord={handleEditWord}
        editWord={editWord}
        handleEditInputChange={handleEditInputChange}
      />

      <DeleteWords
        deleteModalIsOpen={deleteModalIsOpen}
        handleDeleteModalClose={handleDeleteModalClose}
        handleDeleteWord={handleDeleteWord}
        deleteWord={deleteWord}
      />
    </div>
  );
};
