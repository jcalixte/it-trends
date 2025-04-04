import { FunctionComponent } from "react"
import { Technology } from "../domain/technology"

export const TechnologyList: FunctionComponent<{
  technologies: Array<Technology>
  checkedTechnologies: Map<string, boolean>
  onSelectTech?: (tech: string) => void
}> = ({ technologies, checkedTechnologies, onSelectTech }) => {
  return (
    <ul>
      {technologies.map((tech) => (
        <li key={tech.Technology}>
          <input
            type="checkbox"
            onChange={() => {
              onSelectTech?.(tech.Technology)
            }}
            checked={checkedTechnologies.has(tech.Technology)}
          />
          {tech.Technology}
        </li>
      ))}
    </ul>
  )
}
