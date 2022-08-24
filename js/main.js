
const d = document;
// $table = d.querySelector(".crud-table"),
// $template = d.getElementById("crud-template").content,
const APIK = 'bb4b47965dabb2488bab96c8dc5a09b4';
const latitude = '-24.18323',
    longitude = '-65.33125';
const url = `http://api.openweathermap.org/data/2.5/forecast?lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${APIK}`;

const obtenerClima = async () => {

    let res = await fetch(url)
    .then(res => res.json())
    .then( json => {
        console.log(json);
        mostrarDatosClima(json.list[0]);
    })
    .catch((err) => {
        let message = err.statusText || "Ocurrió un error";
        console.log(message);
    // $table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status} : ${message}</b></p>`);
    });
}

const mostrarDatosClima = ( datos ) => {
    console.log(datos.weather[0].description);
    console.log(datos.main);
    console.log(datos.main.temp);
    console.log(datos.main.temp_max);
    console.log(datos.main.temp_min);
    console.log(datos.main.humidity);
    console.log(datos.main.pressure);
}

d.addEventListener("DOMContentLoaded", obtenerClima);