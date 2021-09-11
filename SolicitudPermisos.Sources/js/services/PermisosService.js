import request from "../modules/request";


class PermisosService{

    ObtenerListaDeRegistrosDePermisos(){
        return request(`https://colegiocampoverde.edu.mx/net/api/SolicitudPermisosApi/api/Permisos/Get`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json charset utf-8'
            }
        }).then(result=>result.json());
    }

    ObtenerRegistroDePermisos(id){
        return request(`https://colegiocampoverde.edu.mx/net/api/SolicitudPermisosApi/api/Permisos/Search?id=${id}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json charset utf-8'
            }
        }).then(result=>result.json());
    }

    InsertarNuevoRegistro(nombre, apellidos, tipo, fecha){
        return request(`https://colegiocampoverde.edu.mx/net/api/SolicitudPermisosApi/api/Permisos/Insert?nombre=${nombre}&apellidos=${apellidos}&tipo=${tipo}&fecha=${fecha}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json charset utf-8'
            }
        });
    }

    ActualizarRegistro(id, nombre, apellidos, tipo, fecha){
        return request(`https://colegiocampoverde.edu.mx/net/api/SolicitudPermisosApi/api/Permisos/Edit?id=${id}&nombre=${nombre}&apellidos=${apellidos}&tipo=${tipo}&fecha=${fecha}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json charset utf-8'
            }
        });
    }

    EliminarRegistro(id){
        return request(`https://colegiocampoverde.edu.mx/net/api/SolicitudPermisosApi/api/Permisos/Delete?id=${id}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json charset utf-8'
            }
        });
    }
    
}

export default PermisosService;