'use strict';

const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];

const renderGoodsItem = (title, price, htmlClass='class="goods-item"') => {
    return `<div ${htmlClass}><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').insertAdjacentHTML('beforeend',goodsList.join(''));
    //insertAdjacentHTML('beforeend',goodsList.join('')) исправляет не массив, а соединить

    // альтернатива
    //  let div = document.getElementsByClassName('goods-list');
    //  div[0].innerHTML=goodsList;
}

renderGoodsList(goods);




