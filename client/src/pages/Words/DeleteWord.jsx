// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import Modal from 'react-modal';
// import { AuthContext } from '../../context/auth.context';
// import { Words } from './Words';


// const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

// const handleDeleteWord = (id) => {
//     // event.preventDefault();
//     axios
//       .post(`${API_URL}/word/${id}`, { user: user._id })
//       .then((response) => {
//         setWords(words.filter((word) => word._id !== response.data._id));
//         setDeleteWord('');
//         handleDeleteModalClose();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   export {
//     handleDeleteWord
//   }