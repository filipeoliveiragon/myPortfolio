var table = [
    ["Vakinha", "Designer", "", 30, 2022],
    ["Locação de Carros", "Desenvolvedor", "HTML, CSS e JS", 400, 2020],
    ["SGCAE", "Desenvolvedor", "Codeigniter", 960, 2020]
];

const dataAtual = new Date();

function load() {
    var btn_add = document.getElementById("btn-add");
    if (btn_add) {
        btn_add.addEventListener('click', (btn_add) => {
            btn_add.preventDefault();
            addDados();
        });
    }

    var btn_modal = document.getElementById("btn-modal");
    if (btn_modal)
        btn_modal.addEventListener('click', (btn_modal) => {
            btn_modal.preventDefault();
            close();
        });

    var btn_reset = document.getElementById("btn-reset");
    if (btn_reset)
        btn_reset.addEventListener('click', (btn_reset) => {
            btn_reset.preventDefault();
            limpaForm();
        });

    listagem();
}

function addDados() {
    let desc = document.getElementById("desc").value;
    let area = document.getElementById("area").value;
    let linguagem = document.getElementById("linguagem").value;
    let horas = document.getElementById("horas").value;
    let ano = document.getElementById("ano").value;

    let tam = table.length + 1;

    if (validaCampos(desc, area, linguagem, horas, ano)) {
        let dados = [desc, area, linguagem, horas, ano];
        table.push(dados);
        listagem();
        limpaForm();
    }
}

function limpaForm() {
    let desc = document.getElementById("desc");
    desc.value = '';

    let linguagem = document.getElementById("linguagem");
    linguagem.value = '';

    let horas = document.getElementById("horas");
    horas.value = '';

    let ano = document.getElementById("ano");
    ano.value = '';
}

function listagem() {
    let tbody = document.getElementById('tbody');
    let dados = '';

    for (var i = 0; i < table.length; i++) {
        dados += "<tr class='interativo__table__body'>";
        for (var j = 0; j < table[i].length; j++) {
            dados += "<td>" +
                table[i][j] + "</td>";
        }
        dados += "</tr>";
    }
    tbody.innerHTML = dados;
}

function listagem2() {
    let tabela = document.getElementById('tabela');
    let tbody = criaTag("tbody");
    for (let i = 0; i < table.length; i++) {
        let row = criaTag("tr");
        for (let j = 0; j < 5; j++) {
            let cel = criaCel(table[i][j]);
            row.appendChild(cel);
        }
        tbody.appendChild(row);
    }
    tabela.appendChild(tbody);
}

function criaTag(tag) {
    return document.createElement(tag);
}

function criaCel(dados) {
    let td = criaTag("td");
    td = dados;
    return td;
}

function validaCampos(descricao, area, linguagem, horas, ano) {
    let erros = [];
    if (horas < 0) erros.push("Hora inválida.");

    if (ano == '')
        erros.push("Preencha o campo ano.");
    else if (ano < 2011 || ano > dataAtual.getFullYear())
        erros.push("Ano inválido.");

    if (descricao == '')
        erros.push("Preencha o campo descrição.");

    if (area == '')
        erros.push("Preencha o campo area.");

    if (linguagem == '' && area != 'Designer')
        erros.push("Preencha o campo linguagem.");

    if (horas == '')
        erros.push("Preencha o campo horas.");

    if (erros == '') {
        return true;
    } else {
        logErro(erros);
        document.getElementById("modal__erro").style.display = "block";
        return false;
    }
}

function logErro(erros) {
    let ul = document.getElementById("lista__erros");
    let ulErros = criaTag("ul");
    for (let i = 0; i < erros.length; i++) {
        let lista = criaTag("li");
        lista.innerHTML = erros[i];
        ulErros.appendChild(lista);
    }
    ul.appendChild(ulErros);
}

function close() {
    document.getElementById("lista__erros").innerHTML = '';
    document.getElementById("modal__erro").style.display = 'none';
}