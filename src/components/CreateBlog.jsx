
import './CreateBlog.css'
import { collection,  getDocs ,addDoc } from 'firebase/firestore';
import React from 'react'
import { useState ,useEffect} from 'react';
import { db } from '../firebase-config';



const CreateBlog = () => {
  const [newTitle, setNewTile] = useState("")
  const [newContent , setNewContent] = useState("")
  const [newAuthor,setNewAuthor] = useState("")
  const [newImg , setNewImg] = useState("")


  

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

  const usersCollectionRef = collection(db, "blogs");

  const createBlog = async () =>{
    await addDoc(usersCollectionRef, {title : newTitle, content : newContent , author : newAuthor , img : newImg})
    

  }





  return (
    <>  
    <form action="">
    <div>
        
    <div>
    <label htmlFor="">Title : </label>
    <input type="text" onChange={handleTitleChange} />

    </div> 
    <div>
    <label htmlFor="">Content : </label>
    <textarea name="" id="" onChange={handleContentChange}></textarea>

    </div> 
    <div>
    <label htmlFor="">Author : </label>
    <input type="text"  onChange={handleAuthorChange}/>

    </div> 
    <div>
    <label htmlFor="">Image URL : </label>
    <input type="text"  onChange={handleImgChange}/>

    </div> 

    <div>
      <input  type="button" onClick={createBlog} value="submit" />
      <input type="reset" value="reset" />
    </div>
    



        

        </div>
        </form>
    
    
      </>
  )
}

export default CreateBlog