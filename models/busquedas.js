const fs = require('fs');
const axios = require('axios');
class Busqueda{
    historial =[];
    dbPath ='./db/historial.json';
    constructor(){
        this.leerDB();

    }

    get historialCapitalizado(){

        return this.historial.map(lugar =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        })
    }

    get paramsMapBox(){
        return{
            'access_token':process.env.MAP_KEY,
            'limit':5,
            'language':'es',
        }
    }
    get paramsWhater(){
        return{
            appid: process.env.openweather_key,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad (lugar =''){
        try {
            const i_Axio = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox,
            });

            const respt = await i_Axio.get();
            //console.log(respt.data.features);
            //const resp = await axios.get('https://reqres.in/api/users?page=2');
            //console.log(resp.data);
            return respt.data.features.map(lugar =>({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon){
        try {
            // intancia de axion
            const i_Axio_C = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWhater, lat, lon}
            });
            // res.data
            const resp = await i_Axio_C.get();
            const {weather, main} = resp.data;
            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp:main.temp,
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar =''){

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            const inde = this.historial.indexOf(lugar.toLocaleLowerCase());
            this.historial.splice(inde,1);
        }
        this.historial = this.historial.splice(0,4);

        this.historial.unshift(lugar.toLocaleLowerCase());


        // grabar en el archivo 
        this.guardarDB();
    }
    guardarDB(){
        const payload ={
            historial : this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }
    leerDB(){
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}

module.exports = Busqueda;