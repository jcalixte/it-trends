import { FunctionComponent } from "react"
import { Technology } from "../domain/technology"

export const TechnologyList: FunctionComponent<{
  technologies: Array<Technology>
}> = ({ technologies }) => {
  return (
    <ul>
      {technologies.map((tech) => (
        <li>{tech.Technology}</li>
      ))}
    </ul>
  )
}
