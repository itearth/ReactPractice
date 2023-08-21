
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import axios from 'axios';
import Navbar from '../../generics/Navbar/Navbar';
import { postsActions } from '../../../redux/slices/posts.slice';
import styles from '../Post/PostPage.module.css';
import { BarLoader } from 'react-spinners';
import { fetchPosts, createPost } from '../../../../src/services/postService'; 

function PostPage() {

  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.postsState);

  const [isFormVisible, setFormVisibility] = useState(false);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    loadPosts();
  }, [dispatch]);

  async function loadPosts() {
    dispatch(postsActions.setLoading(true));
    try {
      const data = await fetchPosts(dispatch);
      dispatch(postsActions.setPosts(data));
    } catch (exception) {
      // Handle error
    } finally {
      dispatch(postsActions.setLoading(false));
    }
  }
  async function handleAddPost() {
    dispatch(postsActions.setLoading(true));
    try {
      const postData = {
        title,
        body,
        userId
      };
      await createPost(dispatch, postData);
      const updatedPosts = await fetchPosts(dispatch);
      dispatch(postsActions.setPosts(updatedPosts));
      alert('Post successfully created!');
      setFormVisibility(false);
    } catch (exception) {
      // Handle error
    } finally {
      dispatch(postsActions.setLoading(false));
    }
  }

  return (
    <div className="App">
      <Navbar />

      <div className={styles.buttonContainer}>
        <button className={styles.addPostButton} onClick={() => {
          setFormVisibility(true);
          console.log('Form visibility:', isFormVisible);
        }}>
          Add Post
        </button>
      </div>

      {isFormVisible && (
        <div className={styles.formContainer}>
          <h2>Add a New Post</h2>
          <input
            className={styles.formInput}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.formInput}
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            className={styles.formInput}
            type="number"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <div className={styles.formButtons}>
            <button
              onClick={() => {
                if (title && body && userId) {
                  handleAddPost();
                  setFormVisibility(false);
                } else {
                  alert('Please fill all fields');
                }
              }}
            >
              Submit
            </button>
            <button onClick={() => setFormVisibility(false)}>Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loadingContainer}>
          <BarLoader color="#45b191" loading={loading} />
        </div>
      ) : (
        <div className={styles.cardsContainer}>
          {posts.map((post, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.cardImage}>
                <img
                  src={`https://source.unsplash.com/300x200/?nature,${post.id}`}
                  alt="Nature"
                  className={styles.image}
                />
              </div>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardBody}>{post.body}</p>
              <button className={styles.cardButton}>Action</button>
            </div>
          ))}
        </div>
      )}


    </div>
  );
}

export default PostPage;































































// import React, { useState } from 'react'
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// //import axios from 'axios';
// import Navbar from '../../generics/Navbar/Navbar';
// import { postsActions } from '../../../redux/slices/posts.slice';
// import styles from '../Post/PostPage.module.css';
// import { BarLoader } from 'react-spinners';
// import { fetchPosts, createPost } from '../../../../src/services/postService'; 

// function PostPage() {

//   const dispatch = useDispatch();
//   const { posts, loading } = useSelector((state) => state.postsState);

//   const [isFormVisible, setFormVisibility] = useState(false);

//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     loadPosts();
//   }, [dispatch]);

//   async function loadPosts() {
//     dispatch(postsActions.setLoading(true));
//     try {
//       const data = await fetchPosts();
//       dispatch(postsActions.setPosts(data));
//     } catch (exception) {
//       // Handle error
//     } finally {
//       dispatch(postsActions.setLoading(false));
//     }
//   }

//   async function handleAddPost() {
//     dispatch(postsActions.setLoading(false));
//     try {
//       const postData = {
//         title: 'Test Post',
//         body: 'Content Dummy',
//         userId: 1
//       };
//       await createPost(postData);
//       alert('Post successfully created!');
//       dispatch(postsActions.setLoading(false));
//     } catch (exception) {
//       // Handle error
//       dispatch(postsActions.setLoading(false));
//     }
//   }

//   return (
//     <div className="App">
//       <Navbar />

//       <div className={styles.buttonContainer}>
//         <button className={styles.addPostButton} onClick={() => {
//           setFormVisibility(true);
//           console.log('Form visibility:', isFormVisible);
//         }}>
//           Add Post
//         </button>
//       </div>

//       {isFormVisible && (
//         <div className={styles.formContainer}>
//           <h2>Add a New Post</h2>
//           <input
//             className={styles.formInput}
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <textarea
//             className={styles.formInput}
//             placeholder="Body"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//           />
//           <input
//             className={styles.formInput}
//             type="number"
//             placeholder="User ID"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//           />
//           <div className={styles.formButtons}>
//             <button
//               onClick={() => {
//                 if (title && body && userId) {
//                   handleAddPost();
//                   setFormVisibility(false);
//                 } else {
//                   alert('Please fill all fields');
//                 }
//               }}
//             >
//               Submit
//             </button>
//             <button onClick={() => setFormVisibility(false)}>Cancel</button>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className={styles.loadingContainer}>
//           <BarLoader color="#45b191" loading={loading} />
//         </div>
//       ) : (
//         <div className={styles.cardsContainer}>
//           {posts.map((post, index) => (
//             <div className={styles.card} key={index}>
//               <div className={styles.cardImage}>
//                 <img
//                   src={`https://source.unsplash.com/300x200/?nature,${post.id}`}
//                   alt="Nature"
//                   className={styles.image}
//                 />
//               </div>
//               <h3 className={styles.cardTitle}>{post.title}</h3>
//               <p className={styles.cardBody}>{post.body}</p>
//               <button className={styles.cardButton}>Action</button>
//             </div>
//           ))}
//         </div>
//       )}


//     </div>
//   );
// }

// export default PostPage;



