'use strict';

class GoodsItem {
  constructor(id, title = 'Отсутствует', price = '0') {
	this.id = id;
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p><button onclick='cart.addToBasket(${this.id})'>Добавить</button></div>`;
  }
}

// промис
function makeGETRequest(url, callback) {
	
    return new Promise((resolve, reject) => {
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
}


class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods(url) {
        makeGETRequest(url, (good) => {
            this.goods = JSON.parse(good);
            this.render();
            this.calcAllGoods();
        })
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.id, good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  
  calcAllGoods() {
    let totalPrice = 0;
    this.goods.forEach((good) => {
        totalPrice += good.price
    });
    let totalGoodsAnswer = "Все товары на сумму " + totalPrice;
    document.querySelector('.goods-total').innerHTML = totalGoodsAnswer
  }
}

class BasketItem {
    constructor(title, price, link) {
        this.title = title;
        this.price = price;
        this.link = link
    }

    render() {
        return `<div class="basket-item"><div class="basket-info"><h3>${this.title}</h3><p>${this.price}</p></div><button onclick='cart.deleteFromBasket(${this.id})'>&times;</button></div>`;
    }
}

class Basket {
    constructor() {
        this.cartGoods = [];
    }
	
	//добавление товара в корзину
    addToBasket(id) {
		let toBasket;
        list.goods.forEach(function(item) {
            if(id == item.id) {
                toBasket = {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                }
            }
        });
        this.cartGoods.push(toBasket);
        this.basketCount();
    }
	//удаление товара из корзины
    deleteFromBasket(id) {
		let getIdElemen;
        this.cartGoods.forEach(function(item, i) {
            let thisId = item.id;
            if(id == thisId) {
                getIdElemen = i;
            }            
        });
        this.cartGoods.splice(getIdElemen, 1);
        this.render();
        this.basketCount();
    }
	//сумма и кол-во
	basketCount() {
        let count = this.cartGoods.length;
        document.getElementById('basketCount').innerHTML = ' (' + count + ')';
    }
	
	calcAllGoods() {
        let totalPrice = 0;
        this.cartGoods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        let totalGoodsAnswer = "Общая сумма товаров в корзине: $" + totalPrice;
        document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
    }
    
	calcBasket() {
    }
	//отображение
    render() {
		let readHtml = '';
        this.cartGoods.forEach((good) => {
            const goodItem = new BasketItem(good.id, good.title, good.price);
            readHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = readHtml;
        this.calcAllGoods();
    }
}


const list = new GoodsList();
const cart = new Basket();
list.fetchGoods('response.json');