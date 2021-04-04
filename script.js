const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        cartGoods: [],
        searchLine: '',
        isVisibleCart: false
    },
    methods: {
		makeGETRequest(url, callback) {
		return new Promise((resolve, reject) => {
			let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
			xhr.open("GET", url, true);
			xhr.onload = () => resolve(callback(xhr.responseText));
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		  });
		},
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
		},
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
		},
		basketCount() {
			let count = this.cartGoods.length;
			document.getElementById('basketCount').innerHTML = ' (' + count + ')';
		},
		calcAllGoods() {
			let totalPrice = 0;
			this.cartGoods.forEach((good) => {
				if (good.price !== undefined) {
					totalPrice += good.price;
				}
			});
			let totalGoodsAnswer = "Общая сумма товаров в корзине: $" + totalPrice;
			document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
		},
		viewCart() {
			switch(this.isVisibleCart) {
				case(false): {
					this.isVisibleCart = true;
					break;
				}
				case(true): {
					this.isVisibleCart = false;
					break;
				}
			}
		},
		render() {
			let readHtml = '';
			this.cartGoods.forEach((good) => {
				const goodItem = new BasketItem(good.id, good.title, good.price);
				readHtml += goodItem.render();
			})
			document.querySelector('.goods-list').innerHTML = readHtml;
			this.calcAllGoods();
		},
		 filterGoods() {
				let regexp = new RegExp(this.searchLine, 'i');
				this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
		 }
	},
    async created() {
        try {
            this.goods = await this.makeGETRequest('response.json');
            this.filteredGoods = this.goods;
        } catch(err) {
            console.error(err);
        }
    },
    mounted() {
        this.calcAllGoods();
    }	 
		
})


function addBasket(event) {
    app.addToBasket(event.target.id);
}
function deleteItem(event) {
    app.deleteFromBasket(event.target.id);
}


list.fetchGoods('response.json');
