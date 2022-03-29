import React from 'react'
import ServidorService from '../../../app/service/servidorService';
import { errorMessage, succesMessage } from '../../../components/toastr';
import { withRouter } from 'react-router-dom'
import DataTableServidor from './dataTableServidor';
import FormGroup from '../../../components/form-group';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog';


import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

import "../modulos.css"


class ConsultarServidor extends React.Component {


    state = {
        nome: '',
        matricula: '',
        mensagem: false,
        desativaServidor: {},
        situacao: {},
        servidores: [],
        situ: ''
    }
    
    
    constructor() {
        
        super();
        this.service = new ServidorService();

        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
        this.confirm1 = this.confirm1.bind(this);
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

    showMessage = (servidores, situ) => {
        this.setState({ mensagem: true, desativaServidor: servidores, situacao: situ })
    }

    desativarServidor = (servidor, situ) => {


        this.service.desativar(servidor.id, situ)
            .then(response => {
                const servidores = this.state.servidores;
                const index = servidores.indexOf(servidor);
                if (index !== -1) {

                    servidor['situ'] = situ;
                    servidores[index] = servidor;
                    this.setState({ servidor })
                }
                succesMessage('Servidor desativado com sucesso')
                this.cancelarDeletar();
            })

    }


    ativarServidor = (servidor, situ) => {

        this.service.desativar(servidor.id, situ)
            .then(response => {
                const servidores = this.state.servidores;
                const index = servidores.indexOf(servidor);
                if (index !== -1) {

                    servidor['situ'] = situ;
                    servidores[index] = servidor;
                    this.setState({ servidor })
                }
                succesMessage('Servidor ativado com sucesso')

            })

    }

    cancelarDeletar = () => {

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

    accept() {

     
    this.desativarServidor = (servidor, situ) => {


        this.service.desativar(servidor.id, situ)
            .then(response => {
                const servidores = this.state.servidores;
                const index = servidores.indexOf(servidor);
                if (index !== -1) {

                    servidor['situ'] = situ;
                    servidores[index] = servidor;
                    this.setState({ servidor })
                }
                succesMessage('Servidor desativado com sucesso')
                this.cancelarDeletar();
            })

    }
    }

    reject() {
        this.toast.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    confirm1() {
        confirmDialog({
            message: 'Deseja realmente desativar este servidor',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: this.desativarServidor,
            reject: this.reject
        });
    }

    editar = (id) => {

        this.props.history.push(`/cadastrar-servidores/${id}`)
    }

    render() {

      


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

                            <Toast ref={(el) => this.toast = el} />

                                <DataTableServidor
                                    servidores={this.state.servidores}
                                    editAction={this.editar}
                                    enableAction={this.ativarServidor}
                                    disableAction={this.confirm1} />

                            </div>
                        </div>
                        <div>

                            {/* <Dialog header="Atenção"
                                visible={this.state.mensagem}
                                style={{ width: '50vw' }}
                                modal={true}
                                footer={confirmar}
                                onHide={() => this.setState({ mensagem: false })}>
                                <p>Deseja realmente desativar este servidor?</p>
                            </Dialog> */}

                           

                           

                        </div>


                        <a className="btn btn-danger" href="#/home" role="button">Voltar</a>

                    </div>

                </div>
            </div>

        )
    }


}

export default withRouter(ConsultarServidor)

