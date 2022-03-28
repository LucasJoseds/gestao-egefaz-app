import ApiService from "../apiservice";

class ServidorService extends ApiService {

    constructor() {
        super('/api/servidores/')
    }
    cadastrar(credenciais) {

        return this.post('cadastrar', credenciais)
    }
    servidoresId(id) {

        return this.get(`${id}`)
    }

    desativar(id,situ){

        return this.put(`disable/${id}`,{ situ })
    }

    solicitarFolga(id,servidor){
        return this.post(`solicitar/${id}`,servidor)
    }

     consultar(servidorFiltro){
        let params = `?nome=${servidorFiltro.nome}`

        if(servidorFiltro.matricula){
            params= `${params}&matricula=${servidorFiltro.matricula}`
        }

        return this.get(params);

     }     
     
     deletar(id){

        return this.delete(`/${id}`)
     }

     listar(servidores){

         return this.get('lista',servidores)
     }
 }

export default ServidorService