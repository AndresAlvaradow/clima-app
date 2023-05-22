const inquirer = require('inquirer');
require('colors');

const menuOptions =[
    {
        type: 'list',
        name: 'opcion', 
        message: 'Que desea realizar',
        choices: [
            {
                value: '1',
                name: `${'1.'.red} Buscar Ciudad`
            },
            {
                value: '2',
                name: '2. Historial'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
];

const inquirerMenu = async()=>{
    console.clear();
    console.log("============================".green);
    console.log("SELECCIONES UNA OPCION".green);
    console.log("============================".green);

    const {opcion} = await inquirer.prompt(menuOptions);
    return opcion;
}
const pausa = async()=>{
    const continuar=[
        {
            type: 'input',
            name:'enter',
            message: `Presione ${'Enter'.green} para continuar`
        }
    ];
    await inquirer.prompt(continuar);
}

const leerInput = async(message)=>{
    const pre = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length == 0){
                    return 'Ingrese un valor'
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(pre);
    return desc;
}

const lista_lugares = async(lugares =[]) =>{
    const choices = lugares.map((lugar,i) =>{
        const index = `${i+1}.`.green;
        return{
            value : lugar.id,
            name : `${index} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const pregunta =[
        {
            type: 'list',
            name: 'id',
            message: 'Seleccionar',
            choices
        }
    ]
    
    const {id} = await inquirer.prompt(pregunta);
    return id;
}

const confirmacion = async(message) =>{
    const pregunta =[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(pregunta);
    return ok;

}


const mostrar_lista_chek = async(tareas =[]) =>{
    const choices = tareas.map((tarea,i) =>{
        const index = `${i+1}.`.green;
        return{
            value : tarea.id,
            name : `${index} ${tarea.desc}`,
            checked: (tarea.estado) ? true : false
        }
    });

    const pregunta =[
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}


module.exports ={
    inquirerMenu,
    pausa, 
    leerInput, 
    confirmacion, 
    mostrar_lista_chek, 
    lista_lugares,
}