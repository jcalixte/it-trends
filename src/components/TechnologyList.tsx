import { FunctionComponent } from "react"
import { Technology } from "../domain/technology"
import { stringToColor } from "../utils/stringToColor"

export const TechnologyList: FunctionComponent<{
  technologies: Array<Technology>
  checkedTechnologies: Map<string, boolean>
  onSelectTech?: (tech: string) => void
}> = ({ technologies, checkedTechnologies, onSelectTech }) => {
  const sortedTechnologies = [...technologies].sort((a, b) => {
    // first the checked
    if (
      checkedTechnologies.has(a.Technology) &&
      !checkedTechnologies.has(b.Technology)
    ) {
      return -1
    }

    if (
      !checkedTechnologies.has(a.Technology) &&
      checkedTechnologies.has(b.Technology)
    ) {
      return 1
    }

    return a.Technology < b.Technology ? -1 : 1
  })

  return (
    <ul>
      {sortedTechnologies.map((tech) => {
        const key = `check-${tech.Technology}`
        return (
          <li key={key}>
            <input
              id={key}
              type="checkbox"
              onChange={() => {
                onSelectTech?.(tech.Technology)
              }}
              checked={checkedTechnologies.has(tech.Technology)}
            />
            <label
              htmlFor={key}
              style={{
                color: tech.color,
              }}
            >
              {tech.Technology}
            </label>
          </li>
        )
      })}
    </ul>
  )
}
