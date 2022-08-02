/** On récupère les info qui sont dans l'URL **/
const urlParams = window.location.search;
const searchParams = new URLSearchParams(urlParams);
const productId = searchParams.get("ID");

/** On rajoute les éléments a HTML **/
const spanOfNumberOrder = document.getElementById('orderId');
const numberorder = document.createElement('p');
numberorder.innerText = productId;
spanOfNumberOrder.appendChild(numberorder);