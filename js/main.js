const products = [
    {
        name: "Iphone 12 mini",
        price: 699
    },
    {
        name: "Iphone 12",
        price: 799
    },
    {
        name: "Iphone 12 Pro",
        price: 999
    },
    {
        name: "Iphone 12 Pro Max",
        price: 1199
    },

]

let cart = {

    item: [],
    numberOfItem: null,
    qualities: 0
}


function renderAllProducts() {
    const tableOfProducts = document.getElementById("products")
    tableOfProducts.innerHTML = "";
    products.forEach((value,index) => {
        tableOfProducts.innerHTML += ` <tr>
                            <td>${value.name}</td>
                            <td>${value.price}$</td>
                            <td>
                                <button onclick="addToCart(${index})" class="btn btn-success">
                                    Add to Card
                                </button>
                            </td>
                        </tr>`
    })


}


function renderAllCart() {
    const tableOfCart = document.getElementById("cart")
    const badgeOfCart = document.getElementById("badge-quentity")
    tableOfCart.innerHTML = '';



    if (cart.item.length === 0) {
        badgeOfCart.innerHTML = `${ cart.qualities }`
        tableOfCart.innerHTML = `
        <tr>
            <td colspan="5">There is no item in cart yet</td>
        </tr>
        `;
    }


    badgeOfCart.innerHTML = `${ cart.qualities }`
    cart.item.forEach((cartvalue,index )=> {
        tableOfCart.innerHTML += ` <tr>
                            <td>${cartvalue.name}</td>
                            <td>${cartvalue.quality}</td>
                            <td>
                                <button onclick="removeFromCart(${index})" class="btn btn-danger">
                                    Remove From Cart
                                </button>
                            </td>
                        </tr>`
    })



}


function addToCart(productIndex) {
    const product = products[productIndex]
    let isAllreadyInCart =false;
    let newCartItem = cart.item.reduce((state, item)=>{
        if (item.name === product.name){
            isAllreadyInCart = true;
            const newItem = {
                ...item,
                quality: item.quality + 1
            }
            return [...state, newItem]
        }
        return [...state, item]
    },[])

    if (!isAllreadyInCart){
        newCartItem.push({
            ...product,
            quality: 1
        })
    }

    cart = {
        item:newCartItem,
        qualities: cart.qualities + 1
    }

    renderAllCart()
}

function removeFromCart (index){
    cart.item.splice(index,1)
    cart.qualities = 0
    cart.item.map(value => cart.qualities+= value.quality)
    renderAllCart()
}


renderAllProducts()
renderAllCart()
