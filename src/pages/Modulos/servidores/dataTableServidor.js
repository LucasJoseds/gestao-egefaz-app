import React from "react";


export default props=>{

    const rows = props.servidores.map(servidor => {

        return (
            <tr>
                <td>{servidor.nome}</td>
                <td>{servidor.cargo}</td>
                <td>{servidor.matricula}</td>
                <td>{servidor.ativo}</td>
                <td>
                    <button type="button" title="Editar"
                    className="btn btn-warning"
                    onClick={e=> props.editAction(servidor.id)}>
                    <i className="pi pi-pencil"></i>
                    </button>


                    <button type="button" title="Ativar"
                    className="btn btn-success"
                    onClick={e=>props.enableAction(servidor)}>
                      <i className="pi pi-power-off"></i>
                      </button>

                    <button type="button" title="Desativar" 
                    className="btn btn-danger"
                    onClick={e=>props.disableAction(servidor)}>
                        <i className="pi pi-times"></i>
                    </button>

                </td>

            </tr>
        )

    })
    return (

        <table className="table table-hover">

            <thead>


                <tr>

                    <th scope="col">Nome</th>
                    <th scope="col">Cargo</th>
                    <th scope="col">Matricula</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}

            </tbody>

        </table>
    )
}