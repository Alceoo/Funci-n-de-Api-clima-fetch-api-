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
    //CONSULTAR LA API...
    /*Una vez teniendo el mensaje de error nosotros ya queremos consultar la API
    Esto es el proceso lógico, después de validar si hay o no hay una entrada correcta
    del usuario, yo con eso que me dio, quiero arrojar lo que el está buscando, para
    hacer ello utilizo la API...*/

    llamarApi(ciudad, pais);//La función llevará dos argumentos, esos serán los que el usuario coloque 

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

function llamarApi(ciudad, pais){
    /*1, creoq ue tendría que acceder de alguna manera a los datos que el usuario haya colocado, pero
    no necesito hacer esto, ya que cómo argumentos(valores reales) yo le estoy pasando en la misma función
    donde creé mis elementos ciudad y pais y les extraje su valor, pues al colocarlos como parámetros
    de una función en automático los valores de dichos parámetros serán los que el usuario haya colocado.*/
    const referenciaSitioApi = `167b96df7ad4b507d8a7b7dd724fa319
    `;
    //Y siempre le tenemos que poner el url del sitio...
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${referenciaSitioApi}` 
   // console.log(url);
/*City = El nombre de la ciudad
country = es el nombre del país 
state code = aún no sé que signifique la vdd
así que lo eliminamos...
Así que lo cambiamos a nuestro Idioma básicamente...
City = ciudad y claro con un signo de dolar antes..
Y después viene lo que sería poner nuestra llave que es la referenciaID

Entonces, veámos qué pasa...

Al darle un país que no concuerde con la ciudad, lo que pasará 
es que me va a mandar ciudad, not found.
Igual, si no copio el valor completo, que es la url, más el id
me va a mandar 401, no haría nada, para ello tengo que copiar completo
la url más el id que me arroje por consola el log.
Nosotros tenemos que mandar la información cómo la Api lo solicita.

Por ejemplo, Si por ejemplo tratamos de implementar pagos en linea, y sea
con paypal o con stripe, ellos te dicen, bueno, tienes que pasarme el 
número de cliente quién eres tú, para poderte abonar el dinero, también
me tienes que pasar qué moneda estás cobrando, qué cantidad estás cobrando
, todos esos datos se los tenemos que pasar de cierta forma.*/
    fetch(url)
        .then((respuesta) => {
        /*Entonces tendremos una respuesta, elegimos el formato en el
        que queremos la API, que es JSON.
        */
            
          return respuesta.json(); 
          
        })
        .then((datos) => {
        /*Entonces ya vamos a tener los datos, el "datos" es un objeto
        accedemos a sus datos como en cualquier objeto, con un destructuring*/
            //console.log(datos);
            /*Aquí hay una respuesta en errores, 404 si no 
            encontró nada o demás...*/
            if(datos.cod === "404"){//ciudad
                mostrarError('ciudad no encontrada');
            }else {
                limpiarHTMLPrevio();
                mostrarClima(datos);
            }
        })
  
    /*Tengo que empezar a crear los elementos con destructuring, después 
    tengo que crear los elementos, pero primerooo...
    TENGO QUE CHECAR QUÉ ELEMENTOS TENGO QUE SACAR, DONDE COLOCARLO, 
    SERÍA EN EL MISMO ELEMENTO PARA PONER ARRIBA DE AGREGA TÚ CIUDAD
    CREO QUE TAMBIÉN TENgo que eliminar el texto de agrega tú ciudad
    y tengo reiniciar el formulario y colocar de nuevo en el de 
    seleccionar un select a la opción predeterminada...
    
    Perooo antes lo que tendría que hacer sería ver si la promesa
    se cumplió, si se cumple el promise pero el resultado no es
    correcto, para ello está en el .then de datos
    si los datos son iguales a 404, si esa ciudad que yo estoy
    consultando no concuerda con el país, mostrar error y decirle 
    ciudad no encontrada
    */

}
function mostrarClima(datos){//Iterar sobre los datos...

    const {main: {temp, temp_max, temp_min}} = datos;
    /*La información que quiero está dentro del objeto main, peroo. 
    yo antes tenía pss el datos, por lo que si accedo a datos como
    ya loe stoy haciendo sólo me traería main y los que están en 
    la misma jerarquía de hijos, por lo que hago un div destructuring(este
    no es nada más que del objeto padre(datos) accedemos a uno de sus hijos
    que contenga la información que queremos, de ese hijo, accederemos a
    otro hijo de ese hijo)
        console.log(temp - 273.15);*/

    const temperaturaCentigrados = Math.round(temp - 273.15);
    /*const temperaturaMxma = Math.round(temp_max - 273.15); 
    const temperaturaMnma = Math.round(temp_min - 273.15); 
    */
    const temperaturaActual = document.createElement('p');
    temperaturaActual.innerHTML = 
    `<p>${temperaturaCentigrados} &#8451</p>`;
    temperaturaActual.classList.add('font-bold', 'text-6xl', 'text-white');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(temperaturaActual);
   
    resultado.appendChild(resultadoDiv);
    //SOLUCIÓN PROBLEMA
    /*En este problema lo que pasa es que al colocar mi resultado de lo 
    que sería la temperatura del país, y volver a colocar de nuevo otra 
    ciudad, me pone un resultado y el otro, pero yo sólo quiero el que 
    acabo de poner, el otro ya no lo quiero...
    
    Para esto lo que debo de hacer es borrar el anterior básicamente
    o limpiar el html previo.... lo mando llamar antes de mostrar el clima...*/ 
    formulario.reset();
    /*Ahora, lo que tendría que hacer sería ammm
    podría redondearlo.
    
    Bueno, las variables ya las tengo, ahora lo que necesito es crear
    los elementos donde van a ir estas variables. que van a ser parrafos
    o un div que neglobe varios párrafoss
    
    */

//Al resetear quiero que el resultado anterior se borre, para ello es un while
}
/*1.El lugar donde mmostraré los resultados
2.Los datos que voy a extraer

*/

function limpiarHTMLPrevio(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

/*Pero claro, obviamente lo que tenemos que hacer es ir en secuencia, primero claramente que 
tenemos que validar el formulario y hacer nuestra kEY DE LA API que vayamos a utilizar

Ya después de validar el formulario tenemos que obtener UNA API KEY o la llave de la api


*/