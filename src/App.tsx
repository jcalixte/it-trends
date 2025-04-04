import { useState } from "react"
import "./App.css"
import { UploadTrends } from "./components/UploadTrends"
import { Technology } from "./domain/technology"
import { TechnologyList } from "./components/TechnologyList"

const STORAGE_KEY = "theodo-it-trends"

function App() {
  const [technologies, setTechnologies] = useState<Array<Technology>>(
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") || []
  )

  const handleSetTechnologies = (techs: Array<Technology>) => {
    if (techs) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(techs))
      setTechnologies(techs)
    }
  }

  return (
    <>
      <h1>IT Trends</h1>
      {technologies.length === 0 ? (
        <UploadTrends onFileParsed={(techs) => handleSetTechnologies(techs)} />
      ) : (
        <TechnologyList technologies={technologies} />
      )}
    </>
  )
}

export default App
