import { useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
const [showModel,setShowModel]=useState(false);

function handleToggleModel (){
  setShowModel(!showModel)
}

  return (
    <>
     <Main />
    {showModel && ( 
      <SideBar handleToggleModel={handleToggleModel} />
   )
    }
     <Footer handleToggleModel={handleToggleModel} />
    </>
  )
}

export default App
