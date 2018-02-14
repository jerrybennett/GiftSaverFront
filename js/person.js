class Person {
  constructor({id, name, img, birth_day}) {
    this.id = id,
    this.name = name,
    this.img = img,
    this.birth_day = birth_day
    this.gifts = []
  }

  addGift(gift) {
    this.gifts.push(gift)
  }

  render(){
    return `<div data-set="${this.id}" class="card">
      <div class="image">
        <img src="${this.img}">
      </div>
      <div class="content">
        <div class="header">${this.name}</div>
        <div class="meta">
          <a>${this.birth_day}</a>
        </div>
      </div>
    </div>`
  }

  renderSingle(){
    return `<div data-id="${this.id}" class="card">
      <div class="image">
        <img src="${this.img}">
      </div>
      <div class="content">
        <div class="header">${this.name}</div>
        <div class="meta">
          <a>${this.birth_day}</a>
        </div>
      </div>
    </div>`
  }

}
