const api = "/contatos";
const form = document.getElementById("formContato");
const lista = document.getElementById("lista");
let idEditando = null;

// ========================
// CADASTRAR
// ========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value;

    const telefone = document.getElementById("telefone").value;

    const dados = {nome,telefone};

    try {
        if (idEditando) {
            // EDITAR
            await fetch(`${api}/${idEditando}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });
            idEditando = null;
        } else {
            // CADASTRAR
            await fetch(api, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });
        }

        form.reset();
        listarContatos();
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
});


// LISTAR (CORRIGIDO)
// ========================
async function listarContatos() {
    try {
        const resposta = await fetch(api);
        const contatos = await resposta.json();

        lista.innerHTML = "";

        contatos.forEach((contato) => {
            const li = document.createElement("li");
            
            // Define o texto do contato com segurança
            li.textContent = `${contato.nome} - ${contato.telefone} `;

            // Cria o botão de Editar com segurança total de aspas e escopo
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.style.marginLeft = "10px";
            btnEditar.addEventListener("click", () => {
                editarContato(contato.id, contato.nome, contato.telefone);
            });

            // Cria o botão de Excluir
            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "Excluir";
            btnExcluir.style.marginLeft = "5px";
            btnExcluir.addEventListener("click", () => {
                excluirContato(contato.id);
            });

            // Junta tudo dentro da linha da lista
            li.appendChild(btnEditar);
            li.appendChild(btnExcluir);
            lista.appendChild(li);
        });
    } catch (erro) {
        console.error("Erro ao listar contatos do banco:", erro);
    }
}

// ========================
// EXCLUIR
// ========================
async function excluirContato(id) {
    try {
        await fetch(`${api}/${id}`, { method: "DELETE" });
        listarContatos();
    } catch (erro) {
        console.error("Erro ao excluir:", erro);
    }
}

// ========================
// EDITAR
// ========================
function editarContato(id, nome, telefone) {
    document.getElementById("nome").value = nome;
    document.getElementById("telefone").value = telefone;
    idEditando = id;
}

// Executa ao carregar a página
listarContatos();






    