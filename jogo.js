var timeId = null;

function iniciaJogo() {
    var url = window.location.search;
    
    var nivelJogo = url.replace("?", "");

    var tempo = 0;

    if (nivelJogo == 1) {
        tempo = 120;
    }

    if (nivelJogo == 2) {
        tempo = 60;
    }

    if (nivelJogo == 3) {
        tempo = 30;
    }
    
    document.getElementById('cronometro').innerHTML = tempo; //Inseringo contagem de segundos no Span

    var numGoombas = 70; //Quantidade de Goombas

    criarGoomba(numGoombas);

    //Mostrar Goombas Vivos
    document.getElementById('goombasVivos').innerHTML = numGoombas;
    document.getElementById('goombasMortos').innerHTML = 0;

    contagemTempo(tempo + 1)

}

function contagemTempo(tempo) {
    
    if (tempo == 0) {
        
        clearTimeout(timeId); //Para a função settimeout
        fim();
        return false;
    }

    tempo = tempo - 1;
    document.getElementById('cronometro').innerHTML = tempo;
    timeId = setTimeout("contagemTempo("+tempo+")", 1000)
    
}

function fim() {
    alert('Fim de jogo, você falhou')
}



function criarGoomba(numGoombas) {
    for (var i = 1; i <= numGoombas; i++) {

        var goomba = document.createElement("img");
        goomba.src = 'imagens/goomba_pequeno.png';
        goomba.style.margin = '10px';
        goomba.id = 'b' + i;
        goomba.onclick = function(){clicar(this)}

        document.getElementById('cenario').appendChild(goomba);
    }
}

function clicar(c) {
    var goombaId = c.id;

    document.getElementById(goombaId).setAttribute("onclick", "");
    document.getElementById(goombaId).src = 'imagens/goomba_pequeno_x.png'

    pontos(-1);
}

function pontos(clique) {
    var goombasVivos = document.getElementById('goombasVivos').innerHTML;
    var goombasMortos = document.getElementById('goombasMortos').innerHTML;

    goombasVivos = parseInt(goombasVivos);
    goombasMortos = parseInt(goombasMortos);

    goombasVivos = goombasVivos + clique;
    goombasMortos = goombasMortos - clique;

    document.getElementById('goombasVivos').innerHTML = goombasVivos;
    document.getElementById('goombasMortos').innerHTML = goombasMortos;

    situacao(goombasVivos, goombasMortos);
}

function situacao(goombasVivos, goombasMortos) {
    if (goombasVivos == 0) {
        alert('Parabens, você venceu!');
        finalizar();
    }
}

function finalizar() {
    clearTimeout(timeId);
}