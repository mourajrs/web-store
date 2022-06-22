
function comprar(idBtnComprar, idProduct, category){
  const btnComprar = document.getElementById(idBtnComprar)
  btnComprar.addEventListener("click",()=>{
    document.location.href = `${urlSite}?idProduct=${idProduct}&category=${category}`
  })
}

let divBody = null

window.onload=()=>{
  divBody = document.getElementById("divBody");
  getUsers()
}

function getUsers() {    
  axios.get(`${urlApi}/products?_limit=18`)
    .then(response => {
      const products = response.data
      console.log(products[0]);
      
      products.forEach((data, index) => {        
        const idBtnComprar = `btn-comprar-${index}`
        const productItem = document.createElement("div")
        productItem.className="list-products flex wrap"
        productItem.innerHTML=          
        `
          <div class="list-product-img">
            <img src="${data.image}"/>
          </div> 
          <div class="data-product">
            <p class="titulo">${data.title}</p>
            <p class="preco">R$ ${data.price}</p>          
          </div>
          <div class="btn-comprar">
            <button id="${idBtnComprar}" name="button">Comprar</button>
          </div> 
        `
        divBody.appendChild(
          productItem
        )
        comprar(idBtnComprar, data.id, data.category);
      })      
    })
    .catch(error => console.log(error))
}


