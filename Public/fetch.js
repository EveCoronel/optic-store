setTimeout(() => {
    const productsContainer = document.getElementById("productsCards-div");

    console.log(productsContainer)

    productsContainer.addEventListener("click", event => {

        console.log('hola?')
        let cart = productsContainer.getAttribute("data-cartId");
console.log(cart)
        if (event.target.classList.contains("btn-add-to-cart")) {

            console.log('hola?')
            const productId = event.target.getAttribute("data-productId");
            console.log(productId)
            fetch(`http://127.0.0.1:8080/carts/${cart}/products/${productId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));

        }
    });
}, 5000)

