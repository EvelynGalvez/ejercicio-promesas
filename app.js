//Creando las promesas...
function animateElement(element1, start1, target1, duration1){ //Retornará promesa con elemento
  element1.style.left = start1; 
  let counter = 0;
  const delta1 = (target1 - start1)*50/duration1; //delta es lo que se debe mover por cuadro
  return new Promise((resolve, reject)=>{ // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
      const loop = setInterval(()=>{ // toma una funcion y la repite cada ciertos milisegundos
          const current = start1 + counter++ * delta1; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
          element1.style.left = current;
          if(start1 > target1 && current <= target1){ // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a target
              element1.style.left = current;
              clearInterval(loop); // Acá se termina la promesa
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
          }else if(start1 < target1 && current >= target1){
              element1.style.left = current;
              clearInterval(loop); // Acá se termina la promesa
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
          }
      }, 30);// 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
  });                
}

function animateElementVertical(element2, start2, target2, duration2){ 
  element2.style.top = start2; 
  let counter = 0;
  const delta2 = (target2 - start2)*50/duration2; 
  return new Promise((resolve, reject)=>{ 
      const loop = setInterval(()=>{ 
          const current = start2 + counter++ * delta2; 
          element2.style.top = current;
          if(start2 > target2 && current <= target2){
              element2.style.top = current;
              clearInterval(loop); 
              resolve();
          }else if(start2 < target2 && current >= target2){
              element2.style.top = current;
              clearInterval(loop); 
              resolve();
          }
      }, 30);
  });                
}


//Trabajando con las promesas, como usuarias...
const allLi = document.getElementsByTagName("li");

Promise.all(
  [
      animateElement(allLi[0], 0, 800, 4000),
      animateElement(allLi[1], 0, 800, 4000)
  ]
).then((results)=>{
  console.log("Terminaron las animaciones hacia la derecha");

  return Promise.all(
    [
      animateElementVertical(allLi[0], 0, 400, 4000),
      animateElementVertical(allLi[1], 110, 510, 4000)
    ]
  )
}).then((results)=> {
  console.log('Terminaron las animaciones hacia abajo');

  return Promise.all(
      [
          animateElement(allLi[1], 800, 0, 4000),
          animateElement(allLi[0], 800, 0, 4000)
      ]
  )
}).then((results)=>{
  console.log("Terminaron las animaciones a la izquierda");

  return Promise.all(
    [
      animateElementVertical(allLi[1], 510, 110, 4000),
      animateElementVertical(allLi[0], 400, 0, 4000)
    ]
  )
  
}).catch(()=>{
  console.log("Falló la animación");
});