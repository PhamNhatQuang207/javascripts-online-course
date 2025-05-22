const todoList = [];
renderTodoList();
function renderTodoList(){
    let todoListHTML = '';
        for(let i=0; i<todoList.length; i++){
                const todoObject = todoList[i];
                const { name, doDate } = todoObject;
                const html = 
                   `<div>${name}</div> 
                    <div>${doDate}</div> 
                    <button onclick="
                    todoList.splice(${i},1);
                    renderTodoList()" 
                    class="delete-button"
                    ">Delete</button>`
                todoListHTML += html;
            }
    document.querySelector('.list').innerHTML = todoListHTML;
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