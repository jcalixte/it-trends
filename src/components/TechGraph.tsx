import { FunctionComponent } from "react"
import { Technology } from "../domain/technology"
import { Line } from "react-chartjs-2"
import { ChartOptions } from "chart.js"

const options: ChartOptions<"line"> = {
  plugins: {
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
    legend: {
      display: false,
      position: "top",
    },
  },
  responsive: true,
}

export const TechGraph: FunctionComponent<{
  techs: Array<Technology>
  checkedTechnologies: Map<string, boolean>
}> = ({ techs, checkedTechnologies }) => {
  const labels = ["2024-09-07", "2024-11-07", "2025-02-06", "2025-04-03"]

  const filteredTechnologies = techs.filter((t) =>
    checkedTechnologies.has(t.Technology)
  )

  const data = {
    labels,
    datasets: filteredTechnologies.map((tech) => ({
      label: tech.Technology,
      data: [
        tech["2024-09-07"],
        tech["2024-11-07"],
        tech["2025-02-06"],
        tech["2025-04-03"],
      ],
      backgroundColor: tech.color,
      borderColor: tech.color,
    })),
  }
  return <Line options={options} data={data} />
}
