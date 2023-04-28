import React from "react";

export default function CategoriaList({ categoria, formatoDinero, gastado }) {
  const diccionarioImagenes = {
    Vivienda: "/src/assets/imgPresupuesto/vivienda.png",
    Transporte: "/src/assets/imgPresupuesto/transporte.png",
    Alimentacion: "/src/assets/imgPresupuesto/alimentos.png",
    Educacion: "/src/assets/imgPresupuesto/educacion.png",
    Salud: "/src/assets/imgPresupuesto/salud.png",
    CuidadoPersonal: "/src/assets/imgPresupuesto/cuidado-personal.png",
    Ahorros: "/src/assets/imgPresupuesto/ahorros.png",
    Ocio: "/src/assets/imgPresupuesto/ocio.png",
    Otros: "/src/assets/imgPresupuesto/otros.png",
  };

  return (
    <div>
      <img
        src={diccionarioImagenes[categoria.categoriaPresupuesto]}
        alt={`Imagen de ${categoria.categoriaPresupuesto}`}
      />
      <div>
        <div className="descripcion-gasto">
          <p>
            Gastado: <span>{formatoDinero(categoria.cantidad)}</span>
          </p>
          <p>
            <span className="categoria">{categoria.categoriaPresupuesto}</span>
          </p>
        </div>
        <div className="container-grafica-lineal-full">
          <div
            className="container-grafica-lineal"
            title={`${((categoria.cantidad * 100) / gastado).toFixed(2)}%`}
          >
            <div
              className="grafica-lineal"
              style={{
                width: `${((categoria.cantidad * 100) / gastado).toFixed(2)}%`,
              }}
            ></div>
          </div>
          <p>
            <span>{`${((categoria.cantidad * 100) / gastado).toFixed(
              2
            )}%`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
