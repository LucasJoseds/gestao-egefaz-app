import React from 'react'
import ServidorService from '../../../app/service/servidorService';
import { errorMessage, succesMessage } from '../../../components/toastr';
import { withRouter } from 'react-router-dom'
import DataTableServidor from './dataTableServidor';
import FormGroup from '../../../components/form-group';

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

import "../modulos.css"


 class ConsultarServidor extends React.Component {


    state = {
        nome: '',
        matricula: '',
        mensagem:false,
        servidores: [],
        situ:''
    }

    constructor() {

        super();
        this.service = new ServidorService();
    }

    buscar = () => {

        const servidorFiltro = {
            nome: this.state.nome,
            matricula: this.state.matricula
        }

        this.service
            .consultar(servidorFiltro)
            .then(response => {
                this.setState({ servidores: response.data })
            }).catch(error => {
                console.log(error)
            })

    }

    desativarServidor=(servidor,situacao)=>{

        this.service.desativar(servidor.id, situacao)
        .then(response =>{
            const servidores = this.state.servidores;
            const index = servidores.indexOf(servidor);
            if(index!==-1){

                servidor['situ'] = situacao;
                servidores[index]= servidor;
                this.setState({servidor})
            }
            succesMessage('Servidor desativado com sucesso')
        })

    }

    
    showMessage = (servidores) => {
        this.setState({ mensagem: true, ativarServidor: servidores })

    }
    
    deletar = () => {

        this.service.deletar(this.state.deletarFolga.id)
            .then(response => {
                const folgas = this.state.folgas
                const index = folgas.indexOf(this.state.deletarFolga)
                folgas.splice(index, 1);
                this.setState(folgas)

                succesMessage('Folga deletada com sucesso')
                this.cancelarDeletar();
            }).catch(error => {
                errorMessage('Erro ao deletar folga')
            })

    }
    
    ativarServidor=(servidor,situ)=>{

        this.service.desativar(this.state.ativarServidor.id, situ)
        .then(response =>{
            const servidores = this.state.servidores;
            const index = servidores.indexOf(servidor);
            if(index!==-1){

                servidor['situ'] = situ;
                servidores[index]= servidor;
                this.setState({servidor})
            }
            succesMessage('Servidor ativado com sucesso')
            this.cancelarDeletar();
        })

    }

    cancelarDeletar =()=>{

        this.setState({ mensagem: false, ativarServidor: {} })
    }







    deletar = (servidor) => {

        this.service.deletar(servidor.id)
            .then(response => {
                const servidores = this.state.servidores;
                const index = servidores.indexOf(servidor)
                servidores.splice(index, 1);
                this.setState(servidores)

                succesMessage('Servidor deletado com sucesso')
            }).catch(error => {
                errorMessage('Erro ao deletar servidor')
            })

    }

    editar = (id) => {

        this.props.history.push(`/cadastrar-servidores/${id}`)
    }

    render() {

        const confirmar = (

            <div>

                <Button label = "Confirmar" icon="pi pi-check" onClick={this.ativarServidor}/>

                <Button label ="Cancelar" icon="pi pi-times" onClick={this.cancelarDeletar} 
                className="p-button-secondary" />
                
            </div>
            );

        return (

            <div className="container-fluid" style={{ marginBottom: '10%' }}>
                <div classname="row">
                    <div id="contentTitulo" >
                        <h3 >Consultar Servidor</h3>
                    </div>

                    <div className="col-lg-12">
                        <div classname="bs-component" id="contentUM">


                            <FormGroup htmlFor="inputNome"
                                label="Nome:">
                                <input type="text"
                                    class="form-control"
                                    id="inputNome"
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    placeholder="Buscar por nome" />

                            </FormGroup >

                            <FormGroup htmlFor="inputCargo"
                                label="Mátricula:">
                                <input type="text"
                                    class="form-control"
                                    id="inputCargo"
                                    value={this.state.matricula}
                                    onChange={e => this.setState({ matricula: e.target.value })}
                                    placeholder="Buscar por mátricula" />
                            </FormGroup >

                            <button onClick={this.buscar} ttype="button" className="btn btn-success" >Buscar</button>

                        </div>
                    </div>
                </div>



                <div className="col-lg-12">
                    <div classname="bs-component" id="contentUM">


                        <div classname="row">
                            <div className="col-lg-20">

                                <DataTableServidor
                                    servidores={this.state.servidores}
                                    editAction={this.editar}
                                    enableAction={this.ativarServidor}
                                    disableAction={this.desativarServidor}/>

                            </div>
                        </div>


                        <a className="btn btn-danger" href="#/home" role="button">Voltar</a>

                    </div>

                </div>
            </div>

        )
    }


}

export default withRouter(ConsultarServidor)

