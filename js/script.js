//Capturamos los elementos usando el DOM

const mensajeError = document.getElementById("mensajeError");
const btnAgregar = document.getElementById("btnAgregar");
const inputActividad = document.getElementById("actividadInput");
const listaActividades = document.getElementById("listaActividades");
const mensajeVacio = document.getElementById("mensajeVacio");
document.getElementById("year").textContent=new Date().getFullYear();
const totalActividades = document.getElementById("totalActividades");
const actividadesRealizadas = document.getElementById("actividadesRealizadas");
const actividadesPendientes = document.getElementById("actividadesPendientes");

btnAgregar.addEventListener("click", agregarActividad);

inputActividad.addEventListener("keypress",function(evento){
    if( evento.key === "Enter"){
        agregarActividad();
    }
});



function agregarActividad() {
    const textoActividad = inputActividad.value.trim();

    //Validación del campo vacio
    if(textoActividad === ""){
        mensajeError.textContent = "Por favor escribe una actividad antes de agregarla";
        return;
    }

    //Limpiamos el mensaje de error
    mensajeError.textContent = "";

    //Creamos el elemento li
    const nuevaActividad = document.createElement("li");

    //Creamos un span para el texto de la actividad
    const texto = document.createElement("span");
    texto.textContent = textoActividad;

    //Creamos el contenedor de los botones
    const contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("botones");

    //Botón para marcar como realizada 
    const btnRealizada = document.createElement("button");
    btnRealizada.textContent = "Pendiente";
    btnRealizada.classList.add("btn-realizada");

    //Botón para marcar como eliminada
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");

    //Evento para marcar o desenmarcar como realizada
    btnRealizada.addEventListener("click", function(){
        nuevaActividad.classList.toggle("realizada");

        if(nuevaActividad.classList.contains("realizada")) {
            btnRealizada.textContent = "Realizada";
        } else {
            btnRealizada.textContent = "Pendiente";
        }

            actualizarContadores();
    });

    btnEliminar.addEventListener("click", function(){
        listaActividades.removeChild(nuevaActividad);
        actualizarContadores();
    });

    //Agregamos los botones al contador
    contenedorBotones.appendChild(btnRealizada);
    contenedorBotones.appendChild(btnEliminar);

    //Agregamos el texto a los botones
    nuevaActividad.appendChild(texto);
    nuevaActividad.appendChild(contenedorBotones);

    listaActividades.appendChild(nuevaActividad);

    inputActividad.value = "";
    inputActividad.focus();

    actualizarContadores();
   

}

// Función para actualizare elt total, realizadas y pendientes

function actualizarContadores() {
    const actividades = listaActividades.querySelectorAll("li");
    const realizadas = listaActividades.querySelectorAll(".realizada");

    const total = actividades.length;
    const totalRealizadas = realizadas.length;
    const pendientes = total - totalRealizadas;

    totalActividades.textContent = total;
    actividadesRealizadas.textContent = totalRealizadas;
    actividadesPendientes.textContent = pendientes;

    //Mostrar u ocultar mensaje cuando la lista este vacia 

    if(total === 0) {
        mensajeVacio.style.display = "block";
    } else {
        mensajeVacio.style.display = "none";

    }
}