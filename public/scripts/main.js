import Modal from "./modal.js";

const modal = Modal();

//pegando elementos da modal para alterar Marcar como lida ou deseja excluir? 
const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector(".modal button")

// Abrir modal

// Criar evento que escuta quando os botões classe = check são clicados

const checkButtons = document.querySelectorAll(".actions a.check"); // botão dentro da classe actions, um elemento "a" com classe check

checkButtons.forEach((button) => {
  // adiciona o listener em cada botão selecionado acima

  button.addEventListener("click", handleClick); // não precisa passar parametro pois event já é passado 
});

//Abrir a modal ao clicar em delete

const deleteButton = document.querySelectorAll(".actions a.delete"); // seleciona os botoes na classe action, elemento a e classe delete

deleteButton.forEach((button) => {
  button.addEventListener("click", (event) => handleClick(event, false)); // arrow function recebe o event (click) e passa para handleclick. Ao mesmo tempo handleClick diz que check = false e aciona o código
});



// sempre que chamar a funçao handleClick ela tera dois parametros: o evento (clique) e o check (true). Se não tiver alteração só chama a função mas se tiver (ex: check = false) passa os parametros
function handleClick (event, check = true) {// ao receer o evento click, e a variavel check -> verifica ternario e abre a função

    event.preventDefault ()
    const text = check ? "Marcar como lida " : "Excluir"
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector('#room-id').dataset.id //Id da sala, definido em room.ejs
    const questionId = event.target.dataset.id
    
    
    
    // Selecionando e passando na url a sala, id questão e action
    const form = document.querySelector('.modal form')
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug }`)


    modalTitle.innerHTML = `${text} esta pergunta?`   // ternario: check é igual a true? Se Sim "marcar como lido" : Se não  "Excluir pergunta"
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?` 
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove ("red") : modalButton.classList.add("red")
    modal.open()
}
