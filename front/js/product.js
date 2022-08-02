/** Pour récupérer les infos de l'url et les récupérer **/
const urlParams = window.location.search;
const searchParams = new URLSearchParams(urlParams);
const productId = searchParams.get("id");

if (!productId) {
    document.location.href = "index.html";
}
/** Constante pour afficher les infos de l'article en fonction de son ID **/
const getProductById = async (productId) => {
    const response = await fetch('http://localhost:3000/api/products/' + productId);
    const data = await response.json();
    displayProduct(data);
}

getProductById(productId);


/**
 * Constante pour afficher les info de l'article et rajouter le code HTML
 * @param product
 */
const displayProduct = (product) => {

    const imageContent = document.querySelector(".item__img");

    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", product.imageUrl);
    imageElement.setAttribute("alt", product.altTxt);
    imageContent.appendChild(imageElement);

    const titleElement = document.getElementById("title");
    titleElement.innerText = product.name;

    const priceElement = document.getElementById("price");
    priceElement.innerText = product.price;

    const descriptionElement = document.getElementById("description");
    descriptionElement.innerText = product.description;

    product.colors.forEach((color) => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", color);
        optionElement.innerText = color;

        const colorsElement = document.getElementById("colors");
        colorsElement.appendChild(optionElement);
    });

}

/** Pour rajouter les items au panier **/
// on vas vérifier que les champs sont bien remplis
const verificationOfInfo = document.getElementById("addToCart");
//quand on click sur le panier on lance la vérification des info couleur et quantité
verificationOfInfo.addEventListener("click",
    (event) => {

        let errors = 0;
        // Choix de la couleur
        const colorsSelect = document.getElementById("colors");
        const colorIndex = colorsSelect.options.selectedIndex;

        if (document.getElementById("msg-order") !== null ){
            const msgOrder = document.getElementById("msg-order");
            msgOrder.remove()
        }


        if (colorIndex !== 0) {


            if (document.getElementById('msg-color') !== null) {
                const msgErrorElement = document.getElementById('msg-color');
                msgErrorElement.remove();
            }

        } else {
            errors++;
            if (document.getElementById('msg-color') === null) {

                const blockitem = document.querySelector(".item__content__settings__color");
                const message = document.createElement("p");
                message.setAttribute("id", "msg-color");
                message.style.color = "#0909a1";
                message.style.textAlign = "center";
                message.style.letterSpacing = "1px";
                message.style.fontWeight = "bold";
                message.innerText = "* veuillez sélectionner une couleur";
                blockitem.appendChild(message);

            }
        }
        //Choix de la quantité
        const quantitySelect = document.getElementById("quantity");
        const quantitySelling = quantitySelect.value
        const numberOfQuantity = parseInt(quantitySelling);



        if (numberOfQuantity > 0 && numberOfQuantity < 101) {
            //let errors = 0;


            if (document.getElementById('msg-quantity') !== null) {
                const msgErrorElement = document.getElementById('msg-quantity');
                msgErrorElement.remove();
            }

        } else {
            errors++;
            if (document.getElementById('msg-quantity') === null) {
                const blockQuantity = document.querySelector(".item__content__settings__quantity");
                const messageQuantity = document.createElement("p");
                messageQuantity.setAttribute("id", "msg-quantity");
                messageQuantity.style.color = "#0909a1";
                messageQuantity.style.textAlign = "center";
                messageQuantity.style.letterSpacing = "1px";
                messageQuantity.style.fontWeight = "bold";
                messageQuantity.innerText = "* veuillez sélectionner une quantité comprise entre 1 et 100";
                blockQuantity.appendChild(messageQuantity);
            }
        }

    });

/** Pour rajouter les articles au localstorage **/
const addtoBasket = document.getElementById("addToCart");
//quand on click sur le panier on rajoute les articles au localstorage
addtoBasket.addEventListener("click",
    (event) => {

        const colorsSelect = document.getElementById("colors");
        const colorIndex = colorsSelect.options.selectedIndex;
        const quantitySelect = document.getElementById("quantity");
        const quantitySelling = quantitySelect.value
        const numberOfQuantity = parseInt(quantitySelling);
        const itemContentAddbutton = document.querySelector(".item__content__addButton");



        if (numberOfQuantity > 0 && numberOfQuantity < 101 && colorIndex !== 0) {

        let Product = {
            idProduct: productId,
            colorOfProduct: colorsSelect.options[colorIndex].value,
            quantityOfProduct: numberOfQuantity,

        };


            let productForLocalstorage = JSON.parse(localStorage.getItem("productBasket"));


            if (!productForLocalstorage) {
            productForLocalstorage = []
            //event.preventDefault();

        }
         const productFound = productForLocalstorage.find(Item => Item.colorOfProduct === Product.colorOfProduct && Item.idProduct === Product.idProduct);
             console.log(Product);

            if (productFound) {
             productFound.quantityOfProduct = parseInt(productFound.quantityOfProduct);
             productFound.quantityOfProduct += parseInt(Product.quantityOfProduct);


       } else {
            productForLocalstorage.push(Product);
        }

            //productForLocalstorage.push(Product);
        localStorage.setItem("productBasket", JSON.stringify(productForLocalstorage));
            const messageOrder = document.createElement("p");
            messageOrder.setAttribute("id", "msg-order");
            messageOrder.innerText = 'Votre commande a bien été prise en compte. Elle a été rajoutée à votre panier';
            messageOrder.style.color = "#0909a1";
            messageOrder.style.textAlign = "center";
            messageOrder.style.letterSpacing = "1px";
            messageOrder.style.fontWeight = "bold";
            itemContentAddbutton.appendChild(messageOrder);
           setTimeout (() => {messageOrder.remove()}, 3000);
        }});

