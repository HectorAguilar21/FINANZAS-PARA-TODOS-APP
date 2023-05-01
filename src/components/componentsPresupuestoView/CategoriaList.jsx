import React from "react";

export default function CategoriaList({ categoria, formatoDinero, gastado }) {
  const diccionarioImagenes = {
    Vivienda: "img/imgPresupuesto/vivienda.png",
    Transporte: "img/imgPresupuesto/transporte.png",
    Alimentacion: "img/imgPresupuesto/alimentos.png",
    Educacion: "img/imgPresupuesto/educacion.png",
    Salud: "img/imgPresupuesto/salud.png",
    CuidadoPersonal: "img/imgPresupuesto/cuidado-personal.png",
    Ahorros: "img/imgPresupuesto/ahorros.png",
    Ocio: "img/imgPresupuesto/ocio.png",
    Otros: "img/imgPresupuesto/otro.png",
  };

  return (
    <div>
      <img
        src={diccionarioImagenes[categoria.categoriaPresupuesto]}
        alt={`Imagen de ${categoria.categoriaPresupuesto}`}
        title="imagen obtenida en: 'https://www.flaticon.es/iconos-gratis/direccion Dirección iconos creados por kerismaker'"
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
