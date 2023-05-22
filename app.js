require('dotenv').config()
const { leerInput, inquirerMenu, pausa, lista_lugares } = require("./helpers/inquirer");
const Busqueda = require("./models/busquedas");


const main = async() =>{
    // el menu 
    const busqueda = new Busqueda();
    let opt;
    do{

        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // la ciudad
                const lugar = await leerInput('Ciudad: ');
                // buscarla
                const lugares = await busqueda.ciudad(lugar);
                // seleccionar un lugar
                const idSelect = await lista_lugares(lugares);
                if(idSelect !='0'){
                    const lugarSelect = lugares.find(l => l.id == idSelect);   
                    busqueda.agregarHistorial(lugarSelect.nombre);
                    // data del clima
                    const clima = await busqueda.climaLugar(lugarSelect.lat, lugarSelect.lng);
                    // mostrar resultados
                 
                    console.log('\n informacion del clima de la ciudad\n'.green);
                    console.log('Ciudad:',lugarSelect.nombre );
                    console.log('Lat:', lugarSelect.lng );
                    console.log('Lng:',lugarSelect.lat  );
                    console.log('Temperatura:', clima.temp);
                    console.log('Minima:', clima.min);
                    console.log('Máxima:', clima.max);
                    console.log('Descripcion: ', clima.desc.yellow);
                }
                break;
            case '2':
                console.log("El historial es: ")
                busqueda.historialCapitalizado.forEach((lugar,i) =>{
                    const index = `${i+1}.`.green
                    console.log(`${index} ${lugar}`);
                });

                break;

            default:
                break;
        }
        
        if(opt !='0') await pausa();

    }while(opt != '0');
}
main();