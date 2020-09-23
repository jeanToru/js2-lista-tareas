//
// Lista de tareas
//

let contador = 0;
const formulario = document.getElementById('new-task-form');
const listaTarea = document.getElementById('task-list');

formulario.addEventListener('submit', (event) => {
    // Se cancela el comportamiento default del formulario.
    event.preventDefault();
    // Texto introducido por el usuario.
    console.log(formulario.elements[0].value);
    // Creamos los li
    const item = document.createElement('li');
    item.className = 'task-list_item';
    // checkbox
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `tarea-${contador}`);
    // Label
    const label = document.createElement('label');
    label.setAttribute('for', `tarea-${contador}`);
    label.innerHTML = formulario.elements[0].value;
    item.appendChild(checkbox);
    item.appendChild(label);
    listaTarea.appendChild(item);
    
    const miTarea = {
        id: contador,
        nombre: formulario.elements[0].value,
        completado: false,

    }
    console.log(miTarea);
    formulario.elements[0].value = '';
    contador++
})


