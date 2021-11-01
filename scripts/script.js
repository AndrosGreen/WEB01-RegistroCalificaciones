var listaMaterias = [];
var materia = "";
var idAct = 0;
var listaCalificaciones = [];

window.onload = function () {
    cargarElementos();
};

function cargarElementos (){
    listaMaterias = localStorage.getItem('listaMaterias');
    idAct = localStorage.getItem('idCalf');
    listaCalificaciones = localStorage.getItem('listaCalificaciones');

    if(listaMaterias){
        listaMaterias = JSON.parse(listaMaterias);
        listaMaterias.forEach(materia => {
            addMateriaSelect(materia)
        });
    }
    else {
        listaMaterias = [];
    }
    if(!idAct){
        idAct = 0;
    }

    cargarCalificaciones();

}

function cargarCalificaciones (){
    if(listaCalificaciones){
        listaCalificaciones = JSON.parse(listaCalificaciones);
        listaCalificaciones.forEach(id => {
            calificacion = JSON.parse( localStorage.getItem(id) );
            console.log(calificacion);
            addCalificacionTable(calificacion);
        });
    }
    else {
        listaCalificaciones = [];
    }
}

function addMateriaSelect (materia){

    var nuevoOption = document.createElement('option');
    nuevoOption.value = materia;
    nuevoOption.innerText = materia;

    var cboMateria = document.getElementById('cboMateria');
    cboMateria.append(nuevoOption);
}

function addMateria(){
    var txtMateria = document.getElementById('txtMateria').value;

    var val = new Validador();

    var testMateria = val.validarMateria(txtMateria);

    if(testMateria[0]){
        addMateriaSelect(txtMateria);
        // add to local storage
        listaMaterias.push(txtMateria);
        localStorage.setItem('listaMaterias',JSON.stringify(listaMaterias));
        txtMateria.innerText = "";
    }

    var txtMateriaError = document.getElementById('errorMateria');
    txtMateriaError.innerText = testMateria[1];
}

function handleChangeMateria(event){
    materia = event.target.value;
}

function obtenerDatosCalificaciones (){
    var txtUnidad = parseInt( document.getElementById('txtUnidad').value );
    var txtCalificacion = parseInt( document.getElementById('txtCalificacion').value );

    calificacion = {
        id : idAct,
        materia : materia,
        unidad : txtUnidad,
        calificacion : txtCalificacion
    }

    var esPosible = true;
    var val = new Validador();

    var testUnidad = val.validarUnidad(calificacion.unidad);
    var testCalificacion = val.validarCalificacion(calificacion.calificacion);

    if(!testUnidad[0]) esPosible = false;
    if(!testCalificacion[0]) esPosible = false;

    if(materia === ""){
        document.getElementById('errorSelMateria').innerText = "debe seleccionar una materia";
        esPosible = false;
    }
    else {
        document.getElementById('errorSelMateria').innerText = "";
    }

    document.getElementById('errorUnidad').innerText = testUnidad[1];
    document.getElementById('errorCalificacion').innerText = testCalificacion[1];

    if(esPosible){

        // add to local
        localStorage.setItem(idAct,JSON.stringify(calificacion));
        listaCalificaciones.push(idAct);
        
        document.getElementById('txtUnidad').value = 0;
        document.getElementById('txtCalificacion').value = 0;

        idAct++;

        localStorage.setItem('idCalf',JSON.stringify(idAct));
        localStorage.setItem('listaCalificaciones',JSON.stringify(listaCalificaciones));

        addCalificacionTable(calificacion);

    }

}

function addCalificacionTable ( calificacion ){
    var tr = document.createElement('tr');
    var tdMateria = document.createElement('td');
    var tdUnidad = document.createElement('td');
    var tdCalificacion = document.createElement('td');
    var boton = document.createElement('button');

    tdMateria.innerText = calificacion.materia;
    tdUnidad.innerText = calificacion.calificacion;
    tdCalificacion.innerText = calificacion.calificacion
    boton.innerText = "Eliminar";
    boton.className = "btn btn-danger";
    boton.setAttribute("onClick", `eliminar(${calificacion.id})`);

    tr.append(tdMateria);
    tr.append(tdUnidad);
    tr.append(tdCalificacion);
    tr.append(boton);

    document.getElementById("tablaCalificaiones").append(tr);

}

function eliminar(id){
    listaCalificaciones = arrayRemove(listaCalificaciones,id);
    localStorage.removeItem(id);
    localStorage.setItem("listaCalificaciones",JSON.stringify(listaCalificaciones));
    limpiarTabla();
    cargarCalificaciones();
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function limpiarTabla() {
    var table = document.getElementById("tablaCalificaiones");
    location.reload();
    var rowCount = table.rows.length;
    for (var i = 1; i < rowCount; i++) {
        table.deleteRow(i);
    }
}