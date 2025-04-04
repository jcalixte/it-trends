import { useState } from "react"
import "./App.css"
import { UploadTrends } from "./components/UploadTrends"
import { Technology } from "./domain/technology"
import { TechnologyList } from "./components/TechnologyList"

const STORAGE_KEY = "theodo-it-trends"

const toHashMap = (techs: Array<Technology>) =>
  new Map(techs.map((t) => [t.Technology, true]))

function App() {
  const [technologies, setTechnologies] = useState<Array<Technology>>(
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") || []
  )
  const [checkedTechnologies, setCheckedTechnologies] = useState<
    Map<string, boolean>
  >(toHashMap(technologies))
  const [minRangeChange, setMinRangeChange] = useState(0)

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

  const toggleAll = () => {
    if (checkedTechnologies.size === technologies.length) {
      setCheckedTechnologies(new Map())
    } else {
      setCheckedTechnologies(toHashMap(technologies))
    }
  }

  const applyMinRangeChange = () => {
    setCheckedTechnologies(
      new Map(toHashMap(technologies.filter((t) => t.range >= minRangeChange)))
    )
  }

  return (
    <>
      <h1>Technology Evolution Trends</h1>
      <button onClick={() => clearTechno()}>clear storage</button>
      {technologies.length === 0 ? (
        <UploadTrends
          onFileParsed={(techs) => {
            handleSetTechnologies(techs)
            setCheckedTechnologies(toHashMap(techs))
          }}
        />
      ) : (
        <main>
          <section className="technology-list">
            <button onClick={() => toggleAll()}>Select/Deselect All</button>
            <div>
              <label htmlFor="min-range-change">Min Rank Change</label>
              <input
                type="number"
                id="min-range-change"
                value={minRangeChange}
                onChange={(e) => setMinRangeChange(Number(e.target.value))}
              />
              <button onClick={() => applyMinRangeChange()}>Apply</button>
            </div>
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
