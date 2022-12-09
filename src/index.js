document.addEventListener('DOMContentLoaded', showDogs)



//shows all dogs in the table
function showDogs(){


const table = document.querySelector('table')
console.log(table)

//Gets all dogs details
fetch('http://localhost:3000/dogs')
.then(resp => resp.json())
.then(data => {
    data.forEach(dog => {
        const row = document.createElement('tr')
        const nameColumn = document.createElement('td')
        const breedColumn = document.createElement('td')
        const sexColumn = document.createElement('td')
        const editColumn = document.createElement('td')
        const editButton = document.createElement('button')

        nameColumn.innerText = dog.name
        row.appendChild(nameColumn)

        breedColumn.innerText = dog.breed
        row.appendChild(breedColumn)

        sexColumn.innerText = dog.sex
        row.appendChild(sexColumn)

        editButton.innerText = `Edit`



editButton.addEventListener('click', editDog)

//Data of dog edited to populate the form
    function editDog(){
    const inputs = document.querySelectorAll('input')

    inputs[0].value = dog.name
    inputs[1].value = dog.breed
    inputs[2].value = dog.sex

    const form = document.querySelector('form')

    form.addEventListener('submit',updateDog)

//update dog details on the page    
    function updateDog(){
        fetch(`http://localhost:3000/dogs/${dog.id}`,{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json"
            },
            body :  JSON.stringify({
            name: inputs[0].value,
            breed: inputs[1].value,
            sex: inputs[2].value
            })
        })

        table.innerHTML = ''

        showDogs()
    }


}


        editColumn.appendChild(editButton)
        row.appendChild(editColumn)


        table.appendChild(row)

    })
})


}