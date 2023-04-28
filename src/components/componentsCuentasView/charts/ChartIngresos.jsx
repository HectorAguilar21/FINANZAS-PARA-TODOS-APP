import React, { useState } from "react";
import DoughnutChart from "./DoughnutChart";

export default function ChartIngresos({ categoriasIngresos }) {
  const transaccionesOrdenadas = [...categoriasIngresos].sort(
    (a, b) => a.cantidad - b.cantidad
  );
  const categorias = transaccionesOrdenadas.map(
    (transaccion) => transaccion.categoriaCuentasIngresos
  );
  const cantidades = transaccionesOrdenadas.map(
    (transaccion) => transaccion.cantidad
  );

  const chartIngresosData = {
    labels: categorias,
    datasets: [
      {
        label: "Ingresos",
        data: cantidades,
        borderColor: ["#001219"],
        backgroundColor: [
          "#E9F7EF",
          "#D4EFDF",
          "#A9DFBF",
          "#7DCEA0",
          "#52BE80",
          "#27AE60",
          "#229954",
          "#1E8449",
          "#196F3D",
          "#145A32",
        ],
      },
    ],
  };

  return <DoughnutChart chartData={chartIngresosData} />;
}
