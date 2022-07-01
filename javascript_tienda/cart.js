let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    let valor = basket.map((x) => x.item).reduce((x,y)=> x + y,0);
    cartIcon.innerHTML = valor;
};

calculation();

let generateCartItems = () =>{
    if(basket.length !== 0){
       return shoppingCart.innerHTML = basket.map((x) => {
            let search = shopItemsData.find((y) => y.id === x.id);
            return `
            <div class="cartItems">
            <img width="220" src=${search.img} alt="">
            <div id=product-id-${search.id} class="details">
                <i onclick="deleteItems(${search.id})" class="bi bi-x"></i>
                <h3>${search.name}</h3>
                <p>${search.desc}</p>
                <div class="price-quantity">
                    <h2 id= "price+${search.id}">${search.price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${search.id})" class="bi bi-dash-lg"></i>
                        <div id=${search.id} class="quantity">
                            ${x.item === undefined? 0: x.item}
                        </div>
                        <i onclick="increment(${search.id})"class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
            `;
        });
        
    }
    else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class= "HomeBtn">Back to Home</button>
            </a>
        `;
    }
};

generateCartItems();

let deleteItems = (idin) => {
    console.log(basket);
    basket = basket.filter((x) => x.id !== idin);
    console.log(basket);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
}

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
            let shop = shopItemsData.find((y) => y.id === id);
            price = calcularPrice(search.item,shop.price);
        }
      console.log(basket);
      localStorage.setItem("data", JSON.stringify(basket));
      update(selectItem);
      calculation();
      updateItemPrice(price,id);
  
  };

  let calcularPrice = (item,id) =>{
    return item * id;
  };
  
  let update = (id)=>{
      let search = basket.find((x) => x.id === id);
      document.getElementById(id).innerHTML = search.item;
  
  };
  
  let decrement = (id)=>{
    let selectItem = id;
    let search = basket.find((x) => x.id === selectItem);

    if(search === undefined) return; 
    else  if(search.item === 0){
        return;
    }else{
        search.item -= 1;
        if(search.item == 0){
            deleteItems(id);
        }
        let shop = shopItemsData.find((y) => y.id === id);
        price = calcularPrice(search.item,shop.price);
    }
    console.log(basket);
    //convertir el objeto en string
    update(selectItem);
    calculation();
    updateItemPrice(price,id);
};

let updateItemPrice = (price,id) => {
    let concat = "price+" + id.toString();
    document.getElementById(concat).innerHTML = price;

};