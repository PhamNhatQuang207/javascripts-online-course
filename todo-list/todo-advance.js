const todoList = [];
renderTodoList();

function renderTodoList(){
    let todoListHTML = '';
    //arrow function
        todoList.forEach((todoObject,i) => {
        const { name, doDate } = todoObject;
            const html = 
            `<div>${name}</div> 
            <div>${doDate}</div> 
            <button class="delete-button">Delete</button>`
            todoListHTML += html;                    
            });
    document.querySelector('.list').innerHTML = todoListHTML;
    document.querySelectorAll('.delete-button')
    .forEach((deleteButton,index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index,1);
            renderTodoList();
        })
    })
}

function addTodo() {
    const todoName = document.querySelector('.todo-name');
    const todoDate = document.querySelector('.todo-date');
    const name = todoName.value;
    const date = todoDate.value;
    todoList.push({
        name : name,
        doDate : date,
    });
    todoName.value = '';
    todoDate.value = ''
    renderTodoList();
}   