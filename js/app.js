const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR0ZVPXwzi1Z2vPhiZj-TPqew8qcrF--XFrRb94esXCtkGZ7raH8lLOHKMw`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    let ratingIcon;
    // condition for rating icon
    if (product.rating.rate == 5) {
      ratingIcon = `
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
      `;
    }
    else if(product.rating.rate > 4) {
      ratingIcon = `
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star-half-alt"></i>
      `;
    }
    else if(product.rating.rate == 4) {
      ratingIcon = `
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning far fa-star"></i>
      `;
    }
    else if(product.rating.rate > 3) {
      ratingIcon = `
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star-half-alt"></i>
        <i class="text-warning far fa-star"></i>
      `;
    }
    else if(product.rating.rate == 3) {
      ratingIcon = `
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning far fa-star"></i>
        <i class="text-warning far fa-star"></i>
      `;
    }
    else if(product.rating.rate > 2) {
      ratingIcon = `
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star-half-alt"></i>
        <i class="text-warning far fa-star"></i>
        <i class="text-warning far fa-star"></i>
      `;
    }
    else if(product.rating.rate == 2) {
      ratingIcon = `
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning far fa-star"></i>
        <i class="text-warning far fa-star"></i>
        <i class="text-warning far fa-star"></i>
      `;
    }
    else if(product.rating.rate > 1) {
      ratingIcon = `
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning fas fa-star-half-alt"></i>
        <i class="text-warning far fa-star"></i>
        <i class="text-warning far fa-star"></i>
        <i class="text-warning far fa-star"></i>
      `;
    }
    else if(product.rating.rate == 1) {
      ratingIcon = `
        <i class="text-warning fas fa-star"></i>
        <i class="text-warning far fa-star"></i>
        <i class="text-warning far fa-star"></i>
        <i class="text-warning far fa-star"></i>
        <i class="text-warning far fa-star"></i>
      `;
    }

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card h-100 shadow card-color">
        <img src="${image}" class="card-img-top h-50 w-50 mx-auto" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">Category: ${product.category}</p>
          <h3>Price: $ ${product.price}</h3>
          <div>
            <small>
              ${ratingIcon}
            </small>
            <span>${product.rating.rate} </span>
            <span>(${product.rating.count})</span>
            <div class="mt-3">
              <button type="button" class="btn btn-info me-2" onclick="addToCart(${product.id},${product.price})">Add to cart</button>
              <button type="button" class="btn btn-warning me-2">Details</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// extra

const clearCart = () => {
  const price = getInputValue("price");
  if(price > 0) {
    const confirmation = confirm('Alert: You are checking out. If you want to shopping more click on "cancel" button. Happy Shopping!');
    if (confirmation === true) {
      const email = prompt('Enter Your Email');
      
    }
  }
  else{
    alert('Please add a few poduct in cart');
  }
};