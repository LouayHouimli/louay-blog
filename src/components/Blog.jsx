import { collection,  getDocs } from 'firebase/firestore';
import React from 'react'
import { useState ,useEffect} from 'react';
import { db } from '../firebase-config';
import './Blog.css'


const Blog = () => {

 const [blogs,setBlogs] = useState([]);
 const usersCollectionRef = collection(db, "blogs");

 const getBlogs = async () =>{
    const data = await getDocs(usersCollectionRef);
    const blogsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setBlogs(blogsData);
    
   
    



 }

 useEffect(() => {
    // Check if data is available in local storag
    
      getBlogs();

   
  }, []);


  return (
    <>

    <div className='mini-body'>
        {blogs.map((blog) => 
            <div key={blog.id} className='blog-container'> 
                <h1>{blog.title}</h1>
                <h2>{blog.content}</h2>
                <div className='author-details'>
                <i className='author-name'> {blog.author} </i>
                <img className='author-img' alt={ `${blog.author} Avatar` } src={blog.img}   />
            
                </div>
                
            </div>
           
        )}
        </div>


   
    </>
  )
}

export default Blog