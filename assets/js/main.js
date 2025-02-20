const container = document.getElementsByClassName("container")
const allProducts = document.getElementById("all-products")
const search = document.getElementById("search")
const overlay = document.querySelector(".overlay")
const cartItem = document.getElementById("cartItem")
const count = document.getElementById("count")
const total = document.getElementById("total")

//=============================================

// Product Search :
const searchProducts =  (element) => {
  allProducts.innerHTML = "";
  element.forEach(product => {
    const discount = product.discount ? `<span class="discount">${product.discount}% OFF</span>` : "";
    const discountPrice = product.discount ? (product.price) * (1-product.discount / 100) : product.price;
    allProducts.innerHTML += `
            <div class="box">
          <span>${discount}</span>
          <div class="img-box">
            <img class="images" src="${product.image}" />
          </div>
          <div class="bottom">
            <p>${product.title}</p>
            <div><span>$${discountPrice}.00</span>${product.discount ? `<del>$${product.price}.00</del>` : "" }</div>
            <button onclick="addProdcut(${product.id})">Add to cart</button>
          </div>
        </div>
    `
  });
}
searchProducts(products);
//=============================================

search.addEventListener("input" , () => {
  const searchInput = search.value.toLowerCase();
  const result = products.filter((product) => 
    product.title.toLowerCase().includes(searchInput)
  );
  searchProducts(result);
})
//=============================================

// add overlay :
function preview() {
  overlay.classList.toggle("overlay-active")
}
//=============================================

// Add products to cart
let Cart = JSON.parse(localStorage.getItem("Cart")) || [];
let cardCount = Cart.length

const read = () => {
  let Total = 0
  Cart.length === 0 ? cartItem.innerHTML = `<p>Your cart is empty</p>` : cartItem.innerHTML = ""
  Cart.forEach(product => {
  Total += parseFloat(product.price)
  cartItem.innerHTML += `
    <div class="card">
      <img class="imgCard" src="${product.image}"/>
      <p class="textCard">${product.title}</p>
      <span class="price">$${product.price}.00</span>
      <button class="btn" onclick="deleteProduct(${product.id})"><i class="delete fa-regular fa-trash-can"></i></button>
    </div>
    <hr>
    `
  })
  total.innerHTML = `$${Total}`;
  count.innerHTML = cardCount;
  localStorage.setItem("Cart" , JSON.stringify(Cart));
}

const addProdcut = (id) => {
  let addPro = products.find(product => product.id == id)
  let newPro = {
    id : addPro.id + 1,
    image : addPro.image,
    title : addPro.title,
    price : addPro.discount ? (addPro.price) * (1-addPro.discount / 100) : addPro.price,
  }
  Cart.push(newPro)
  localStorage.setItem("id" , newPro.id)
  cardCount += 1
  read();
}
read()
//=============================================

let deletedId 
// Delete products
const deleteProduct = (id) => {
  Cart = Cart.filter(product => product.id != id)
  cardCount -= 1
  read()
  preview() 
}
