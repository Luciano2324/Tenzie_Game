import Navbar from "./components/Navbar"
import React from "react"
import Tenzie from "./components/Tenzie"
import { BrowserRouter as Router,Route,Routes } from "react-router-dom"

//npx json-server --watch database/db.json --port 8000
// import {nanoid} from nanoid ------- this creates a unique id if u needed

export default  function App() {
  const [darkMode, setDarkMode] = React.useState(true)

  function toggleDarkMode(){
    setDarkMode(prevValue => !prevValue)
  }

  return (
    <Router>
      <main>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="routes">
          <Routes>
            <Route exact path="/" element={<Tenzie darkMode={darkMode} />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}