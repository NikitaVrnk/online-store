"use strict"
let basketUser = []
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// let goods = [];


// const makeGETRequest = (url) => {
//   return new Promise((resolve) => {
//     let xhr;
//     if (window.XMLHttpRequest) {
//       xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//       xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         resolve(JSON.parse(xhr.response));
//       }
//     }

//     xhr.open('GET', url, true);
//     xhr.send();
//   });
// }


///------------------КЛИК НА КОРЗИНУ---------------//
// 1 ВАРИАНТ 
//const mybaskett = document.querySelector('.mybasket');
// const $button_backet = document.querySelector('.button_basket');
// $button_backet.onclick = function (event) {
//   mybaskett.classList.toggle('basket_show')
// }

//2 ВАРИАНТ
const $mybasket = document.querySelector('.mybasket');
const $mybasketShow = document.querySelector('.basket_show');

document.querySelector(".btn_basket").addEventListener('click', function (e) {
  $mybasket.classList.toggle('basket_show')
})
//добавить закрытие корзины по клику вне модального окна

////////////-------------------------------////////////////////////////////////////////

//структура товара
class GoodsItem {

  constructor(options) {
    this.id_product = options.id_product;
    this.product_name = options.product_name;
    this.price = options.price;
    this.count = options.count;
  }
  render() {
    return `<div  class="goods-item">
            <h3 class="title">${this.product_name}</h3>
            <p class="price">${this.price}</p>
            <button id=${this.id_product} class="btn btn_add">Добавить</button>
          </div>`;
  }
  renderForBasket() {
    return `<div  class="basket-item">
            <h3 class="title">${this.product_name}</h3>
            <p class="price">${this.price}</p>
            <p class="count">${this.count}</p>
            <p id="delete-item" class="delete">X</p>
          </div>`;
  }
}

//окно отображения всех товаров
class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  }

  //получение JSON с сервера
  // fetchGoods(cb) {
  //   makeGETRequest(`${API_URL}/catalogData.json`, (goodsServer) => {
  //     this.goods = JSON.parse(goodsServer);
  //     console.log(this.goods)
  //     cb()
  //   })
  // }

  // fetchGoods() { //2015
  //   return makeGETRequest(`${API_URL}/catalogData.json`);
  // }

  async fetchGoods() {
    return await fetch(`${API_URL}/catalogData.json`).then(resp => resp.json());
  }

  //поиск кнопки добавить
  btn_nodeList() {
    console.log('поиск btn_nodeList')
    const $btn_add = document.querySelectorAll('.btn_add')
    console.log($btn_add)
    $btn_add.forEach((elem, index) => {
      console.log('поиск кнопки добавить')
      elem.addEventListener('click', () => {
        console.log('отработал клик')

        let isNew = true;
        if (basketUser.length > 0) {
          for (let i = 0; i < basketUser.length; i++) {
            if (elem.id == basketUser[i].id_product) {
              basketUser[i].count++;
              basketUser[i].price *= basketUser[i].count;
              isNew = false;
              break;
            }
          }
        }
        if (isNew) {
          let newArray = JSON.parse(JSON.stringify(this.goods))
          newArray[index].count = 1;
          basketUser.push(newArray[index]);
          console.log(newArray)
        }
        basket.fetchGoods();
        basket.render();
      })
    })
  }

  filterGoods(value) {

    //если инпут пустой не рендерить
    if (value != '') {
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
      this.renderFiltr();
    }
  }
  renderFiltr() {

    //   // const listHtml = document.querySelector('.goods-list');

    //   // this.filteredGoods.forEach(good => {
    //   //   console.log('цикл 2')
    //   //   let goodItem = new GoodsItem(good.product_name, good.price);
    //   //   // listHtml += goodItem.render();
    //   //   listHtml.innerHTML = ''
    //   //   listHtml.insertAdjacentHTML('beforeend', goodItem.render())
    //   // });



    //   // let listHtml = document.querySelector('.goods-list');
    //   // // console.log(filteredGoods)
    //   // console.log(this.filteredGoods)

    //   // this.filteredGoods.forEach(good => {
    //   //   let goodItem = new GoodsItem(good.product_name, good.price);
    //   //   listHtml += goodItem.render()
    //   // });

    let listHtml = document.querySelector('.goods-list');
    //   // document.querySelector('.goods-list').innerHTML = listHtml;

    // let goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
    this.filteredGoods.forEach(good => {
      let goodItem = new GoodsItem(good);
      listHtml.innerHTML = ''
      listHtml.insertAdjacentHTML('beforeend', goodItem.render())
    })
  }

  //добавить к объекту локальный объект данных
  addLocalGoods(object, object2) {
    let returnObjectForGoods = []
    return returnObjectForGoods = object2.concat(object)
  }

  //отрендерить все данные
  render(goods) {
    this.goods = list.addLocalGoods(localGoods, goods)

    const listHtml = document.querySelector('.goods-list');
    this.goods.forEach(good => {
      console.log('цикл 1')
      const goodItem = new GoodsItem(good);
      listHtml.insertAdjacentHTML('beforeend', goodItem.render())
    })

    /////////////////////////////////
    // this.filteredGoods.forEach(good => {
    //   console.log('цикл 2')
    //   let goodItem = new GoodsItem(good.product_name, good.price);
    //   // console.log(goodItem)

    //   // listHtml += goodItem.render();
    //   listHtml.insertAdjacentHTML('beforeend', goodItem.render())

    // });

    ////////////////////////////////////////
    list.btn_nodeList()
  }

}

const list = new GoodsList();
// list.concatLocal(localGoods)

list.fetchGoods()
  .then((data) => list.render(data));

////КЛИК НА КНОПКУ ДОБАВИТЬ И ОТОБРАЖЕНИЕ В КОРЗИНЕ/////
// без использования класса и без массива юзера////
// код оставлен для себя///
// const renderGoodsItemForBasket = ({
//   img,
//   title,
//   price
// }) => {
//   return `<div  class="basket-item">
//             <img class="img_item" src='img/${img}'><img>
//             <h3 class="title">${title}</h3>
//             <p class="price">${price}</p>
//           </div>`;
// };

// document.querySelectorAll('.button_add').forEach((elem) => {
//   elem.addEventListener('click', () => {
//     console.info(goods[elem.id - 1])
//     // GoodsItem.addBasket(elem.id)

//     document.querySelector('.mybasket').insertAdjacentHTML("beforeend", renderGoodsItemForBasket(goods[elem.id - 1]))
//   })
// })
let $searchButton = document.querySelector('.search-button')
let $searchInput = document.querySelector('.goods-search')

$searchButton.addEventListener('click', (e) => {
  const value = $searchInput.value;
  list.filterGoods(value);
});
//////////////////////////////////////////////

class Basket {
  constructor() {
    this.basketUser = [];
  }
  fetchGoods() {
    this.basketUser = basketUser
  }
  render() {
    let listHtml = '';
    this.basketUser.forEach(item => {
      const goodItem = new GoodsItem({
        id_product: item.id_product,
        product_name: item.product_name,
        price: item.price,
        count: item.count
      });
      listHtml += goodItem.renderForBasket();
    });
    $mybasket.innerHTML = listHtml;
    basket.btn_nodeList()
  }
  totalUserBasket() {
    let temp = 0;
    this.basketUser.forEach(item => {
      temp += item.price
      console.log(temp)
    })
  }

  //поиск кнопки удаления и удаление элемента
  btn_nodeList() {
    console.log('поиск btn_nodeList')
    const $delete_item = document.querySelectorAll('#delete-item')
    console.log($delete_item)
    $delete_item.forEach((elem, index) => {
      console.log('поиск кнопки добавить')
      elem.addEventListener('click', () => {
        console.log('отработал клик удалить')
        basketUser.splice(index, 1);
        basket.render()
      })
    })
  }
}
const basket = new Basket();
basket.totalUserBasket();
basket.render()

//коллбэк для сервера
// function makeGETRequest(url, callback) {
//   let xhr;
//   if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest();
//   } else if (window.ActiveXObject) {
//     xhr = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       callback(xhr.responseText);
//     }
//   }
//   xhr.open('GET', url, true);
//   xhr.send();
// }