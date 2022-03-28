import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { succesMessage } from "../../../components/toastr";
import { errorMessage } from "../../../components/toastr";
import { InputMask } from 'primereact/inputmask';

import FormGroup from "../../../components/form-group";
import ServidorService from "../../../app/service/servidorService";
import "../modulos.css"
import SelectMenu from '../../../components/selectMenu';
import "./cservidores.css"


class CadastrarServidor extends React.Component {

    state = {

        nome: '',
        cargo: '',
        lotacao: '',
        matricula: '',
        cpf: '',
        identidade: '',
        orgao: '',
        sexo: '',
        endereco: {
            cep: '',
            bairro: '',
            en: '',
            uf: ''
        },
        civil: '',
        dataNascimento: '',
        conjuge: '',
        senha: '',
        naturalidade: '',
        nacionalidade: '',
        cidade:'',
        email: '',
        telefone: '',
        cargoComissao: ''

    }

    constructor() {

        super();
        this.service = new ServidorService();

    }

    componentDidMount() {
        const params = this.props.match.params

        if (params.id) {
            this.service.servidoresId(params.id)
                .then(response => {
                    this.setState({ ...response.data })
                }).catch(error => {
                    errorMessage(error.response.data)
                })
        }

    }

    validar = () => {

        const msg = []


        if (!this.state.nome) {

            msg.push('O nome deve ser informado')
        }

        if (!this.state.cpf) {

            msg.push('O cpf deve ser informado')

        }

        if (!this.state.matricula) {

            msg.push('A matricula deve ser informada')

        }

        if (!this.state.sexo) {

            msg.push('O sexo deve ser informado')

        }


        return msg;
    }






    cadastrar = () => {

        const msgs = this.validar();
        if (msgs && msgs.length > 0) {
            msgs.forEach((msgs, index) => {
                errorMessage(msgs)

            });
            return false

        }

        const servidor = {
            nome: this.state.nome,
            cargo: this.state.cargo,
            lotacao: this.state.lotacao,
            orgao: this.state.orgao,
            matricula: this.state.matricula,
            cpf: this.state.cpf,
            identidade: this.state.identidade,
            email: this.state.email,
            nacionalidade: this.state.nacionalidade,
            naturalidade: this.state.naturalidade,
            dataNascimento: this.state.dataNascimento,
            en: this.state.en,
            cep: this.state.cep,
            bairro: this.state.bairro,
            com: this.state.com,
            uf: this.state.uf,
            sexo: this.state.sexo,
            civil: this.state.civil,
            telefone: this.state.telefone,
            cargoComissao: this.state.cargoComissao

        }



        this.service.cadastrar(servidor)
            .then(response => {
                succesMessage('Cadastro realizado!')
                this.setState({
                    nome: '',
                    cargo: '',
                    lotacao: '',
                    matricula: '',
                    cpf: '',
                    identidade: '',
                    orgao: '',
                    sexo: '',
                    endereco: '',
                    civil: '',
                    dataNascimento: '',
                    en: '',
                    cep: '',
                    bairro: '',
                    com: '',
                    uf: '',
                    conjuge: '',
                    senha: '',
                    naturalidade: '',
                    nacionalidade: '',
                    cidade:'',
                    email: '',
                    telefone: ''
                })
            }).catch(
                response => { errorMessage('Erro ao relizar o cadastro') }
            )

    }

    render() {


        const uf = [
            { label: "", value: "" },
            { label: "AC", value: "AC" },
            { label: "AL", value: "AL" },
            { label: "AP", value: "AP" },
            { label: "AM", value: "AM" },
            { label: "BA", value: "BA" },
            { label: "CE", value: "CE" },
            { label: "DF", value: "DF" },
            { label: "ES", value: "ES" },
            { label: "GO", value: "GO" },
            { label: "MA", value: "MA" },
            { label: "MT", value: "MT" },
            { label: "MS", value: "MS" },
            { label: "MG", value: "MG" },
            { label: "PA", value: "PA" },
            { label: "PB", value: "PB" },
            { label: "PR", value: "PR" },
            { label: "PE", value: "PE" },
            { label: "PI", value: "PI" },
            { label: "RJ", value: "RJ" },
            { label: "RN", value: "RN" },
            { label: "RS", value: "RS" },
            { label: "RR", value: "RR" },
            { label: "RO", value: "RO" },
            { label: "SC", value: "SC" },
            { label: "SP", value: "SP" },
            { label: "SE", value: "SE" },
            { label: "TO", value: "TO" }
        ]

        const sexo = [
            { label: "Selecione", value: "" },
            { label: "Masculino", value: "MASCULINO" },
            { label: "Feminino", value: "FEMININO" },
            { label: "Outros", value: "OUTROS" }
        ]
        const lotacao = [
            { label: "Selecione", value: "" },
            { label: "Diretoria da  Escola Fazendária", value: "Diretoria da  Escola Fazendária" },
            { label: "Gerência de Administração e Logística", value: "Gerência de Administração e Logística" },
            { label: "Gerência de Programação, Capacitação e Educação", value: "Gerência de Programação, Capacitação e educação" }
        ]
        const estadoCivil = [
            { label: "Selecione", value: "" },
            { label: "Solteiro(a)", value: "Solteiro(a)" },
            { label: "Casado(a)", value: "Casado(a)" },
            { label: "Viuvo(a)", value: "Viuvo(a)" },
            { label: "Separado(a)", value: "Separado(a)" }
        ]
        return (
            <div className="container-fluid" style={{ marginBottom: '10%' }}>


                <div classname="row">
                    <div style={{ background: '#1B1936', color: '#f0f0f0', marginTop: '10vh', border: ' 1px solid #f0f0f0', borderRadius: '5px', padding: '10px', boxShadow: '5px 5px 5px #fdca3f' }} >
                        <h3 >Cadastrar Servidor</h3>
                    </div>

                    <div className="  col-lg-12">
                        <div classname="bs-component contentServidor" style={{ padding: '10px', marginTop: '20px', borderRadius: '5px', background: '#f0f0f0' }}>
                            <FormGroup >
                                <div className="row" >
                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputName4">Nome Completo*</label>
                                        <input type="text"
                                            className="form-control"
                                            id="inputText"
                                            placeholder="Nome completo"
                                            value={this.state.nome}
                                            onChange={(e) => this.setState({ nome: e.target.value })} />

                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputEstado">Lotação*</label>
                                        <SelectMenu
                                            className="form-control"
                                            id="inputLotacao"
                                            value={this.state.lotacao}
                                            onChange={(e) => this.setState({ lotacao: e.target.value })}
                                            lista={lotacao} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='la' htmlFor="validationDefault01">Matrícula</label>
                                        <input type="text" className="form-control" id="validationDefault01" placeholder="Matrícula"
                                            value={this.state.matricula}
                                            onChange={(e) => this.setState({ matricula: e.target.value })} aria-describedby="inputGroupPrepend2" required />


                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputPassword4">CPF*</label>
                                        <InputMask type="text" className="form-control" mask='999.999.999-99' placeholder="CPF"
                                            value={this.state.cpf}
                                            onChange={(e) => this.setState({ cpf: e.target.value })} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputPassword4">Cargo*</label>
                                        <input type="text" className="form-control" id="inputText" placeholder="Cargo"
                                            value={this.state.cargo}
                                            onChange={(e) => this.setState({ cargo: e.target.value })} />
                                    </div>

                                    <div className="form-group col-md-3">
                                        <label className='la' for="inputPassword4">RG*</label>
                                        <input type="text" className="form-control" id="inputText" placeholder="RG"
                                            value={this.state.identidade}
                                            onChange={(e) => this.setState({ identidade: e.target.value })} />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label className='la' for="inputPassword4">OE*</label>
                                        <input type="text" className="form-control" placeholder="Orgão exp."
                                            value={this.state.orgao}
                                            onChange={(e) => this.setState({ orgao: e.target.value })} />
                                    </div>
                                    <div className="form-group col-md-1">
                                        <label className='la' for="inputEstado">UF*</label>
                                        <SelectMenu
                                            className="form-control"
                                            id="inputUf"
                                            value={this.state.uf}
                                            onChange={(e) => this.setState({ uf: e.target.value })}
                                            lista={uf} />
                                    </div>
                                    <div className="form-group col-md-6">

                                    
                                            <label className='la' for="inputEstado" style={{marginBottom:"7px"}}>Cargo em Comissão?</label>

                                            <input type='radio' id='mostrar' name='garantia' style={{marginRight:"2px"}} />
                                            <label htmlFor="city2" style={{marginRight:"40px"}}>Sim</label>
                                            <input type='radio' name='garantia'  style={{marginRight:"2px"}} />
                                            <label htmlFor="city2">Não</label>
                                      

                                        <div className="form-group col-md-12" id='mostrarC' >

                                            <label className="la" htmlFor="range" >Descrição do cargo</label>

                                            <input type="text"
                                                style={{width:"204%"}}
                                                className='form-control'
                                                id="inputText"
                                                value={this.state.cargoComissao}
                                                onChange={(e) => this.setState({ cargoComissao: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-3">
                                        <label className='la' for="inputPassword4">Data de Nascimento*</label>
                                        <input type="date" className="form-control" id="inputText" placeholder="Data de Nascimento"
                                            value={this.state.dataNascimento}
                                            onChange={(e) => this.setState({ dataNascimento: e.target.value })} />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label className='la' for="inputPassword4">Estado Civil*</label>
                                        <SelectMenu
                                            className="form-control"
                                            id="inputSexo"
                                            value={this.state.civil}
                                            onChange={(e) => this.setState({ civil: e.target.value })}
                                            lista={estadoCivil} />

                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputPassword4">Cônjuge</label>
                                        <input type="text" className="form-control" id="inputText" placeholder="Cônjuge"
                                            value={this.state.conjuge}
                                            onChange={(e) => this.setState({ conjuge: e.target.value })} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputPassword4">Nacionalidade*</label>
                                        <input type="text" className="form-control" id="inputText" placeholder="Nacionalidade"
                                            value={this.state.nacionalidade}
                                            onChange={(e) => this.setState({ nacionalidade: e.target.value })} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputPassword4">Naturalidade*</label>
                                        <input type="text" className="form-control" id="inputText" placeholder="Naturalidade"
                                            value={this.state.naturalidade}
                                            onChange={(e) => this.setState({ naturalidade: e.target.value })} />
                                    </div>
                                    <div className="form-group col-md-6">

                                        <label className='la'>Sexo*</label>
                                        <SelectMenu
                                            className="form-control"
                                            id="inputSexo"
                                            value={this.state.sexo}
                                            onChange={(e) => this.setState({ sexo: e.target.value })}
                                            lista={sexo} />


                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='la' for="phone">Telefone*</label>
                                        <InputMask type="tel" className="form-control" mask="(99)99999-9999" placeholder='Telefone'
                                            value={this.state.telefone}
                                            onChange={(e) => this.setState({ telefone: e.target.value })} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputEmail">E-mail*</label>
                                        <input type="text" className="form-control" id="inputText" placeholder="E-mail"
                                            value={this.state.email}
                                            onChange={(e) => this.setState({ email: e.target.value })} />
                                    </div>




                                    {/* Formulario de endereço */}
                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputCEP">CEP*</label>
                                        <InputMask type="text" className="form-control" mask='99999-999' id="inputCEP" placeholder='CEP'
                                            value={this.state.cep}
                                            onChange={(e) => this.setState({ cep: e.target.value })} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className='la' for="inputPassword4">Cidade*</label>
                                        <input type="text" className="form-control" id="inputText" placeholder="Informe a cidade"
                                            value={this.state.cidade}
                                            onChange={(e) => this.setState({ cidade: e.target.value })} />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label className='la' for="inputAddress">Endereço*</label>
                                        <input type="text" className="form-control" id="inputAddress"
                                            value={this.state.en}
                                            onChange={(e) => this.setState({ en: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className='la' for="inputAddress2">Complemento</label>
                                        <input type="text" className="form-control" id="inputAddress2"
                                            value={this.state.com}
                                            onChange={(e) => this.setState({ com: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className='la' for="inputAddress2">Bairro</label>
                                        <input type="text" className="form-control" id="inputAddress2"
                                            value={this.state.bairro}
                                            onChange={(e) => this.setState({ bairro: e.target.value })} />
                                    </div>

                                </div>

                                <button onClick={this.cadastrar} type="submit" className="btn btn-secondary">Cadastrar</button>
                                <button type="submit" className="btn btn-danger">Cancelar</button>
                            </FormGroup>


                        </div>
                    </div>
                </div>



            </div >




        )
    }
}

export default withRouter(CadastrarServidor)
