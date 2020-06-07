
function populateUFs(){
    const uFSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{return res.json()})
    .then(states => {

        for(const state of states){
            uFSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const indexOFSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOFSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then((res)=>{return res.json()})
    .then(cities => {

        

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled =false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens De Coleta

const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItens = []

function handleSelectedItem(event){
    const itemli = event.target
    //adicionar ou remover uma classe com JS
    itemli.classList.toggle("selected")
    const itemid = itemli.dataset.id



    
    //verificar se existem itens selecionados
    //se sim, pegar itens selecionados
    const alreadySelected = selectedItens.findIndex(item =>{
        const itemFound = item == itemid
        return itemFound
    })

    //Se já tiver selecionado tirar da seleção
    
    if(alreadySelected >= 0){
        const filteredItems = selectedItens.filter(item =>{
            const itemIsDifferent = item != itemid
            return itemIsDifferent
        })
        selectedItens = filteredItems
    }else{
         //Se não estiver slecionado tirar da selção 
         selectedItens.push(itemid)
    }


   
    //autalizar o campo escondido com os itens selecionados 
    collectedItems.value = selectedItens
    
}
