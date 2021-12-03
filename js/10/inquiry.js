let url = 'http://localhost:3000/posts';
let div = document.getElementById('data');
let getBut = document.getElementById('getBut');
let setBut = document.getElementById('setBut');

//let response = fetch(url, {method: 'DELETE', headers: { 'Content-Type': 'application/json;charset=utf-8'}})


//delete json[id];

let post = {
    author: "name",
    title: "email"

}

function drawUsers(response){
    response.forEach((item) => {
        const author = document.createElement("h3");
        const title = document.createElement("p");
        author.innerHTML = item.author || 'No author';
        title.innerHTML = item.title || 'No content';
        div.appendChild(author);
        div.appendChild(title);
        
    })
}

getBut.onclick = () => {
    let response = fetch(url)
        .then(response => response.json())
        .then(response => drawUsers(response))     
}

setBut.onclick = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    let setPost = {
        author: name,
        title: email
    
    }
    let response = fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(setPost)})
        .then(response => response.json())
        //.then(response =>console.log(response))   

}







