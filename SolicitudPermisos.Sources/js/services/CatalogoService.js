import request from "../modules/request";


class CatalogoService{
    ObtenerCatalogoTipoDePermisos(){
        return request(`https://colegiocampoverde.edu.mx/net/api/SolicitudPermisosApi/api/Catalogo/Get`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json charset utf-8'
            }
        }).then(result=>result.json());
    }    
}

export default CatalogoService;