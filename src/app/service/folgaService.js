
import ApiService from "../apiservice";

class FolgaService  extends ApiService{

    constructor(){
        super('/api/folgas/')
    }

    cadastrarFolga(fol){
        return this.post('cadastrar', fol)
    }



    obterPorId(id){

        return this.get(`${id}`);
    }

    desativar(id){

        return this.put(`${id}`)
    }

    

    consulta(filtrarFolga){

        let params = `?descricao=${filtrarFolga.descricao}`

        if(filtrarFolga.servidor){
            params= `${params}&servidor=${filtrarFolga.servidor}`
        }


        return this.get(params);
        
    }

    deletar(id){

        return this.delete(`${id}`)
     }
}
export default FolgaService