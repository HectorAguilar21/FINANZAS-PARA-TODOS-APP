import React from "react";
import { formatoDinero, generarFecha } from "../../helpers";

export default function Gasto({
  gasto,
  setEditarGasto,
  idModal,
  eliminarGasto,
}) {
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

  const handleEditarbtn = () => {
    setEditarGasto(gasto);
  };

  const handleEliminarbtn = () => {
    eliminarGasto(gasto.id);
  };

  return (
    <div>
      <img
        src={diccionarioImagenes[gasto.categoriaPresupuesto]}
        alt="imagen de alimentos"
      />
      <div className="descripcion-gasto">
        <p>
          Categoria: <span>{gasto.categoriaPresupuesto}</span>
        </p>
        <p>
          Titulo: <span>{gasto.nombre}</span>
        </p>
        <p>
          Fecha: <span>{generarFecha(gasto.fecha)}</span>
        </p>
      </div>
      <div className="valor-actions">
        <div className="valor-gasto">
          <p>
            <span>{formatoDinero(gasto.cantidad)}</span>
          </p>
        </div>
        <div className="btn-actions">
          <div
            onClick={handleEditarbtn}
            type="button"
            data-bs-toggle="modal"
            data-bs-target={`#${idModal}`}
          >
            <lord-icon
              src="https://cdn.lordicon.com/puvaffet.json"
              trigger="hover"
              colors="primary:#eeca66,secondary:#e8b730"
            ></lord-icon>
          </div>
          <div onClick={handleEliminarbtn}>
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="hover"
              colors="primary:#c71f16,secondary:#ee6d66"
            ></lord-icon>
          </div>
        </div>
      </div>
    </div>
  );
}
