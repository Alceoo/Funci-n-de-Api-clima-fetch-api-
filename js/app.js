/*Buscador de clima en base a la ciudad...

esta api lo que me va a permitir es traer datos de un servidor por así
decirlo, nosotros para el funcionamiento de esta tenemos que llenar un
input donde tendremos que escribir la ciudad.

Y un select donde tendremos que colocar el país de donde queremos 
sacar la temperatura...

*/
//Lugar donde mostraré el resultado de la consulta 
const resultado = document.querySelector('#resultado');
const container = document.querySelector('.container');

const formulario = document.querySelector('#formulario');
//Al hacer submit sobre el formulario
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();//AL USAR SUBMIT SIEMPRE PREVENTdEFAUTL
/*Primero debemos de validar que los campos no estén vacíos y después de
validar ya podremos consultar la API */

    //VALIDAR FORMULARIOS
    /*Tenemos que tener una variable que haga referencia al campo 
    de ciudad y una que haga referencia al campo de Pais, para de esta
    manera leer los valores que escojamos de ellas.*/

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
   // console.log(`ciudad: ${ciudad} - pais: ${pais}`);
    
    if(ciudad === '' || pais === ''){
       // console.log('No hay texto');
        mostrarError('Todos los campos son obligatorios');
        return;/*Detenemos la ejecución de nuestro código con un return..*/
    }
/*Esta Api requiere que le enviemos el pais, en el código de 2 dígitos, por lo tanto en el value
del html, lo idóneo sería que se le pusiera el código de 2 digitos como argentina AR*/
    
//CONSULTAR LA API...
}
function mostrarError(mensaje) {
    console.log(mensaje);
    //Crear una alerta; 
    const alerta = document.querySelector('.bg-red-100');
/*Selecciono el elemento que ya cree y lo que va en secuencia de crearse, si es que no existe ninguna alerta lo
pongo dentro, la clase va a ser única de esta alerta*/
    if(!alerta){
        const alerta = document.createElement('div');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    alerta.innerHTML = 
    `<strong class="font-bold"> Error!</strong>
    <span class="block"> ${mensaje} </span>`;
/*Si presiono de nuevo obtener clima me aparece una alerta apilada a la anterior, por lo que tengo que
eliminarla de alguna manera...

Aquí tengo de dos, desaparecerla después de cierta cantidad de tiempo, o validar si alerta existe, o si
no existe ninguna alerta, entonces imprímela, pero si la siguiente vez, hay una alerta, entonces ya no va a 
agregar otra, porque ya hay una.
y que se elimine después de tanto tiempo.*/
        container.appendChild(alerta);
        setTimeout(() => {
           alerta.remove(); 
        }, 3000);
  }
     
    
}





/*Por alguna razón no sirve el submit..., me manda un error 505 
al momento de hacer un submit*/