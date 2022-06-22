
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});  
const {idProduct} = params;
const {category} = params;

let divGaleryItens = null

window.onload=()=>{
  divGaleryItens = document.getElementById("divGaleryItens");
  getCategory(category)
  getProduct(idProduct)  
}

function comprar(idBtnComprar, idProduct, category){
  const btnComprar = document.getElementById(idBtnComprar)
  btnComprar.addEventListener("click",()=>{
    document.location.href = `${urlSite}?idProduct=${idProduct}&category=${category}`
  })
}

function getProduct(idProduct) {   
  axios.get(`${urlApi}/products/${idProduct}`)
    .then(response => {
      const data = response.data     
      
      productImage.src = data.image;
      productTitle.textContent = data.title;
      productPrice.textContent = `R$ `+data.price;
      productPriceSplit.textContent = `Ou por apenas 10x de R$ `+data.price/10;
      productDescription.textContent = data.description;       
    })
    .catch(error => console.log(error))  
}

function getCategory(category) {
  axios.get(`${urlApi}/products?category=${category}&_limit=5`)
    .then(response => {
      const data = response.data
      
      data.forEach((data, index) => {
        const idBtnComprar = `btn-comprar-${index}`
        const item = document.createElement("div")
        item.className="galery-item"
        item.innerHTML=
        `
          <div class=mini-galery-category>
            <img src="${data.image}">
          </div>
          <div class="mini-galery-info">
            <p class="desc-mini-preco">
              R$ ${data.price}
            </p> 
            <p class="product-price-split">
              Ou por apenas 10x de R$ ${data.price/10}
            </p>
            <p class="desc-mini-galery">
              ${data.title}
            </p>
            <div class="btn-comprar-galery">
              <button id="${idBtnComprar}" name="button">Comprar</button>
            </div>                  
          </div>          
        ` 
        divGaleryItens.appendChild(
          item
        )
        comprar(idBtnComprar, data.id, category);
      })
    })
}

