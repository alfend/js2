'use strict';

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {title: 'Shirt', price: 150},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250},
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
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
    constructor(title, price, img, link) {
        this.title = title;
        this.price = price;
        this.link = link
    }

    render() {
    }
}

class Basket {
    constructor() {
        this.addGoods = [];
        this.deletedGoods = []
    }

    //добавление товара в корзину
    addToBasket() {
    }

    //удаление товара из корзины
    deleteFromBasket() {
    }

    //сумма и кол-во
    calcBasket() {
    }

    //отображение
    render() {
    }
}

const list = new GoodsList();
list.fetchGoods();
window.onload = () => {
    list.render();
    list.calcAllGoods()
};