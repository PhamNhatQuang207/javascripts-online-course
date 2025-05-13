const todoList = [];
renderTodoList();
function renderTodoList(){
    let todoListHTML = '';
        for(let i=0; i<todoList.length; i++){
                const todo = todoList[i];
                const html = 
                `<p>
                    ${todo} 
                    <button onclick="todoList.splice(${i},1);
                    renderTodoList()" class="delete-button"
                    ">Delete</button>
                </p>`
                todoListHTML += html;
            }
    document.querySelector('.list').innerHTML = todoListHTML;
    }
function addTodo() {
    const todoInput = document.querySelector('.todo-input');
    const name = todoInput.value;
    todoList.push(name);
    todoInput.value = '';
    renderTodoList();
}   
f 