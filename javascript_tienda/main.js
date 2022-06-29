/**
* let se usa solo para que se cambie de valor dentro de
* un bloque puede ser un if.
**/

let shop = document.getElementById("shop");
/**
* arreglo de objetos, cada uno con sus propiedades
**/
let shopItemsData = [
{
    id: 1,
    name: "Casual shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit, anet consectetur adipisicing",
    img: "./images/img-1.jpg"
},
{
      id: 2,
      name: "Office shirt",
      price: 100,
      desc: "Lorem ipsum dolor",
      img: "./images/img-2.jpg"
},
{
        id: 3,
        name: "T shirt",
        price: 25,
        desc: "Lorem ipsum dolor",
        img: "./images/img-3.jpg"
},
{
          id: 4,
          name: "Mens Suit",
          price: 300,
          desc: "Lorem ipsum dolor",
          img: "./images/img-4.jpg"
   }];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop=()=>{
    //poner ese valor en el HTML
    return (shop.innerHTML = shopItemsData.map((x)=>{
        //si de un lado esta vacio toma el otro lado
        let search = basket.find((y) => y.id === x.id) || [];
        return `
        <div class="item">
                    <img width="220" src=${x.img} alt="">
                    <div id=product-id-${x.id} class="details">
                        <h3>${x.name}</h3>
                        <p>${x.desc}</p>
                        <div class="price-quantity">
                            <h2>${x.price}</h2>
                            <div class="buttons">
                                <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                                <div id=${x.id} class="quantity">
                                    ${search.item === undefined? 0: search.item}
                                </div>
                                <i onclick="increment(${x.id})"class="bi bi-plus-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }).join(""));

};

generateShop();

let decrement = (id)=>{
    let selectItem = id;
    let search = basket.find((x) => x.id === selectItem);

    if(search === undefined) return; 
    else  if(search.item === 0){
        return;
    }else{
        search.item -= 1;
    }
    console.log(basket);
    //convertir el objeto en string

    update(selectItem);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
};

let increment = (id)=>{
  let selectItem = id;
      let search = basket.find((x) => x.id === selectItem);

      if(search === undefined){
          basket.push(
                  {id: selectItem,
                   item: 1,
                  })
      }else{
          search.item += 1;
      }
    console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectItem);
    calculation();

};

let update = (id)=>{
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;

};

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    let valor = basket.map((x) => x.item).reduce((x,y)=> x + y,0);
    cartIcon.innerHTML = valor;
};

calculation();