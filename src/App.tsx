import { useState } from "react"
import "./App.css"
import { UploadTrends } from "./components/UploadTrends"
import { Technology } from "./domain/technology"
import { TechnologyList } from "./components/TechnologyList"

function App() {
  const [technologies, setTechnologies] = useState<Array<Technology>>([])
  return (
    <>
      <h1>IT Trends</h1>
      {technologies.length === 0 ? (
        <UploadTrends
          onFileParsed={(techs) => {
            console.log(techs)

            setTechnologies(techs)
          }}
        />
      ) : (
        <TechnologyList technologies={technologies} />
      )}
    </>
  )
}

export default App
