import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {

  const [data,setData] = useState(null) 
  const [showModel,setShowModel]=useState(false);

  function handleToggleModal (){
    setShowModel(!showModel)
  }

  useEffect(()=>{
    async function fetchAPIData(){    
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = 'https://api.nasa.gov/planetary/apod' +`?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString();
      const localKey = `NASA-${today}`
      if(localStorage.getItem(localKey)){
        setData(JSON.parse(localStorage.getItem(localKey)))
        return
      }
      localStorage.clear()

      try{
        const response = await fetch(url)
        const apiData = await response.json()
        localStorage.setItem(localKey,JSON.stringify(apiData))
        setData(apiData)
        console.log(apiData);

      } 
      catch(error){
        console.log(error)
        }
    }
    fetchAPIData()
  },[])
  return (
    <>
    {
      data? 
      (<Main data={data} />) :  (
        <div className="loading">
          <i className="fa-solid fa-spinner"></i>
          <span>LOADING</span>
        </div>
      )
    }
    {showModel && ( 
      <SideBar data={data} handleToggleModal={handleToggleModal} />
   )
    }
     {data&& (
      <Footer data={data} handleToggleModal={handleToggleModal} />
     )}
    </>
  )
}

export default App
