import { FunctionComponent } from "react"
import { Technology } from "../domain/technology"
import Papa from "papaparse"
import { stringToColor } from "../utils/stringToColor"

export const UploadTrends: FunctionComponent<{
  onFileParsed?: (data: Array<Technology>) => void
}> = ({ onFileParsed }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Papa.parse<Omit<Technology, "color" | "range">>(e.target.files[0], {
        header: true,
        complete: (results) => {
          onFileParsed?.(
            results.data.map((tech) => {
              const range =
                Math.max(
                  Number(tech["2024-09-07"]),
                  Number(tech["2024-11-07"]),
                  Number(tech["2025-02-06"]),
                  Number(tech["2025-04-03"])
                ) -
                Math.min(
                  Number(tech["2024-09-07"]),
                  Number(tech["2024-11-07"]),
                  Number(tech["2025-02-06"]),
                  Number(tech["2025-04-03"])
                )
              return {
                ...tech,
                color: stringToColor(tech.Technology),
                range,
              }
            })
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
