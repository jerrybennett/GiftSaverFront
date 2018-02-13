document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const basePeopleURL = `http://localhost:3000/api/v1/people`
    const baseGiftURL = `http://localhost:3000/api/v1/gifts`
    const peopleDiv = document.getElementById('people')

    function getPeople() {
      fetch(basePeopleURL)
        .then(res => res.json())
        .then(peopleArr => {
          peopleArr.forEach(function(person){
            let p = new Person(person)
            peopleDiv.innerHTML += p.render()
          })
        })
    }
    getPeople()

    function createPerson(name, img, birth_day){
      fetch(basePeopleURL, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name: name,
          img: img,
          birth_day: birth_day
        })
      }).then(res => res.json()).then(json => {
        let newPerson = new Person(json)
        peopleDiv.innerHTML += newPerson.render()
      }).then(console.log)
    }

    function getPerson(id) {
      fetch(basePeopleURL + `/${id}`)
        .then(res => res.json())
        .then(console.log)
    }

    // getPerson("8")

    function getAllGifts() {
      fetch(baseGiftURL)
        .then(res => res.json())
        .then(json => console.log(json))
    }
    getAllGifts()

    function getGift() {
      fetch(baseGiftURL + `/${id}`)
        .then(res => res.json())
        .then(json => console.log(json))
    }

    function createGift(obj){
      fetch(baseGiftURL, {
        method: 'POST',
        headers:  {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name: obj.name,
          gift_img: obj.gift_img,
          description: obj.description,
          person_id: obj.person_id
        })
      }).then(res => { return res.json()}).then(json => console.log(json))
    }

    const personForm = document.getElementById('personForm')
    const personImgInput = document.getElementById('personImgInput')
    const personNameInput = document.getElementById('personNameInput')
    const personBDayInput = document.getElementById('personBDayInput')

    function handleNewPerson(e){
      e.preventDefault()
      let name = personNameInput.value
      let img = personImgInput.value
      let birth_day = personBDayInput.value
      createPerson(name, img, birth_day)
    }


    const addNewPersonButton = document.getElementById('addNewPersonButton')
    console.log(addNewPersonButton);
    const newPersonForm = document.getElementById('newPersonForm')
    newPersonForm.addEventListener('submit', handleNewPerson)


    // addNewPersonButton.addEventListener('click', function(e){
    //   main.innerHTML = ''
    //   const personForm = document.createElement('form')
    //   personForm.setAttribute('id', 'personForm')
    //   const imageLabel = document.createElement('label')
    //   imageLabel.innerText = 'Image'
    //   const imgInput = document.createElement('input')
    //   imgInput.setAttribute('type', 'text')
    //   imgInput.setAttribute('id', 'personImgInput')
    //   const nameLabel = document.createElement('label')
    //   nameLabel.innerText = 'Name'
    //   const nameInput = document.createElement('input')
    //   nameInput.setAttribute('type', 'text')
    //   nameInput.setAttribute('id', 'personNameInput')
    //   const birthdayLabel = document.createElement('label')
    //   birthdayLabel.innerText = 'Birthday'
    //   const birthdayInput = document.createElement('input')
    //   birthdayInput.setAttribute('type', 'text')
    //   birthdayInput.setAttribute('id', 'personBDayInput')
    //   const submitInput = document.createElement('input')
    //   submitInput.setAttribute('type', 'submit')
    //   submitInput.setAttribute('value', 'Submit')
    //   personForm.append(imageLabel)
    //   personForm.append(imgInput)
    //   personForm.append(nameLabel)
    //   personForm.append(nameInput)
    //   personForm.append(birthdayLabel)
    //   personForm.append(birthdayInput)
    //   personForm.append(submitInput)
    //   newPersonForm.append(personForm)
    //   // console.log(newPersonForm);
    // })


    function addPerson(){

    }
    // click on a person and show them and their gifts
    function showPerson(){
      getPerson(id)
    }
    peopleDiv.addEventListener('click', showPerson)

    //
    // function hideShow() {
    //   var x = document.getElementById("personForm");
    //     if (x.style.display === "none") {
    //         x.style.display = "block";
    //     } else {
    //         x.style.display = "none";
    //     }
    // }

    // crate gift for person



  });
