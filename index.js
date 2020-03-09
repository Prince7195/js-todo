const name = document.getElementById('name');
const email = document.getElementById('email');
const cuAction = document.getElementById('cu-action');
const todoBody = document.getElementById('todo-body');
let currentId = null;
let list = [];
cuAction.addEventListener('click', addTodo);
function addTodo() {
    if (currentId) { // update
        list = list.map(todo => {
            if (todo.id === currentId) {
                todo.name = name.value;
                todo.email = email.value;
            }
            return todo;
        });
        updateValues('', 'Add');
    } else { // add
        list.push({
            id: list.length + 1,
            name: name.value,
            email: email.value
        });
    }
    buildTBody();
}
function reset() {
    name.value = '';
    email.value = '';
}
function buildTBody() {
    let tBody = '';
    list.forEach(todo => {
        const tr = `<tr>
            <td>${todo.id}</td>
            <td>${todo.name}</td>
            <td>${todo.email}</td>
            <td>
                <a href="javascript:void(0)" onclick="editTodo(${todo.id})">Edit</a>
                <a href="javascript:void(0)" onclick="deleteTodo(${todo.id})">Delete</a>
            </td>
        </tr>`;
        tBody += tr;
    });
    todoBody.innerHTML = tBody;
    reset();
}
function updateValues(id, text) {
    currentId = id;
    cuAction.innerHTML = text;
}
function editTodo(id) {
    const todo = list.find(t => t.id = id);
    if (todo) {
        name.value = todo.name;
        email.value = todo.email;
        updateValues(id, 'Update');
    }
}
function deleteTodo(id) {
    list = list.filter(todo => todo.id !== id);
    buildTBody();
}