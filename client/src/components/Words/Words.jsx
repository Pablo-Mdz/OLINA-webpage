import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AuthContext } from '../../context/auth.context';
import EditWords from './EditWords';
import DeleteWords from './DeleteWords';
import { AddWords } from './AddWords';


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

  Modal.setAppElement('#root');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const handleLetterClick = (letter) => {
    setSearch(letter);
  };

  return (
    <div className="bg-whitePro min-h-screen font-pop">
      <div className="mx-auto max-w-7xl p-4 ">
        <h1 className="text-center text-4xl font-bold text-primary my-6">
          WORD LIST
        </h1>
        <div className="flex space-x-4 mb-4 justify-center">
          {alphabet.split('').map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className="bg-primary text-whitePro px-2 py-1 my-4 rounded-md hover:bg-secondary focus:outline-none"
            >
              {letter}
            </button>
          ))}
        </div>
        {isLoggedIn && (
          <>
            <button
              onClick={() => setModalIsOpen(true)}
              className="bg-purplePro hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Add Word
            </button>
          </>
        )}
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2 text-2xl"
        >
          Search by name or translation
        </label>
        <input
          placeholder="..."
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <table className="table-auto w-full  ">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 ">Word</th>
              <th className="text- px-center4 py-2">Description</th>
              <th className="text-left px-4 py-2">Spanish Translation</th>
              {/* {isLoggedIn && (
                <>
                  <th className="text-center px-4 py-2">Actions</th>
                </>
              )} */}
            </tr>
          </thead>
          <tbody>
            {filtered &&
              filtered.map((uniqueWord) => (
                // .sort((a, b) => new Date(b.date) - new Date(a.date))
                <tr key={uniqueWord._id}>
                  <td className="text-left px-4 py-2 text-violetPro bg-whitePro border border-primary ">
                    {uniqueWord.word}
                  </td>
                  <td className="text-left px-4 py-2 text-violetPro bg-whitePro border border-primary">
                    {uniqueWord.description}
                  </td>
                  <td className="text-left px-4 py-2 text-violetPro bg-whitePro border border-primary">
                    {uniqueWord.translation}
                  </td>
                  <td className="text-center flex justify-around items-stretch  px-3 py-2 text-violetPro bg-whitePro">
                    {isLoggedIn && (
                      <>
                        <button
                          onClick={() =>
                            handleEditModalOpen(
                              uniqueWord._id,
                              uniqueWord.word,
                              uniqueWord.description,
                              uniqueWord.translation,
                            )
                          }
                          className="w-20 mx-1 bg-bluePro hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteModalOpen(uniqueWord._id)}
                          className="w-20 mx-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        <AddWords
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
    </div>
  );
};
