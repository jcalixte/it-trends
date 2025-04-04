import { FunctionComponent } from "react"
import { Technology } from "../domain/technology"
import Papa from "papaparse"
import { stringToColor } from "../utils/stringToColor"

export const UploadTrends: FunctionComponent<{
  onFileParsed?: (data: Array<Technology>) => void
}> = ({ onFileParsed }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Papa.parse<Omit<Technology, "color">>(e.target.files[0], {
        header: true,
        complete: (results) => {
          onFileParsed?.(
            results.data.map((tech) => ({
              ...tech,
              color: stringToColor(tech.Technology),
            }))
          )
        },
      })
    }
  }

  return (
    <fieldset>
      <label htmlFor="upload-csv">Upload CSV</label>
      <input
        type="file"
        name="upload-csv"
        id="upload-csv"
        onChange={handleFileChange}
      />
    </fieldset>
  )
}
