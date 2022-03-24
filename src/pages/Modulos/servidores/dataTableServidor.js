import React from "react";


export default props=>{

    const rows = props.servidores.map(servidor => {

        return (
            <tr>
                <td>{servidor.nome}</td>
                <td>{servidor.cargo}</td>
                <td>{servidor.matricula}</td>
                <td>{servidor.cpf}</td>
                <td>
                    <button type="button" 
                    className="btn btn-primary"
                    onClick={e=> props.editAction(servidor.id)}>
                    Editar</button>


                    <button type="button" 
                    className="btn btn-primary"
                    onClick={e=>props.disableAction(servidor)}>
                        Desativar</button>
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
                    <th scope="col">CPF</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}

            </tbody>

        </table>
    )
}