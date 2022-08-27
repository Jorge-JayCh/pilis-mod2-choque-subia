
const d = document;
// $table = d.querySelector(".crud-table"),
// $template = d.getElementById("crud-template").content,

const $temperaturaValor = document.getElementById('temperatura-valor');
const $temperaturaMin = document.getElementById('temperatura-min');  
const $temperaturaMax = document.getElementById('temperatura-max');  
const $temperaturaDescripcion = document.getElementById('temperatura-descripcion') ; 
const $ubicacion = document.getElementById('ubicacion');  
const $iconoAnimado = document.getElementById('icono-animado'); 
const $vientoVelocidad = document.getElementById('viento-velocidad');
const $contenedor = document.querySelector('content-clima');

const APIK = 'bb4b47965dabb2488bab96c8dc5a09b4';
const latitude = '-24.18323',
    longitude = '-65.33125';
    // -24.18323'
const url = `http://api.openweathermap.org/data/2.5/forecast?lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${APIK}`;

const obtenerClima = async () => {

    let res = await fetch(url)
    .then(res => res.json())
    .then( json => {
        // console.log(json);
        mostrarDatosClima(json.list[0]);
    })
    .catch((err) => {
        let message = err.statusText || "Ocurrió un error";
        console.log(message);
    });
}

const mostrarDatosClima = ( datos ) => {
    // console.log(datos.weather[0].description);
    // console.log(datos.main);
    // console.log(datos.main.temp);
    // console.log(datos.main.temp_max);
    // console.log(datos.main.temp_min);
    // console.log(datos.main.humidity);
    // console.log(datos.main.pressure);
    // console.log(datos.wind.speed);

    $ubicacion.textContent = `Ciudad Cultural, San Salvador de Jujuy`;

    let temp = Math.round(datos.main.temp);
    let min = Math.round(datos.main.temp_min);
    let max = Math.round(datos.main.temp_max);

    //console.log(temp)
    $temperaturaValor.textContent = `${temp} ° C`;
    $temperaturaMin.textContent = `min : ${min} ° C`;
    $temperaturaMax.textContent = `max : ${max} ° C`;
    //console.log(data.weather[0].description)
    let desc = datos.weather[0].description;
    $temperaturaDescripcion.textContent = desc;
    
    $vientoVelocidad.textContent = `${datos.wind.speed} m/s`;

    // console.log(datos.weather[0].main);
    switch (datos.weather[0].main) {
        case 'Thunderstorm':
            $iconoAnimado.src='../assets/animated/thunder.svg'
            // console.log('TORMENTA');
            break;
        case 'Drizzle':
            $iconoAnimado.src='../assets/animated/rainy-2.svg'
            // console.log('LLOVIZNA');
            break;
        case 'Rain':
            $iconoAnimado.src='../assets/animated/rainy-7.svg'
            // console.log('LLUVIA');
            break;
        case 'Snow':
            $iconoAnimado.src='../assets/animated/snowy-6.svg'
            // console.log('NIEVE');
            break;                        
        case 'Clear':
            $iconoAnimado.src='../assets/animated/day.svg'
            // console.log('LIMPIO');
            break;
        case 'Atmosphere':
            $iconoAnimado.src='../assets/animated/weather.svg'
            // console.log('ATMOSFERA');
            break;  
        case 'Clouds':
            $iconoAnimado.src='../assets/animated/cloudy-day-1.svg'
            // console.log('NUBES');
            break;  
        default:
            $iconoAnimado.src='../assets/animated/cloudy-day-1.svg'
            // console.log('por defecto');
        }
}

d.addEventListener("DOMContentLoaded", obtenerClima); 

// Funcion para manejar el Formulario de Registro 
function onClick (event) {
    event.preventDefault(); // para anular la accion normal del boton dentro de un form
    // this.style.backgroundColor = "black"; //cambia de color el background del boton despues del click
    const mensaje = {
      comercio: document.getElementById('comercio').value,
      titular: document.getElementById('titular').value,
      celular: document.getElementById('celular').value
    }
    console.log(mensaje);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(mensaje),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => { 
          console.log(json);
          Swal.fire(
              'Enviado',
              'Gracias por tu comentario',
              'success'
          );
          cleanForm(); // Llamada a la funcion cleanForm
          /* redirectUrl(); */
      })
      .catch((err) => console.log(err));
  }
// Limpieza de los labels del form con id=formulario
function cleanForm() {
    let formulario = document.getElementById('formulario');    
    formulario.reset();    
    // this.style.backgroundColor = "buttonface";
}
function redirectUrl(){
    window.location.href = "https://google.com";    
}

// Inicio de Enviar Registro (capturacion del evento y luego llamada a la funcion onClick definida mas arriba)
let boton = document.getElementById("enviar");
boton.addEventListener("click", onClick);
