import React, { useState } from "react";
import DoughnutChart from "./DoughnutChart";

export default function ChartEgresos({ categoriasEgresos }) {
  const transaccionesOrdenadas = [...categoriasEgresos].sort(
    (a, b) => a.cantidad - b.cantidad
  );
  const categorias = transaccionesOrdenadas.map(
    (transaccion) => transaccion.categoriaCuentasEgresos
  );
  const cantidades = transaccionesOrdenadas.map(
    (transaccion) => transaccion.cantidad
  );

  const chartEgresosData = {
    labels: categorias,
    datasets: [
      {
        label: "Egresos",
        data: cantidades,
        borderColor: ["#001219"],
        backgroundColor: [
          "#F9EBEA",
          "#F2D7D5",
          "#E6B0AA",
          "#D98880",
          "#CD6155",
          "#C0392B",
          "#A93226",
          "#922B21",
          "#7B241C",
          "#641E16",
        ],
      },
    ],
  };

  return <DoughnutChart chartData={chartEgresosData} />;
}
