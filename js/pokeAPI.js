document.buscar.btn.onclick = function(){
    var busqueda = document.buscar.nombre.value;
    if(busqueda != ""){
        buscar(document.buscar.nombre.value);
    }
    else{
        console.log("Campo vacio");
    }
};

function buscar(pokemon){
    var figura = document.getElementById('figura');
    var numero = document.getElementById('numero');
    var info = document.getElementById('info');
    var stats = document.getElementById('stats');
    var tipo1 = document.getElementById('tipo1');
    var tipo2 = document.getElementById('tipo2');
    var encontrado = document.getElementById('encontrado');

    figura.innerHTML = "<img src='img/cargando.gif'>";
    tipo1.innerHTML = "";
    tipo2.innerHTML = "";
    numero.innerHTML = "";
    info.innerHTML = "";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            respuesta = JSON.parse(this.responseText);
            figura.innerHTML = "<img src='"+respuesta.sprites.front_default+"'>"+
                                "<img src='"+respuesta.sprites.back_default+"'>";
            numero.innerHTML = "<p>no."+respuesta.id+"</p>";
            info.innerHTML = "<p>Nombre: "+respuesta.name+"</p>"+
                            "<p>Peso: "+((respuesta.weight).toString()).slice(0,(respuesta.weight).toString().length-1)+"kg</p>"+
                            "<p>Altura: "+altura(respuesta.height)+"m</p>"+
                            "<p>Exp base: "+respuesta.base_experience+"epx</p>";
            tipo1.innerHTML = "<p>"+respuesta.types[0].type.name+"</p>";

            if(respuesta.types.length > 1){
                tipo2.innerHTML = "<p>"+respuesta.types[1].type.name+"</p>"
            }
            stats.innerHTML = "";
            for(let i=0;i<respuesta.stats.length;i++){
                var p = document.createElement('p');
                p.textContent = respuesta.stats[i].stat.name+": "+respuesta.stats[i].base_stat;
                stats.appendChild(p);
            }
            encontrado.style.display = "block"
            setTimeout(function(){encontrado.style.display = "none"},1000);
        }
    }
    let url = 'https://pokeapi.co/api/v2/';
    let parametro = 'pokemon/'+pokemon+'/'
    request.open('GET',url+parametro,true);
    request.send();
}

mostrarStats.onclick = function(){
    var stats = document.getElementById('stats');
    var info = document.getElementById('info');

    info.style.display = "none";
    stats.style.display = "block";
}
mostrarInfo.onclick = function(){
    var stats = document.getElementById('stats');
    var info = document.getElementById('info');

    info.style.display = "block";
    stats.style.display = "none";
}

function altura(altura){
    let a = (altura).toString();
    if(a.length > 1){
        return a.slice(0,a.length-1);
    }
    else{
        return "0,"+a;
    }
}