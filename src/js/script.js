/*
  Vitória Carolina G. dos Santos
  -Dev girl 03/09/2020

  Código explicativo validação eficiente de formulários para iniciantes
  --> Validação dos campos - Básico
  */


const fields = document.querySelectorAll("[required]");

async function customValidation(e){
  const field = e.target; //elemento
  let error = await verifyErrors(field); //função para verificar se o elemento possui erros

  if(error){
    field.setCustomValidity("Esse campo é obrigatório!"); //Trocando a msg padrão do bubble
  }
  else{
    field.setCustomValidity(""); //limpa a formatação
  }
  
}

function verifyErrors(field){
  let error = false;
  //percorrer elementos da lista
  for(let key in field ){ //passando por cada propriedade da lista
    //customError smp será true pois setamos ele com "setCustomValidity"
    if(key !== "customError" && field.validity[key]){ //field.validity[key] = valor das propriedades
      error = key;
    }
  }
  return error;
}

//percorrer lista
for(field of fields){

  //adiciona um evento nos campos que não podem ser invalidos
  field.addEventListener("invalid", customValidation)
}

document.querySelector("form").addEventListener("submit", event =>{
  console.log("Enviar formulário");

  event.preventDefault();
})