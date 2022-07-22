// on ajoute le code html
const addProduct = (product) => {
    console.log(product);
    const section = document.getElementById("items");
    let link = document.createElement("a");
    link.setAttribute("alt", product.altTxt);
    link.setAttribute('href', './product.html?id=' + product._id);
    section.appendChild(link);
    let article = document.createElement("article");
    link.appendChild(article);
    let image = document.createElement("img");
    image.setAttribute("src",product.imageUrl);
    image.setAttribute("alt",product.altTxt);
    article.appendChild(image);
    let titre = document.createElement("h3");
    titre.innerHTML = product.name;
    article.appendChild(titre);
    let descriptifproduit = document.createElement("p");
    descriptifproduit.innerHTML = product.description;
    article.appendChild(descriptifproduit);
}
// on appelle l'api
const getproducts = async () => {
    const response = await fetch('http://localhost:3000/api/products');

    const data = await response.json();

    // mettre en place les products

    data.forEach((product) => {
        addProduct(product);
    });

}

getproducts();

