import React from "react";
import { useEffect, useState } from "react";
import CategoriaList from "./CategoriaList";
import { formatoDinero } from "../../helpers";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ResumenGastos({
  formValorPresupuesto,
  setFormValorPresupuesto,
  gastos,
  setGastos,
  setFormPresupuesto,
  setViewPresupuesto,
  setViewLanding,
}) {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = formValorPresupuesto - totalGastado;
    setGastado(totalGastado);
    setDisponible(totalDisponible);

    const porcentajeGastado = (
      ((formValorPresupuesto - totalDisponible) / formValorPresupuesto) *
      100
    ).toFixed(2);
    setPorcentaje(porcentajeGastado);
  }, [gastos]);

  const [categoriasGastos, setCategoriasGastos] = useState([]);
  const sumarCantidadesPorCategoria = () => {
    const categorias = gastos.reduce((acumulador, gasto) => {
      if (!acumulador[gasto.categoriaPresupuesto]) {
        acumulador[gasto.categoriaPresupuesto] = 0;
      }
      acumulador[gasto.categoriaPresupuesto] += gasto.cantidad;
      return acumulador;
    }, {});

    const nuevaCategoriaGastos = Object.keys(categorias).map((categoria) => {
      return {
        categoriaPresupuesto: categoria,
        cantidad: categorias[categoria],
      };
    });

    setCategoriasGastos(nuevaCategoriaGastos);
  };
  useEffect(() => {
    sumarCantidadesPorCategoria();
  }, [gastos]);

  const handleResetApp = () => {
    const confirmacion = confirm(
      "¿Deseas reinicar la app y perder todos los datos?"
    );

    if (confirmacion) {
      setGastos([]);
      setFormValorPresupuesto(0);
      localStorage.setItem("viewPresupuesto", "");
      localStorage.setItem("formPresupuesto", "");
      setFormPresupuesto(false);
      setViewPresupuesto(false);
      setViewLanding(true);
      localStorage.setItem("gastos", "");
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const [viewEstadisticas, setViewEstadisticas] = useState(true);

  useEffect(() => {
    if (windowWidth > 1280) {
      setViewEstadisticas(true);
    }
  }, [windowWidth]);
  const handleMostrarEstadisticas = () => {
    if (viewEstadisticas && windowWidth < 1280) {
      setViewEstadisticas(false);
    } else {
      setViewEstadisticas(true);
    }
  };

  return (
    <div className="graficas-container">
      <div>
        <h2>Mira tus resumen de gastos</h2>
        <header>
          <div className="grafica-circular">
            <CircularProgressbar
              value={porcentaje}
              styles={buildStyles({
                pathColor: porcentaje > 100 ? "#d82727" : "#3b82f6",
                textSize: "14",
                textColor: porcentaje > 100 ? "#d82727" : "#3b82f6",
              })}
              text={`${porcentaje}%`}
            />
          </div>
          <div>
            <button
              className="btn-reset"
              type="button"
              onClick={handleResetApp}
            >
              Reiniciar app
            </button>
            <p>
              Presupuesto: <span>{formatoDinero(formValorPresupuesto)}</span>
            </p>
            <p className={`${disponible < 0 ? "color-rojo" : ""}`}>
              Disponible: <span>{formatoDinero(disponible)}</span>
            </p>
            <p>
              Gastado: <span>{formatoDinero(gastado)}</span>
            </p>
          </div>
        </header>
        <section>
          <button
            className="btn-show-estadisticas"
            type="button"
            onClick={handleMostrarEstadisticas}
          >
            {viewEstadisticas ? "Ocultar Estadisticas" : "Mostrar estadisticas"}
          </button>
          {viewEstadisticas ? (
            <div className="container-resumen-categoria">
              {categoriasGastos.map((categoria, index) => (
                <CategoriaList
                  key={index}
                  categoria={categoria}
                  formatoDinero={formatoDinero}
                  gastado={gastado}
                />
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
