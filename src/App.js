import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

function App() {
  const [input,setInput]= useState('')
  const [searchValue] = useDebounce(input,1000)
  const [imgsrc,setImgSrc] = useState('')
  
  console.log(searchValue)

  useEffect(()=>{
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      let result = await response.blob();
      result = URL.createObjectURL(result)
      return result;
    }
    query({"inputs": "{searchValue}"}).then((response) => {
      setImgSrc(response)
    });
  },[searchValue])

  console.log(imgsrc)


  return (
    <div style={{backgroundColor:'#F3F4F6',height:'100%',padding:'20px 0 10vh 0'}}>
      <div className='box'>
        <p style={{fontSize:'24px'}}>Image Generation App</p>
        <br></br>
        <input onChange={(e)=>setInput(e.target.value)} style={{width:'20vw',height:'5vh', border:'1px solid #D1D5DB'}} type='text' />

      </div>
      <br></br>

        {
          imgsrc &&(
            <div style={{width:'40vw',marginLeft:'33%'}}>
              <img src={imgsrc} alt='imgage is being loaded' style={{height:'100%'}}></img>
            </div>
          )
        }
      
    </div>
  );
}

export default App;
