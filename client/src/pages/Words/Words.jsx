import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from "react-modal";
import {useNavigate} from "react-router-dom";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "400px",
        width: "90%",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        padding: "20px",
    },
};

Modal.setAppElement("#root");

export const Words = () => {
    const [words, setWords] = useState([]);
    const navigate = useNavigate();

    const [newWord, setNewWord] = useState({
        word: "",
        description: "",
        translation: "",
        // author: "",
        // createdAt: "",
    });

    const [editWord, setEditWord] = useState({
        id: "",
        word: "",
        description: "",
        translation: "",
        // author: "",
        // createdAt: "",
    });
    const [deleteWord, setDeleteWord] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

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
        // event.preventDefault();
        axios
            .post(`${API_URL}/word`, newWord)
            .then((response) => {
                setWords([...words, response.data]);
                setNewWord({
                    word: "",
                    description: "",
                    translation: "",
                    // author: "",
                    // createdAt: "",
                });
            })
            .catch((error) => {
                console.log("post doesn't work", error);
            });
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setNewWord({...newWord, [name]: value});
    };

    const handleEditInputChange = (event) => {
        const {name, value} = event.target;
        setEditWord({...editWord, [name]: value});
    };

    const handleEditWord = () => {
        // event.preventDefault();
        axios
            .post(`${API_URL}/word/${editWord.id}/edit`, editWord)
            .then((response) => {
                setWords(
                    words.map((word) =>
                        word._id === response.data._id ? response.data : word
                    )
                );
                setEditWord({
                    id: "",
                    word: "",
                    description: "",
                    translation: "",
                    // author: "",
                    // createdAt: "",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeleteWord = (id) => {
        // event.preventDefault();
        axios
            .delete(`${API_URL}/word/${id}`)
            .then((response) => {
                setWords(
                    words.filter((word) => word._id !== response.data._id)
                );
                setDeleteWord("");
                handleDeleteModalClose();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleModalOpen = () => {
        setModalIsOpen(true);
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
    };

    const handleEditModalOpen = (
        id,
        word,
        description,
        translation
        // author,
        // createdAt
    ) => {
        setEditWord({id, word, description, translation});
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
    
    //search bar
    const [search, setSearch] = useState("");

    const filtered = words.filter((oneData) => {
        if (!oneData.word) {
            return false
        } else if (!oneData.translation) {
            return true;
        } else {
            return (
                oneData.word && oneData.word.toLowerCase().includes(search.toLowerCase()) ||
                oneData.translation && oneData.translation.toLowerCase().includes(search.toLowerCase())
              );
              
        }
    });


    return (
        <div className="mx-auto max-w-md">
            <h1 className="text-center text-4xl font-bold text-violet-600 my-4">
                Word List
            </h1>
            <form onSubmit={handleAddWord} className="my-4">
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
                        type="text"
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
                        htmlFor="translation"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Spanish Translation :
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
            </form>
            <label
                        htmlFor="description"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        SEARCH BAR
                    </label>
            <input
                    placeholder="Search by name or trnslation"
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
                        <th className="text-left px-4 py-2">
                            Spanish Translation
                        </th>
                        <th className="text-left px-4 py-2">Actions</th>
                    </tr>
                </thead>         
                <tbody>
                    {filtered &&
                        filtered.map((uniqueWord) => (
                            // .sort((a, b) => new Date(b.date) - new Date(a.date))
                                <tr key={uniqueWord._id}>
                                    <td className="border px-4 py-2">
                                        {uniqueWord.word}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {uniqueWord.description}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {uniqueWord.translation}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() =>
                                                handleEditModalOpen(
                                                    uniqueWord._id,
                                                    uniqueWord.word,
                                                    uniqueWord.description,
                                                    uniqueWord.translation
                                                    // word.author,
                                                    // word.createdAt
                                                )
                                            }
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteModalOpen(
                                                    uniqueWord._id
                                                )
                                            }
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>

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

            {/* modal edit  */}
            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={handleEditModalClose}
                style={customStyles}
                contentLabel="Edit Word Modal"
            >
                <h2 className="text-center text-2xl font-bold text-violet-600 my-4">
                    Edit Word
                </h2>
                <form onSubmit={handleEditWord}>
                    <input
                        type="hidden"
                        id="id"
                        name="id"
                        value={editWord.id}
                    />
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
                            value={editWord.word}
                            onChange={handleEditInputChange}
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
                            value={editWord.description}
                            onChange={handleEditInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="translation"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Spanish Translation:
                        </label>
                        <input
                            type="text"
                            id="translation"
                            name="translation"
                            value={editWord.translation}
                            onChange={handleEditInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleEditModalClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    >
                        Cancel
                    </button>
                </form>
            </Modal>
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
