import React from "react";
import { formatoDinero, generarFecha } from "../../helpers";

export default function Gasto({
  gasto,
  setEditarGasto,
  idModal,
  eliminarGasto,
}) {
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
        title="imagen obtenida en: 'https://www.flaticon.es/iconos-gratis/direccion Dirección iconos creados por kerismaker'"
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
