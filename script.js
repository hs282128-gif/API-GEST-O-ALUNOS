const supabaseConfig = {
    url: 'https://SUA URL',
    headers: {
        'apikey': 'sua apkey',
        'Authorization': 'Bearer ',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation' 
    }
};
async function listarAlunos() {
    try {
        const response = await fetch(`${supabaseConfig.url}?select=*`, {
            method: 'GET',
            headers: supabaseConfig.headers
        });
        if (!response.ok) throw new Error('Erro ao listar');
        const dados = await response.json();
        console.log("Lista de Alunos:", dados);
        return dados;
    } catch (err) {
        console.error("Falha na listagem:", err);
    }
}
async function criarAluno(nome, email) {
    try {
        const response = await fetch(supabaseConfig.url, {
            method: 'POST',
            headers: supabaseConfig.headers,
            body: JSON.stringify({ nome, email }) 
        });
        const dados = await response.json();
        console.log("Aluno Criado:", dados);
        return dados;
    } catch (err) {
        console.error("Erro no cadastro:", err);
    }
}
async function atualizarEmailAluno(id, novoEmail) {
    try {
        const urlFiltro = `${supabaseConfig.url}?id=eq.${id}`;
        const response = await fetch(urlFiltro, {
            method: 'PATCH',
            headers: supabaseConfig.headers,
            body: JSON.stringify({ email: novoEmail })
        });
        const dados = await response.json();
        console.log("Aluno Atualizado:", dados);
        return dados;
    } catch (err) {
        console.error("Erro na atualização:", err);
    }
}
async function deletarAluno(id) {
    try {
        const urlFiltro = `${supabaseConfig.url}?id=eq.${id}`;
        const response = await fetch(urlFiltro, {
            method: 'DELETE',
            headers: supabaseConfig.headers
        });
        const dados = await response.json();
        console.log("Aluno Deletado:", dados);
        return dados;
    } catch (err) {
        console.error("Erro na exclusão:", err);
    }
}
async function procurar(valor) {
    let urlBusca;
    if (!isNaN(valor)) {
        urlBusca = `${supabaseConfig.url}?id=eq.${valor}&select=*`;
    } else {
        urlBusca = `${supabaseConfig.url}?nome=ilike.*${valor}*&select=*`;
    }
    try {
        const response = await fetch(urlBusca, {
            method: 'GET',
            headers: supabaseConfig.headers
        });
        const resultados = await response.json();
        console.log("Resultados da busca:", resultados);
        return resultados;
    } catch (err) {
        console.error("Erro na busca flexível:", err);
    }
}
async function alterarNomeAluno(id, novoNome) {
    try {
        const response = await fetch(`${supabaseConfig.url}?id=eq.${id}`, {
            method: 'PATCH',
            headers: supabaseConfig.headers,
            body: JSON.stringify({ nome: novoNome })
        });

        if (!response.ok) throw new Error('Erro ao atualizar');
        const dados = await response.json();
        console.log(" Nome alterado:", dados[0]);
        return dados[0];

    } catch (err) {
        console.error(" Falha:", err.message);
    }
}
criarAluno("Prof. Ricardo Montes", "ricardo.montes@escola.edu")
criarAluno("Dr. Helena Vasconcelos", "helena.v@hospital.com.br")
criarAluno("Eng. Carlos Eduardo", "cadu.eng@construtora.com")
criarAluno("Ana Beatriz Cavalcanti", "ana.be@gmail.com")
criarAluno("Luís Felipe de Orléans", "luis.felipe@yahoo.com.br")
criarAluno("Maria das Graças Silva", "gracas.maria@outlook.com")