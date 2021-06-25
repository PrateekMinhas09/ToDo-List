// Selecting elemenets from html(index)
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

todoList.removeChild(todoList.childNodes[0]);
//Adding Event Listeners to the elements grabbed

document.addEventListener('DOMContentLoaded',getTodosLocalStorage);
todoButton.addEventListener('click',addTodo);
todoList,addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodos);




//functions 
function addTodo(e)
{ e.preventDefault();
    if(todoInput.value=="")
    {
        alert('please write a task! :)');
    }
    else{
    
    //create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create LI(child of div)
    const newTodo = document.createElement('li');
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); //making the li a child of div
//add todos to local storage 
        saveLocalTodos(todoInput.value);
    //complete button check 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class = 'fas - fa-check'></i>`
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    //trash button

    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class = 'fas - fa-trash'></i>`
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

//now the div we have created is actually just inside the body, we need to append it to the ul

todoList.appendChild(todoDiv);
todoInput.value="";

    }

}




function deleteCheck(e)
{
        const item = e.target;
       
        //delete item 
        if(item.classList[0]==='trash-btn')
        {
            const todo = item.parentElement;//get parent element 

            //animation
            todo.classList.toggle(`fall`);

            removeTodoLocalStorage(todo);
            todo.addEventListener('transitionend',function(e){
                todo.remove();
            })
        
        }

        //checked item
        if(item.classList[0]==='completed-btn')
        {
            const todo = item.parentElement;
            todo.classList.toggle('completed');
           
        }
}

function filterTodos(e)
{
    const todos = todoList.childNodes;
   

    todos.forEach(function(eachTodo){
        switch(e.target.value)
        {
            case 'all':
            {
                eachTodo.style.display='flex';
                break;
            }
            case 'completed':
            {
                if(eachTodo.classList.contains(`completed`))
                {
                    eachTodo.style.display='flex';
                }
                else {
                    eachTodo.style.display ='none';
                }
                    break;
            }
            case 'pending':
                { if(eachTodo.classList.contains(`completed`))
                {
                    eachTodo.style.display='none';
                }
                else {
                    eachTodo.style.display ='flex';
                }

                    break;
                }
        }
    });

}

function saveLocalTodos(e)
{
    //check - if we already have things saved in local storage
    let todos;
    if(localStorage.getItem('todos')=== null)
    {
        todos=[]; //creating an empty array

    }
    else{
        todos=JSON.parse(localStorage.getItem('todos')); //if it is ot null we pass the array of items in local storage to todos

    }
    todos.push(e);

    localStorage.setItem('todos',JSON.stringify(todos));//converts the array to string and then use it as the value 

}


function getTodosLocalStorage(e)
{
    //check if the local storage is empty or not 
    let todos ;
    if(localStorage.getItem('todos')===null)
    {
        todos =[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));

    }

    todos.forEach(function(todo){
        //create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create LI(child of div)
    const newTodo = document.createElement('li');
    newTodo.innerText= todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); //making the li a child of div

      
    //complete button check 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class = 'fas - fa-check'></i>`
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    //trash button

    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class = 'fas - fa-trash'></i>`
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);



todoList.appendChild(todoDiv);

    });
}

function removeTodoLocalStorage(todo)
{
    //check - if we already have things saved in local storage
    let todos;
    if(localStorage.getItem('todos')=== null)
    {
        todos=[]; //creating an empty array

    }
    else{

        todos=JSON.parse(localStorage.getItem('todos')); 

    }
    
    const index = todos.indexOf(todo.children[0].innerText);
    todos.splice(index , 1);
console.log(todo.children[0].innerText);

localStorage.setItem('todos',JSON.stringify(todos));

    
}