import { Line } from "react-chartjs-2"
import { Mes } from "../classes/Mes"
import { MesCard } from "./MesCard"
import { Chart, registerables } from "chart.js"

export const MesesCard = ({meses} : {meses: Mes[]}) =>{
    Chart.register(...registerables)


    let labels   : string[] = []
    let dataMeses: number[] = []
    meses.forEach(element => {
        labels.push(element.numero.toString())
        dataMeses.push(element.investimento.getSaldo())
    });

    const data = {
        labels,
        datasets:[
            {
                label: "Dinheiro total",
                data: dataMeses
            },
            
        ],
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      

    return(
        <div style={({display: "flex", flexWrap: "wrap", justifyContent: "center"})}>
            {meses.map((mesAtual)=>(
                <MesCard mes={mesAtual}/>
            ))}
            <Line data={data} options={options} />
        </div>
    )

}