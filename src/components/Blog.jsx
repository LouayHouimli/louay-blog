import { collection,  getDocs ,addDoc,doc,deleteDoc } from 'firebase/firestore';
import React from 'react'
import { useState ,useEffect} from 'react';
import { db } from '../firebase-config';
import './Blog.css'


const Blog = () => {

 const [blogs,setBlogs] = useState([]);
 const usersCollectionRef = collection(db, "blogs");

 const getBlogs = async () =>{
  try{
     const data = await getDocs(usersCollectionRef);
    const blogsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setBlogs(blogsData);
    localStorage.setItem('blogs', JSON.stringify(blogsData));
    console.log("fetched and saved to localStorage");
    if (blogsData.length === 0){
      setNoBlogs(true)
    }
    else{
      setNoBlogs(false)
    }
    
    
    
    
    
  }
  catch(error){
    console.error("error fetching from firebase")
  }
   
    
    
   
    



 }
 const [newTitle, setNewTile] = useState("")
  const [newContent , setNewContent] = useState("")
  const [newAuthor,setNewAuthor] = useState("")
  const [newImg , setNewImg] = useState("")
  const [isSubmited , setIsSubmited] = useState(false)
  const [noBlogs,setNoBlogs ] = useState(false)
  const [isDeleted,setIsDeleted] = useState(false)


  

  const handleTitleChange = (event) =>{
    setNewTile(event.target.value)
    

  }
  const handleContentChange = (event) =>{
    setNewContent(event.target.value)
    
  }
  const handleAuthorChange = (event) =>{
    setNewAuthor(event.target.value)
    
  }
  const handleImgChange = (event) =>{
    setNewImg(event.target.value)
    
  }


  const createBlog = async () =>{
    if( newTitle !== "" && newContent !== "" && newAuthor !== "" && newImg !=="" ){
      try{
         await addDoc(usersCollectionRef, {title : newTitle, content : newContent , author : newAuthor , img : newImg})
       setNewImg("")
       setNewAuthor("")
       setNewContent("")
       setNewTile("")
       setIsSubmited(true)
      }
      catch(error){
        console.error("error adding blog")
      }
      
      
    }
    else{
      alert("t5ali fehom fer8in")
    }
   

  }
  const deleteBlog =  async(id) =>{
    const BlogDoc = doc(db,"blogs",id)
    await deleteDoc(BlogDoc)
    setIsDeleted(true)

  }


  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs'));

      if (storedBlogs) {
        setBlogs(storedBlogs);
        console.log("Loaded blogs from localStorage");
        if (storedBlogs.length === 0){
          setNoBlogs(true)
        }
        else{
          setNoBlogs(false)
        }
      } else {
        getBlogs();
      }

      
  
    
    
    
  }, []);

  useEffect(() => {
    if (isSubmited){
      getBlogs();
      setIsSubmited(false)
    }
    
}, [isSubmited]);

useEffect(() => {
  if (isDeleted){
    getBlogs();
    setIsDeleted(false)
  }
  
}, [isDeleted]);



  return (
    <>
    <form action="">
      <table>
    <div className='create-container'>
      
        
    <div className='title-container'>
    <tr>
        <td>
        <label htmlFor="">Title : </label>
        </td>
        <td>
        <input type="text" onChange={handleTitleChange} value={newTitle} />
        </td>
      </tr>
   

    </div> 

    <div className='title-container'>
      <tr>
        <td>
        <label htmlFor="">Content : </label>
        </td>
        <td>
        <textarea name="" id="" onChange={handleContentChange} value={newContent}></textarea>
        </td>
      </tr>
    
    

    </div > 
    <div>
    <label htmlFor="">Author : </label>
    <input type="text"  onChange={handleAuthorChange} value={newAuthor}/>

    </div> 
    <div>
    <label htmlFor="">Image URL : </label>
    <input type="text"  onChange={handleImgChange} value={newImg}/>

    </div> 

    <div>
      <input  type="button" onClick={createBlog} value="submit" />
      <input type="reset" value="reset" />
    </div>

    <div>
      <h1 className='not-found-blogs'>{noBlogs ? "No Blogs Found" : ""}</h1>
    </div>
    



        

        </div>
        </table>
        </form>
    

    <div className='mini-body'>
        {blogs.map((blog) => 
            <div key={blog.id} className='blog-container'> 
              <input type="button" value="Delete" onClickCapture={() =>deleteBlog(blog.id)} />
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