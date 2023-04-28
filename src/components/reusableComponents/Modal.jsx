import React from "react";
import { useEffect, useState } from "react";

export default function Modal({
  idModal,
  guardarGasto,
  guardarRegistroIngreso,
  guardarRegistroEgreso,
  editarGasto,
  editarRegistro,
  handleLimpiarModal,
}) {
  const [infoModal, setInfoModal] = useState({});
  const nuevoRegistro = {
    titulo: "Ingresa un nuevo registro",
    editarTitulo: "Edita el registro",
    nombre: "Nombre del registro",
    cantidad: "Monto del registro",
    vista: "cuentas",
    tipo: "Tipo del registro",
    categoria: "Categoria del registro",
    boton: "Guardar registro",
    editarBoton: "Editar registro",
  };
  const nuevoGasto = {
    titulo: "Ingresa un nuevo gasto",
    editarTitulo: "Edita el gasto",
    nombre: "Nombre del gasto",
    cantidad: "Monto gastado",
    vista: "presupuesto",
    categoria: "Categoria del gasto",
    boton: "Guardar gasto",
    editarBoton: "Editar gasto",
  };
  useEffect(() => {
    switch (idModal) {
      case "nuevoGasto":
        setInfoModal(nuevoGasto);
        break;
      case "nuevoRegistroCuentas":
        setInfoModal(nuevoRegistro);
        break;
      default:
        setInfoModal({});
        break;
    }
  }, [idModal]);

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [categoriaPresupuesto, setCategoriaPresupuesto] = useState("");
  const [tipoTransaccion, setTipoTransaccion] = useState("");
  const [categoriaCuentasIngresos, setCategoriaCuentasIngresos] = useState("");
  const [categoriaCuentasEgresos, setCategoriaCuentasEgresos] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (idModal === "nuevoGasto") {
      guardarGasto({ nombre, cantidad, categoriaPresupuesto, id, fecha });
    } else if (
      idModal === "nuevoRegistroCuentas" &&
      tipoTransaccion === "ingreso"
    ) {
      guardarRegistroIngreso({
        nombre,
        cantidad,
        tipoTransaccion,
        categoriaCuentasIngresos,
        id,
        fecha,
      });
    } else if (
      idModal === "nuevoRegistroCuentas" &&
      tipoTransaccion === "egreso"
    ) {
      guardarRegistroEgreso({
        nombre,
        cantidad,
        tipoTransaccion,
        categoriaCuentasEgresos,
        id,
        fecha,
      });
    }

    setNombre("");
    setCantidad(0);
    setCategoriaPresupuesto("");
    setTipoTransaccion("");
    setCategoriaCuentasIngresos("");
    setCategoriaCuentasEgresos("");
  };

  useEffect(() => {
    if (editarGasto && Object.keys(editarGasto).length > 0) {
      setNombre(editarGasto.nombre);
      setCantidad(editarGasto.cantidad);
      setCategoriaPresupuesto(editarGasto.categoriaPresupuesto);
      setId(editarGasto.id);
      setFecha(editarGasto.fecha);
    } else if (editarRegistro && Object.keys(editarRegistro).length > 0) {
      setNombre(editarRegistro.nombre);
      setCantidad(editarRegistro.cantidad);
      setTipoTransaccion(editarRegistro.tipoTransaccion);
      setCategoriaCuentasIngresos(editarRegistro.categoriaCuentasIngresos);
      setCategoriaCuentasEgresos(editarRegistro.categoriaCuentasEgresos);
      setId(editarRegistro.id);
      setFecha(editarRegistro.fecha);
    } else {
      setNombre("");
      setCantidad(0);
      setCategoriaPresupuesto("");
      setTipoTransaccion("");
      setCategoriaCuentasIngresos("");
      setCategoriaCuentasEgresos("");
      setId("");
      setFecha("");
    }
  }, [editarGasto, editarRegistro]);

  return (
    <div
      className="modal fade modal-lg"
      id={idModal}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title" id="exampleModalLabel">
              {(editarGasto && Object.keys(editarGasto).length > 0) ||
              (editarRegistro && Object.keys(editarRegistro).length > 0)
                ? infoModal.editarTitulo
                : infoModal.titulo}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleLimpiarModal}
            ></button>
          </div>
          <div className="modal-body form-container">
            <form className="formulario" onSubmit={handleFormSubmit}>
              <div className="campo">
                <label htmlFor="nombre">{infoModal.nombre}</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Añade el nombre del gasto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="campo">
                <label htmlFor="cantidad">{infoModal.cantidad}</label>
                <input
                  id="cantidad"
                  type="number"
                  placeholder="Añade la cantidad del gasto"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  required
                />
              </div>
              {infoModal.vista === "presupuesto" && (
                <div className="campo">
                  <label htmlFor="categoria">{infoModal.categoria}</label>
                  <select
                    id="categoria"
                    value={categoriaPresupuesto}
                    onChange={(e) => setCategoriaPresupuesto(e.target.value)}
                    required
                  >
                    <option value="">-- Selencione --</option>
                    <option value="Vivienda">Vivienda</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Alimentacion">Alimentacion</option>
                    <option value="Educacion">Educacion</option>
                    <option value="Salud">Salud</option>
                    <option value="CuidadoPersonal">Cuidado personal</option>
                    <option value="Ahorros">Ahorros</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
              )}
              {infoModal.vista === "cuentas" && (
                <>
                  <div className="campo">
                    <label htmlFor="tipo">{infoModal.tipo}</label>
                    <select
                      id="tipo"
                      value={tipoTransaccion}
                      onChange={(e) => setTipoTransaccion(e.target.value)}
                      required
                    >
                      <option value="">-- Selencione --</option>
                      <option value="ingreso">Ingreso</option>
                      <option value="egreso">Egreso</option>
                    </select>
                  </div>
                  {(tipoTransaccion === "ingreso" && (
                    <div className="campo">
                      <label htmlFor="categoria">{infoModal.categoria}</label>
                      <select
                        id="categoria"
                        value={categoriaCuentasIngresos}
                        onChange={(e) =>
                          setCategoriaCuentasIngresos(e.target.value)
                        }
                        required
                      >
                        <option value="">-- Selencione --</option>
                        <option value="Salario">Salario</option>
                        <option value="Bonos">Bonos</option>
                        <option value="Beneficios gubernamentales">
                          Beneficios gubernamentales
                        </option>
                        <option value="Jubilacion">Jubilacion</option>
                        <option value="Inversiones">Inversiones</option>
                        <option value="Negocios">Negocios</option>
                        <option value="Proyectos individuales">
                          Proyectos individuales
                        </option>
                        <option value="Otros">Otros</option>
                      </select>
                    </div>
                  )) ||
                    (tipoTransaccion === "egreso" && (
                      <div className="campo">
                        <label htmlFor="categoria">{infoModal.categoria}</label>
                        <select
                          id="categoria"
                          value={categoriaCuentasEgresos}
                          onChange={(e) =>
                            setCategoriaCuentasEgresos(e.target.value)
                          }
                          required
                        >
                          <option value="">-- Selencione --</option>
                          <option value="Vivienda">Vivienda</option>
                          <option value="Transporte">Transporte</option>
                          <option value="Alimentacion">Alimentacion</option>
                          <option value="Salud">Salud</option>
                          <option value="Educacion">Educacion</option>
                          <option value="Servicios">servicios</option>
                          <option value="Ahorros">Ahorros</option>
                          <option value="Cuidado-personal">
                            Cuidado personal
                          </option>
                          <option value="Ocio">Ocio</option>
                          <option value="Otros">Otros</option>
                        </select>
                      </div>
                    ))}
                </>
              )}
              <input
                type="submit"
                value={
                  (editarGasto && Object.keys(editarGasto).length > 0) ||
                  (editarRegistro && Object.keys(editarRegistro).length > 0)
                    ? infoModal.editarTitulo
                    : infoModal.titulo
                }
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
