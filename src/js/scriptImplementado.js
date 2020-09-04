/*
  Vitória Carolina G. dos Santos
  -Dev girl 03/09/2020

  Código explicativo validação eficiente de formulários para iniciantes
*/

const fields = document.querySelectorAll("[required]"); //procurando no documento todos os campos com "required" definida

async function customValidation(e){ 
  
  const field = e.target; //elemento
  const validation = ValidadeField(field);//função para validar o formulário
  
  validation(); //executando a função retornada
}


function ValidadeField(field){

  function customMessage(typeError){ 
    //customização das mensagens de erro
    const messages = {
          text:{
                valueMissing: "Campo obrigatório!"
          },
          email:{
            valueMissing: "Campo obrigatório!",
            typeMismatch: "E-mail invalido!"
          }
      }
      /*
        valueMissing: para valores vazios;
        typeMismatch: para campo não preenchido corretamente segundo o tipo de dado desejado pelo form
      */

              //[tipo do campo] - [tipo de erro]
      return messages[field.type][typeError]
  }

  function setCustomMessage(message){
    const span = field.parentNode.querySelector("span.error"); //procurando no componente pai um elemento span com class error

    if(message){
      span.classList.add("active"); //adiciona class
      span.innerHTML = message; 
    }
    else{
      span.classList.remove("active"); //remove uma class
      span.innerHTML = "";
    }

  }

  //Essa função retorna outra função (usada lá em cima em customValidation())
  return function(){
    var error = verifyErrors(field); //true e false
    
    if(error){ //se houver um erro
      const message = customMessage(error); //busca a mensagem

      field.style.borderColor = "red"; //Estilo da borda do campo 
      setCustomMessage(message); 

    }
    else{ //se não houver erros
      field.style.borderColor = "#ff008d";
      setCustomMessage();
    }
  }
}

function verifyErrors(field){
  let error = false;
  //percorrer elementos da lista
  for(let key in field.validity){ //passando por cada propriedade da lista

    //field.validity[key] = valor das propriedades
    //!field.validity.valid = não seja um campo valido
    if(field.validity[key] && !field.validity.valid){ 
      error = key;
    }
  }
  return error;
}

//percorrer lista
for(field of fields){
  //adiciona um evento nos campos que não podem ser invalidos
  field.addEventListener("invalid", e =>{
    e.preventDefault(); //eliminando a mensagem padrão de erro do navegador
    customValidation(e);
  });
  field.addEventListener("blur", customValidation);
}

document.querySelector("form").addEventListener("submit", event =>{
  console.log("Enviar formulário");

  event.preventDefault(); //evitando o reload da página
})