import React, { useEffect, useState } from "react";
import ChartIngresos from "./charts/ChartIngresos";
import ChartEgresos from "./charts/ChartEgresos";

export default function Estadisticas({ cuentasIngresos, cuentasEgresos }) {
  const [categoriasIngresos, setCategoriasIngresos] = useState([]);
  const sumarCantidadesPorCategoriaI = () => {
    const categorias = cuentasIngresos.reduce((acumulador, ingreso) => {
      if (!acumulador[ingreso.categoriaCuentasIngresos]) {
        acumulador[ingreso.categoriaCuentasIngresos] = 0;
      }
      acumulador[ingreso.categoriaCuentasIngresos] += ingreso.cantidad;
      return acumulador;
    }, {});

    const nuevaCategoriaIngresos = Object.keys(categorias).map((categoria) => {
      return {
        categoriaCuentasIngresos: categoria,
        cantidad: categorias[categoria],
      };
    });

    setCategoriasIngresos(nuevaCategoriaIngresos);
  };
  useEffect(() => {
    sumarCantidadesPorCategoriaI();
  }, [cuentasIngresos]);

  const [categoriasEgresos, setCategoriasEgresos] = useState([]);
  const sumarCantidadesPorCategoriaE = () => {
    const categorias = cuentasEgresos.reduce((acumulador, egreso) => {
      if (!acumulador[egreso.categoriaCuentasEgresos]) {
        acumulador[egreso.categoriaCuentasEgresos] = 0;
      }
      acumulador[egreso.categoriaCuentasEgresos] += egreso.cantidad;
      return acumulador;
    }, {});

    const nuevaCategoriaEgresos = Object.keys(categorias).map((categoria) => {
      return {
        categoriaCuentasEgresos: categoria,
        cantidad: categorias[categoria],
      };
    });

    setCategoriasEgresos(nuevaCategoriaEgresos);
  };
  useEffect(() => {
    sumarCantidadesPorCategoriaE();
  }, [cuentasEgresos]);
  return (
    <div className="estadisticas-control">
      <div className="estadisticas-ingresos">
        <h2>Estadisticas Ingresos</h2>
        <div className="chart-doughnut">
          {categoriasIngresos.length > 0 ? (
            <ChartIngresos categoriasIngresos={categoriasIngresos} />
          ) : (
            <h2>Registra nuevos ingresos para ver tus estadisticas aqui.</h2>
          )}
        </div>
      </div>
      <div className="estadisticas-egresos">
        <h2>Estadisticas Egresos</h2>
        <div className="chart-doughnut">
          {categoriasEgresos.length > 0 ? (
            <ChartEgresos categoriasEgresos={categoriasEgresos} />
          ) : (
            <h2>Registra nuevos egresos para ver tus estadisticas aqui.</h2>
          )}
        </div>
      </div>
    </div>
  );
}
