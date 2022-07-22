// on récupere les info du local storage
const myBasket = JSON.parse(localStorage.getItem("productBasket"));
console.log(myBasket);


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


    inputQuantity.addEventListener('change', (e) => {

        const newQuantity = e.target.value;

        myBasket.forEach( (p) => {
            if(p.idProduct === product.idProduct && p.colorOfProduct === product.colorOfProduct) {
                p.quantityOfProduct = newQuantity
            }
        })
        console.log(myBasket)
        localStorage.setItem("productBasket", JSON.stringify(myBasket));

    });

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

    let quantity = parseInt(product.quantityOfProduct, 10);
    let total = product.quantityOfProduct * data.price;
    return {quantity, total}
};


// on parcourt l'array
const displayCart = () => {
    const sectionBasket = document.getElementById("cart__items");
    sectionBasket.innerText = "";

    let nbArticles = 0;
    let totalPrice = 0;

    const products = JSON.parse(localStorage.getItem("productBasket"));


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

//ecouter l'ecriture des champs du formulaire


//les regex du formulaire
const regExPrenomNomVille = (value) => {
    return /^[a-zA-Z]{3,20}$/.test(value);
}
const regExEmail = (value) => {
    return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$/.test(value);
}
const regExAdresse = (value) => {
    return /^[a-zA-Z0-9\s,'-]*$/.test(value);
}


// Pour la validation du formulaire
order.addEventListener("click", (e) => {
    //controle de validé des champs du formulaire

    if (!regExPrenomNomVille(firstName.value)) {
        firstNameErrorMsg.innerText = 'Merci de saisir votre prénom'
    }
    if (!regExPrenomNomVille(lastName.value)) {
        lastNameErrorMsg.innerText = 'Merci de saisir votre nom'
    }
    if (!regExAdresse(address.value)) {
        addressErrorMsg.innerText = 'Merci de saisir votre adresse'
    }
    if (!regExPrenomNomVille(city.value)) {
        cityErrorMsg.innerText = 'Merci de saisir le nom de votre ville'
    }
    if (!regExEmail(email.value)) {
        emailErrorMsg.innerText = 'Merci de saisir votre adresse mail'
    }
    if (regExPrenomNomVille(firstName.value) && regExPrenomNomVille(lastName.value) && regExAdresse(address.value) && regExPrenomNomVille(city.value) && regExEmail(email.value)) {
        e.preventDefault()
        const contact = {
                prénom: firstName.value,
                nomDeFamille: lastName.value,
                adresse: address.value,
                ville: city.value,
                email: email.value,
                lesProduits: myBasket,
            }
            localStorage.setItem("Ordered", JSON.stringify(contact));
            window.open("./confirmation.html");
        }
});

