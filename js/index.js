document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const basePeopleURL = `http://localhost:3000/api/v1/people`
    const baseGiftURL = `http://localhost:3000/api/v1/gifts`
    const peopleDiv = document.getElementById('people')
    const giftsDiv = document.getElementById('gifts')
    const mainDiv = document.getElementById('show-all')
    const profileDiv = document.getElementById('profile')
    const giftForm = document.getElementById('giftForm')
    const personForm = document.getElementById('personForm')
    const newPersonForm = document.getElementById('newPersonForm')
    const addNewPersonButton = document.getElementById('addNewPersonButton')
    const forms = document.getElementById('forms')


    // All People Routes
    function getPeople() {
      fetch(basePeopleURL)
        .then(res => res.json())
        .then(peopleArr => {
          peopleArr.forEach(function(person){
            let p = new Person(person)
            person.gifts.forEach(function(gift) {
              let g = new Gift(gift)
              p.addGift(g)
            })
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
      })
      .then(res => res.json())
      .then(json => {
        let newPerson = new Person(json)
        profileDiv.innerHTML += newPerson.renderSingle()
        personForm.innerHTML = ''
        appendGiftForm()
      })
    }

    function getPerson(id) {
      fetch(basePeopleURL + `/${id}`)
        .then(res => res.json())
    }

    function editPerson(id, name, img, birth_day) {
      fetch(basePeopleURL + `/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          img: img,
          birth_day: birth_day
        })
      }).then(res => res.json())
        .then(json => {
          let newPerson = new Person(json)
        })
    }

    function deletePerson(id) {
      fetch(basePeopleURL + `/${id}`, {
        method: "DELETE"
      }).then(res => res.json())
    }

    // All Gift Routes
    function getAllGifts() {
      fetch(baseGiftURL)
        .then(res => res.json())
    }
    getAllGifts()

    function getGift(id) {
      fetch(baseGiftURL + `/${id}`)
        .then(res => res.json())
    }

    function createGift(obj){
      fetch(baseGiftURL, {
        method: 'POST',
        headers:  {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
      .then(json => {
        let newGift = new Gift(json)
        giftForm.innerHTML = ''
        giftsDiv.innerHTML += newGift.renderSingleGift()
      })
    }

    function editGift(obj) {
      fetch(baseGiftURL + `/${obj.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(res => res.json())
    }

    function deleteGift(id) {
      fetch(baseGiftURL + `/${id}`, {
        method: "DELETE"
      }).then(res => res.json())
    }

    // Create Gift
    giftForm.addEventListener('submit', function(e) {
      e.preventDefault()
        let card = document.getElementsByClassName('card')[0].dataset.id
        const giftImgInput = document.getElementById('giftImgInput').value
        const giftNameInput = document.getElementById('giftNameInput').value
        const giftDescriptionInput = document.getElementById('giftDescriptionInput').value
        newGiftObj = {name: `${giftNameInput}`, gift_img: `${giftImgInput}`, description: `${giftDescriptionInput}`, person_id: `${card}`}
        createGift(newGiftObj)
    })

    function personFormAppend(){
      return `<div id="newPersonForm" class="ui container">
        <div class="ui two column doubling stackable grid container">
          <img class="ui medium rounded image" src="http://via.placeholder.com/200x200">
          <form class="ui form">
            <h3 class="ui header">New Person</h3>
            <div class="field">
              <label>Image URL</label>
              <input id="personImgInput" type="text" name="img" placeholder="Image URL">
            </div>
            <div class="field">
              <label>Name</label>
              <input id="personNameInput" type="text" name="name" placeholder="Name">
            </div>
            <div class="field">
              <label>Birthday</label>
              <input id="personBDayInput" type="text" name="birth_day" placeholder="Birthday">
            </div>
            <button class="ui button" type="submit">Save</button>
          </form>
        </div>
      </div>`
    }

    addNewPersonButton.addEventListener('click', function(e){
      peopleDiv.innerHTML = ""
      personForm.innerHTML += personFormAppend()
    })

    function appendGiftForm() {
      const gF = `<div id="newGiftForm" class="ui container">
        <div class="ui two column doubling stackable grid container">
          <img class="ui medium rounded image" src="http://via.placeholder.com/200x200">
          <form class="ui form">
            <h3 class="ui header">New Gift</h3>
            <div class="field">
              <label>Gift Image URL</label>
              <input id="giftImgInput" type="text" name="img" placeholder="Gift Image URL">
            </div>
            <div class="field">
              <label>Name</label>
              <input id="giftNameInput" type="text" name="name" placeholder="Name">
            </div>
            <div class="field">
              <label>Description</label>
              <input id="giftDescriptionInput" type="text" name="birth_day" placeholder="Description">
            </div>
            <button class="ui button" type="submit">Save</button>
          </form>
        </div>
      </div>`
      giftForm.innerHTML += gF
    }

    function appendEditGiftForm(){
      const gF = `<div id="editGiftForm" class="ui container">
        <div class="ui two column doubling stackable grid container">
          <img class="ui medium rounded image" src="http://via.placeholder.com/200x200">
          <form class="ui form">
            <h3 class="ui header">Edit Gift</h3>
            <div class="field">
              <label>Gift Image URL</label>
              <input id="giftImgInput" type="text" name="img" placeholder="Gift Image URL">
            </div>
            <div class="field">
              <label>Name</label>
              <input id="giftNameInput" type="text" name="name" placeholder="Name">
            </div>
            <div class="field">
              <label>Description</label>
              <input id="giftDescriptionInput" type="text" name="birth_day" placeholder="Description">
            </div>
            <button class="ui button" type="submit">Save</button>
          </form>
        </div>
      </div>`
      giftForm.innerHTML += gF
    }

    // addNewPersonButton.addEventListener('click', function(e) {
    //   var x = addNewPersonButton
    //     if (x.style.visibility === "hidden") {
    //         x.style.visibility = "visible";
    //     } else {
    //         x.style.visibility = "hidden";
    //     }
    // })

    function handleNewPerson(e){
      e.preventDefault()
      const imgInput = document.getElementById('personImgInput')
      const nameInput = document.getElementById('personNameInput')
      const bDayInput = document.getElementById('personBDayInput')
      let name = nameInput.value
      let img = imgInput.value
      let birth_day = bDayInput.value
      let newPerson = createPerson(name, img, birth_day)
      forms.innerHTML = ""
    }
    personForm.addEventListener('submit', handleNewPerson)

    peopleDiv.addEventListener('click', function(e) {
      peopleDiv.innerHTML = ''
      appendGiftForm()
      let pInfo = e.target.parentNode.parentNode.dataset.id
      personStore.find(person => {
        if(pInfo == person.id){
          profileDiv.innerHTML += person.renderSingle()
          person.gifts.forEach(gift => {
            giftsDiv.innerHTML += gift.renderSingleGift()
          })
        }
      })
    })

    giftsDiv.addEventListener('click', e => {
      if(e.target.className === 'ui button editItem'){
        let gInfo = e.target.parentNode.dataset.id
        giftForm.innerHTML = ''
        appendEditGiftForm()
        giftForm.addEventListener('submit', e => {
          e.preventDefault()
          const giftId = gInfo
          const giftImgInput = document.getElementById('giftImgInput').value
          const giftNameInput = document.getElementById('giftNameInput').value
          const giftDescriptionInput = document.getElementById('giftDescriptionInput').value
          editGiftObj = {id: `${giftId}` ,name: `${giftNameInput}`, gift_img: `${giftImgInput}`, description: `${giftDescriptionInput}`}
          editGift(editGiftObj)
        })
      }
    })

    // giftsDiv.addEventListener('click', e => {
    //   console.log(e.target.parentNode);
    // })

  });
