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
      setTechnologies(
        techs.sort((a, b) => (a.Technology < b.Technology ? -1 : 1))
      )
    }
  }

  const clearTechno = () => {
    setTechnologies([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <>
      <h1>Technology Evolution Trends</h1>
      <button onClick={() => clearTechno()}>clear storage</button>
      {technologies.length === 0 ? (
        <UploadTrends onFileParsed={(techs) => handleSetTechnologies(techs)} />
      ) : (
        <main>
          <section className="technology-list">
            <TechnologyList technologies={technologies} />
          </section>
          <section className="graph">Here is the graph</section>
        </main>
      )}
    </>
  )
}

export default App
