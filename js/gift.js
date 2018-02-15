let giftStore = []
class Gift {
  constructor({id, name, gift_img, description, person_id}) {
    this.id = id,
    this.name = name,
    this.gift_img = gift_img,
    this.description = description,
    this.person_id = person_id
    giftStore.push(this)
  }

  renderSingleGift(){
    return `<div data-id="${this.id}" class="card">
      <div class="image">
        <img src="${this.gift_img}">
      </div>
      <div class="content">
        <div class="header">${this.name}</div>
        <div class="meta">
          <a>${this.description}</a>
        </div>
      </div>
      <button class="ui button editItem" type="button">Edit</button>
      <button class="ui button deleteItem" type="button">Delete</button>
    </div>`
  }

  renderEditForm() {
    return `<div id="editGiftForm" class="ui container">
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
        <button class="ui button deleteItem" type="button">Delete</button>
      </div>
    </div>`
  }
}
