/** On recupère les info du localstorage **/
const myBasket = JSON.parse(localStorage.getItem("productBasket"));
console.log(myBasket);

/** Constante pour automatiser les rajout HTML **/
const createMyElement = (element, classes = null, attributes = null, text = null) => {
    const newElement = document.createElement(element);


    if (classes !== null) {
        classes.forEach((classe) => {
            newElement.classList.add(classe);
        });
    }

    if (attributes !== null) {
        attributes.forEach((attribut) => {
            newElement.setAttribute(attribut.attribute, attribut.content);
        });
    }

    if (text !== null) {
        newElement.innerText = text;
    }

    return newElement;
}

/**
 * Affiche un Item produit sur la page panier
 * @param data
 * @param product
 * @returns {{total: number, quantity: number}}
 */
const displayProduct = (data, product) => {
    const sectionBasket = document.getElementById("cart__items");

// Rajout du code HTML
    const myelement = createMyElement('article',
        [
            'cart__item',
        ],
        [
            {
                attribute: 'data-id',
                content: product.idProduct
            },
            {
                attribute: 'data-color',
                content: product.colorOfProduct
            }
        ]);
    sectionBasket.appendChild(myelement);

    const divCartImg = createMyElement('div', ['cart__item__img'], [{attribute: 'alt', content: data.altTxt}], []);
    myelement.appendChild(divCartImg);

    const img = createMyElement('img', [], [{attribute: 'src', content: data.imageUrl}, {
        attribute: 'alt',
        content: data.altTxt
    }], []);
    divCartImg.appendChild(img);

    const cartItemContent = createMyElement('div', ['cart__item__content'], [], []);
    myelement.appendChild(cartItemContent);

    const cartItemContentDescription = createMyElement('div', ['cart__item__content__description'], [], []);
    cartItemContent.appendChild(cartItemContentDescription);

    const nameProduct = createMyElement('h2', [], [], [data.name]);
    cartItemContentDescription.appendChild(nameProduct);

    const ColorOfProduct = createMyElement('p', [], [], [product.colorOfProduct]);
    cartItemContentDescription.appendChild(ColorOfProduct);

    const price = createMyElement('p', [], [], [data.price + " €"]);
    cartItemContentDescription.appendChild(price);

    const cartItemContentSetting = createMyElement('div', ['cart__item__content__settings'], [], []);
    cartItemContent.appendChild(cartItemContentSetting);

    const cartItemQuantity = createMyElement('div', ['cart__item__content__settings__quantity'], [], []);
    cartItemContentSetting.appendChild(cartItemQuantity);

    const quantityselling = createMyElement('p', [], [], ['Qté :']);
    cartItemQuantity.appendChild(quantityselling);

    const inputQuantity = createMyElement('input', ['itemQuantity'], [{
        attribute: 'type',
        content: 'number'
    }, {attribute: 'name', content: 'itemQuantity'}, {attribute: 'min', content: '1'}, {
        attribute: 'max',
        content: '100'
    }, {attribute: 'value', content: product.quantityOfProduct}, {
        attribute: 'data-id',
        content: product.idProduct
    }, {attribute: 'data-color', content: product.colorOfProduct}], []);
    cartItemQuantity.appendChild(inputQuantity);

    const forDelete = createMyElement('div', ['cart__item__content__settings__delete'], [], []);
    cartItemContent.appendChild(forDelete);

    const deleteItem = createMyElement('p', ['deleteItem'], [{
        attribute: 'data-id',
        content: product.idProduct
    }, {attribute: 'data-color', content: product.colorOfProduct}], ['Supprimer']);
    forDelete.appendChild(deleteItem);

/**Pour changer les quantités **/
    inputQuantity.addEventListener('change', (e) => {

        const newQuantity = e.target.value;

        myBasket.forEach((p) => {
            if (p.idProduct === product.idProduct && p.colorOfProduct === product.colorOfProduct && p.quantityOfProduct >= 0 && p.quantityOfProduct <= 101) {
                p.quantityOfProduct = parseInt(newQuantity, 10);

            }
            if (p.quantityOfProduct <= 0 || p.quantityOfProduct >= 101) {
                p.quantityOfProduct = 1
                //displayCart();
            }
        })
        console.log(myBasket)
        localStorage.setItem("productBasket", JSON.stringify(myBasket));


    });
/** Pour suprimer les articles du panier **/
    deleteItem.addEventListener('click', (e) => {
        let AddRemove = myBasket.length;
        if (AddRemove == 1) {
            return localStorage.removeItem("productBasket")
        } else {
            AllProduct = myBasket.filter((element) => {
                if (
                    deleteItem.dataset.id != element.idProduct || deleteItem.dataset.color != element.colorOfProduct
                ) {
                    return true
                }
            });
            localStorage.setItem("productBasket", JSON.stringify(AllProduct));
            displayCart();
        }
    });
// POur faire le total Prix et quantité
    let quantity = parseInt(product.quantityOfProduct, 10);
    let total = product.quantityOfProduct * data.price;
    return {quantity, total}
};


/**
 * La focntion displaycart permet d'afficher les info HTML des articles du localstorage
 *
 */
const displayCart = () => {
    const sectionBasket = document.getElementById("cart__items");
    sectionBasket.innerText = "";

    let nbArticles = 0;
    let totalPrice = 0;

    const products = JSON.parse(localStorage.getItem("productBasket"));
// quand le panier est vide
    if (products === null) {
        const parentMessageEmptyBasket = document.getElementById('cart__items');
        const messageEmptyBasket = document.createElement('p');
        messageEmptyBasket.style.color = "#0909a1";
        messageEmptyBasket.style.textAlign = "center";
        messageEmptyBasket.style.letterSpacing = "1px";
        messageEmptyBasket.style.fontWeight = "bold";
        messageEmptyBasket.innerText = "Votre panier est vide";
        parentMessageEmptyBasket.appendChild(messageEmptyBasket)
    }
    if (products != null) {

        products.forEach(async (product) => {
            const response = await fetch('http://localhost:3000/api/products/' + product.idProduct);
            const data = await response.json();
            const {quantity, total} = displayProduct(data, product);


            // Pour le nombre d'articles total.
            nbArticles += quantity;

            // pour le prix total
            totalPrice += total;

            const totalQuantity = document.getElementById('totalQuantity');
            totalQuantity.innerText = nbArticles;
            const finalPrice = document.getElementById('totalPrice');
            finalPrice.innerText = totalPrice;
        });
    }

}
displayCart();


//selection du HTML du formulaire
const order = document.getElementById('order');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');

//Creation des Regex
const simpleRegex = /^[a-zA-Z]{3,20}$/;
const adressRegex = /^[a-zA-Z0-9\s,'-]*$/;
const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$/;


/** La partie du formulaire **/
order.addEventListener("click", (e) => {
    e.preventDefault()
    //controle de validé des champs du formulaire
    if (!simpleRegex.test(firstName.value)) {
        firstNameErrorMsg.innerText = 'Merci de saisir votre prénom correctement (les chiffres et symbole ne sont pas autorisé)';
    } else {
        firstNameErrorMsg.remove()
    }
    if (!simpleRegex.test(lastName.value)) {
        lastNameErrorMsg.innerText = 'Merci de saisir votre nom correctement (les chiffres et symbole ne sont pas autorisé)';
    } else {
        lastNameErrorMsg.remove()
    }
    if (!adressRegex.test(address.value)) {
        addressErrorMsg.innerText = 'Merci de saisir votre adresse postale correctement';
    } else {
        addressErrorMsg.remove()
    }
    if (!simpleRegex.test(city.value)) {
        cityErrorMsg.innerText = 'Merci de saisir votre adresse correctement (les chiffres et symbole ne sont pas autorisé)';
    } else {
        cityErrorMsg.remove()
    }
    if (!emailRegex.test(email.value)) {
        emailErrorMsg.innerText = 'Merci de saisir votre adresse mail correctement (xxxx@xxx.xxx)'
    } else {
        emailErrorMsg.remove()
    }
    if (simpleRegex.test(firstName.value) && simpleRegex.test(lastName.value) && adressRegex.test(address.value) && simpleRegex.test(city.value) && emailRegex.test(email.value)) {

        /** Pour envoyer les infos a l'API afin de récuprer le num de commande **/
        // On envois les info du formulaire
        const body = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            // pour envoyer les ID des produits
            products: myBasket.map(product => product.idProduct)
        }


        // Envois de la requête POST à l'API
        const orderProducts = fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // réponse de l'API
        orderProducts
            .then(response => response.json())
            .then(data => {
                const orderNumber = data.orderId
                window.open("./confirmation.html?ID=" + orderNumber);
                }
            )
            .catch(error => console.log(error))
    }

});
