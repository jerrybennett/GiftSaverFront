class Person {
  constructor({id, name, img, birth_day}) {
    this.id = id,
    this.name = name,
    this.img = img,
    this.birth_day = birth_day
  }

  render(){
    return `<div class="card">
      <div class="image">
        <img src="${this.img}">
      </div>
      <div class="content">
        <div class="header">${this.name}</div>
        <div class="meta">
          <a>${this.birth_day}</a>
        </div>
      </div>
      <div class="ui bottom attached button">
        <i class="add icon"></i>
        Add Gift
      </div>
    </div>`
  }

}
