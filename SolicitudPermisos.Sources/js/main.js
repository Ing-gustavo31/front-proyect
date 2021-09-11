import "babel-polyfill";
import flatpickr from "flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es"

import CatalogoService from "./services/CatalogoService";
import PermisosService from "./services/PermisosService";

const catalogoService = new CatalogoService();
const permisosService = new PermisosService();

const selectTipo = document.getElementById("select-tipo");
const inputFecha = document.getElementById("input-fecha");
const buttonNuevo = document.getElementById("button-nuevo");
const formActualizar = document.getElementById("form-actualizar");
const bodyTablaRegistros = document.getElementById("body-tabla-registros");


document.addEventListener('DOMContentLoaded', ()=>{
    ObtenerRegistrosDePermisos();

    flatpickr(inputFecha, {
        dateFormat: "d/m/Y",
		maxDate: "today",
		defaultDate:"today",
        locale:Spanish,
    });


    buttonNuevo.addEventListener("click", limpiarElementos);

    formActualizar.addEventListener("submit", ActualizarRegistro);
    

});

async function ActualizarRegistro(e){
    e.preventDefault();
    let id = document.getElementById("button-actualizar").value;
    let nombre = document.getElementById("input-nombre").value;
    let apellidos = document.getElementById("input-apellidos").value;
    let tipo = document.getElementById("select-tipo").value;
    let fecha = document.getElementById("input-fecha").value;

    if(id > 0){
            await permisosService.ActualizarRegistro(id, nombre, apellidos, tipo, fecha);
    }else{
        await permisosService.InsertarNuevoRegistro(nombre, apellidos, tipo, fecha);
    }

    window.location.reload();
}

function limpiarElementos(){
    document.getElementById("modal-title").innerText = `Registro de nuevo permiso`;

    document.getElementById("input-nombre").value = "";
    document.getElementById("input-apellidos").value = "";

    ObtenerCatalogoDeTipos(0);
}


async function ObtenerRegistrosDePermisos(){
    let result = await permisosService.ObtenerListaDeRegistrosDePermisos();

    if(result.length > 0){
        bodyTablaRegistros.innerHTML = "";

        result.forEach(permiso => {
            bodyTablaRegistros.innerHTML += `
                <tr>
                    <td class="text-center">${permiso.id}</td>
                    <td class="text-center">${permiso.nombre}</td>
                    <td class="text-center">${permiso.apellidos}</td>
                    <td class="text-center">${permiso.tipo}</td>
                    <td class="text-center">${new Date(permiso.fecha).toLocaleDateString("es-Es")}</td>
                    <td>
                        <div class="row">
                            <div class="col-6 text-center">
                                <button class="btn btn-primary button-editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" value="${permiso.id}">Editar</button>
                            </div>
                            <div class="col-6 text-center">
                                <button class="btn btn-danger button-eliminar" value="${permiso.id}">Borrar</button>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
        });

        const buttonEliminar = document.querySelectorAll(".button-eliminar");
        const buttonEditar = document.querySelectorAll(".button-editar");
        
        buttonEditar.forEach(button => {
            button.addEventListener("click", ObtenerRegistro);
        });

        buttonEliminar.forEach(button => {
            button.addEventListener("click", EliminarRegistro);
        });
    }
    
    
}

async function ObtenerCatalogoDeTipos(id = 0){
   let catalogo =  await catalogoService.ObtenerCatalogoTipoDePermisos();
   
    catalogo.forEach(tipo => {
        let option = document.createElement("option");
        option.value = tipo.id;
        option.text = tipo.descripcion;

        if(id > 0){
            option.selected = true;
        }
        selectTipo.add(option);
    });
}


async function ObtenerRegistro(e){
    let id = e.target.value;
    document.getElementById("button-actualizar").value = id;
    document.getElementById("modal-title").innerText = `Actualizar Registro ${id}`;
    let registro = await permisosService.ObtenerRegistroDePermisos(id);

    document.getElementById("input-nombre").value = registro.nombre;
    document.getElementById("input-apellidos").value = registro.apellidos;
    document.getElementById("input-fecha").value = registro.fecha;

    ObtenerCatalogoDeTipos(registro.tipo);
}


function EliminarRegistro(e){
    let id = e.target.value;

    swal({
        title: "¿Estás seguro/a de eliminar este registro?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText : "Cancelar",
        confirmButtonText : "Si, eliminar",
        closeOnConfirm : false
    }, async function(){
        await permisosService.EliminarRegistro(id);
        window.location.reload();
    });
    
}
