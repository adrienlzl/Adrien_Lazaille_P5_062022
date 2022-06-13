/**const getproducts = async function () {
    try {
        let response = await fetch('http://localhost:3000/api/products')
        if (response.ok) {
            let data = await response.json()
            console.log(data)
        } else {
            console.error('Erreur du chargement', response.status)
        }
    } catch (e) {
        console.log(e)
        console.log(getproducts())
    }
}
const insertPost = async function (data) {
    let response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),

    })
    let responseData = await response.json()
    if (response.ok) {
        console.log(responseData)

    }
}
console.log(insertPost)
**/
fetch('http://localhost:3000/api/products')
    .then(response => response.json()).then(console.log)

const dataApi = fetch('http://localhost:3000/api/products');

window.onload = () => {
    //construction de HTML
const  section = document.getElementById("items")
   let A01 = document.createElement("a");
    A01.setAttribute("id","Lien01");
    A01.setAttribute("href","refId01");
    section.appendChild(A01);
    let Article01 = document.createElement("article");
    Article01.setAttribute("id","Art01");
    A01.appendChild(Article01);
    let span01 = document.createElement("span");
    span01.setAttribute("id","image01")
    let H01 = document.createElement("h3");
    H01.setAttribute("id","titlephoto01");
    let p01 = document.createElement("p")
    p01.setAttribute("id","textedescription01");
    Article01.appendChild(span01)
    Article01.appendChild(H01)
    Article01.appendChild(p01)





    /**
     console.log(section)
     let a01 = document.createElement("a")
     let lien01 = document.createTextNode("verspageprodduit")
     a01.appendChild(lien01)
     section.appendChild(a01)
     let article01 = document.createElement("article")
     a01.appendChild(article01)
     let img01 = document.createElement("img")
     img01.src = imageUrl01
     img01.alt = 'photo de notre Kanap01'
     article01.appendChild(img01)
     let h301 = document.createElement("h3")
     let titre01 = document.createTextNode("kanap name1")
     h301.classList.toggle("productName")
     h301.appendChild(titre01)
     img01.appendChild(h301)
     let p01 = document.createElement("p")
     let text01 = document.createTextNode(description01)
     p01.appendChild(text01)
     img01.appendChild(p01)
     **/




 dataApi.then(async (responseData) => {
     //console.log(responseData);

     const response = await responseData.json();
     console.log(response);

     try {
         //Récupération des info de l'API

        const refId01 = response[0]._id;
        const name01 = response[0].name;
        const imageUrl01 = response[0].imageUrl;
        const description01 = response[0].description;
        const altTxt01 = response[0].altTxt;

         const refId02 = response[1]._id;
         const name02 = response[1].name;
         const imageUrl02 = response[1].imageUrl;
         const description02 = response[1].description;
         const altTxt02 = response[1].altTxt;
3
         const refId03 = response[2]._id;
         const name03 = response[2].name;
         const imageUrl03 = response[2].imageUrl;
         const description03 = response[2].description;
         const altTxt03 = response[2].altTxt;

         const refId04 = response[3]._id;
         const name04 = response[3].name;
         const imageUrl04 = response[3].imageUrl;
         const description04 = response[3].description;
         const altTxt04 = response[3].altTxt;

         const refId05 = response[4]._id;
         const name05 = response[4].name;
         const imageUrl05 = response[4].imageUrl;
         const description05 = response[4].description;
         const altTxt05 = response[4].altTxt;

         const refId06 = response[5]._id;
         const name06 = response[5].name;
         const imageUrl06 = response[5].imageUrl;
         const description06 = response[5].description;
         const altTxt06 = response[5].altTxt;

         const refId07 = response[6]._id;
         const name07 = response[6].name;
         const imageUrl07 = response[6].imageUrl;
         const description07 = response[6].description;
         const altTxt07 = response[6].altTxt;

         const refId08 = response[7]._id;
         const name08 = response[7].name;
         const imageUrl08 = response[0].imageUrl;
         const description08 = response[7].description;
         const altTxt08 = response[7].altTxt;

         // ajout des textes
         const affichage_titlephoto01 = document.querySelector('#titlephoto01');
         affichage_titlephoto01.innerHTML = name01;
         const affichage_textedescription01 = document.querySelector('#textedescription01');
         affichage_textedescription01.innerHTML = description01;
         const affichage_url01 = document.querySelector("#image01");
         affichage_url01.innerHTML = imageUrl01;

         //const affichage_lien01 = document.querySelector('#Lien01');
         //affichage_lien01.innerHTML = refId01

         // ajout des images image01
         const image01_url = `<img src="${imageUrl01}">`;
         affichage_url01.insertAdjacentHTML('afterbegin',image01_url);




     }catch (err){
         console.log(err);
     }
 })

}









/** creation des div pour les produits
let a02 = document.createElement("a")
let a03 = document.createElement("a")
let a04 = document.createElement("a")
let a05 = document.createElement("a")
let a06 = document.createElement("a")
let a07 = document.createElement("a")
 **/