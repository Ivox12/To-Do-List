const bt = document.getElementById("more_task")
bt.addEventListener("click", add_task)

let listados = localStorage.getItem("listados")
let lista = document.querySelector(".list")
lista.innerHTML = listados

indentifica_task ()


function add_task (){
    let lista = document.querySelector(".list")
    var task_line = document.getElementById("task").value
    if (task_line != ''){

        lista.innerHTML += 
        `<li status="undone">
            <img id="ico" src="icos/pending.ico"/>
            <p class="conteudo">${task_line}</p> 
            <button>
                <img src="icos/delete.ico">
            </button>
        </li>
        `
        indentifica_task ()
        document.getElementById("task").value = ''
    }
    
}

function indentifica_task (){
    
    const task_li = document.querySelectorAll("li")
    task_li.length > 0 && task_li.forEach(function(task_li) {
        task_li.addEventListener("click", done)
    })
    
    const task_del = document.querySelectorAll("ul > li > button")
    task_del.length > 0 && task_del.forEach(function(task_del) {
        task_del.addEventListener("click", delete_task)
    })
    
    localStorage.setItem("listados", lista.innerHTML);
}

function done (event){
    const task_li = event.currentTarget.children[1];
    let task_stat = event.currentTarget.getAttribute("status");  
    let doing = document.querySelector(".list")
    let done = document.querySelector(".list_done")

    if (task_stat == "undone"){
        event.currentTarget.setAttribute("status", "done")
        event.currentTarget.children[0].setAttribute("src","icos/tick.ico"); 
        event.currentTarget.style.backgroundColor= "#2090a5";
        task_li.style.textDecoration= "line-through";
        event.currentTarget.outerHTML= '';
        done.innerHTML += event.currentTarget.outerHTML
        indentifica_task ()
    }
    else {
        event.currentTarget.setAttribute("status", "undone")
        event.currentTarget.children[0].setAttribute("src","icos/pending.ico");
        event.currentTarget.style.backgroundColor= "#8e65b4f5";
        task_li.style.textDecoration= "none";
        event.currentTarget.outerHTML= '';
        doing.innerHTML += event.currentTarget.outerHTML
        indentifica_task ()
    }
    localStorage.setItem("listados", lista.innerHTML);
}

function delete_task (event){
    let task_del = event.currentTarget.parentElement;
    task_del.outerHTML = '';
    localStorage.setItem("listados", lista.innerHTML);
    
}
localStorage.clear(listados)