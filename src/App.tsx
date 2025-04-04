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
  const [checkedTechnologies, setCheckedTechnologies] = useState<
    Map<string, boolean>
  >(new Map())

  const handleSetTechnologies = (techs: Array<Technology>) => {
    if (techs.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(techs))
      setTechnologies(techs)
    } else {
      clearTechno()
    }
  }

  const handleCheckTech = (tech: string) => {
    const hashMap = new Map(checkedTechnologies)

    if (hashMap.has(tech)) {
      hashMap.delete(tech)
    } else {
      hashMap.set(tech, true)
    }

    setCheckedTechnologies(hashMap)
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
        <UploadTrends
          onFileParsed={(techs) => {
            handleSetTechnologies(techs)
            setCheckedTechnologies(
              new Map(techs.map((t) => [t.Technology, true]))
            )
          }}
        />
      ) : (
        <main>
          <section className="technology-list">
            <TechnologyList
              technologies={technologies}
              checkedTechnologies={checkedTechnologies}
              onSelectTech={handleCheckTech}
            />
          </section>
          <section className="graph">Here is the graph</section>
        </main>
      )}
    </>
  )
}

export default App
