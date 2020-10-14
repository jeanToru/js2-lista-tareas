//
// Lista de tareas
//

//
// Modelo.
//

// Contador de tareas (para asignar un id único a cada tarea).
let contador = 0;
// Lista de tareas (Array).
let tareas = [];

const dataLocal = localStorage.getItem("tareas");

if (dataLocal) {
    tareas = JSON.parse(dataLocal);
}
// Se lee el contador de tareas del localStorage.
const contadorLocalStorage = localStorage.getItem('contador');
console.log(contadorLocalStorage);

console.log(tareas);

if (contadorLocalStorage) {
    contadorTareas = parseInt(contadorLocalStorage);
}

// addTask(): Agrega una tarea en la lista.
function addTasks(nombreTarea, fechaTarea, completoTarea) {
    // Crea un objeto que representa la nueva tarea.
    const miTarea = {
        id: contador,
        nombre: nombreTarea,
        completo: completoTarea,
        fecha: fechaTarea,
    };

    // Agrega el objeto en el array.
    tareas.push(miTarea);
    // Incrementa el contador de tareas.
    contador++;
    console.log(contador);
    // Se guarda el contador de tareas en localStorage.
    localStorage.setItem('contador', contador);

    // Se despliega la nueva tarea en el DOM.
    appendTaskDOM(miTarea);

    localStorage.setItem("tareas", JSON.stringify(tareas));

    console.log(tareas);
}


// taskStatus(): Actualiza el estado de una tarea.
function taskStatus(id, complete) {
    // Recorre la lista de tareas.
    for (let i = 0; i < tareas.length; i++) {
        // Cuando encuentra la tarea con el id correcto cambia su estado.
        if (tareas[i].id === id) {
            tareas[i].completo = complete;
            console.log(tareas[i]);
            break;
        }
    }
    // Guarda la lista de tareas en localStorage.
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// deleteTask(): Borra una tarea.
function deleteTask(id) {
    // Recorre la lista de tareas.
    for (let i = 0; i < tareas.length; i++) {
        // Cuando encuentra la tarea con el id correcto la borra.
        if (tareas[i].id === id) {
            tareas.splice(i, 1);
            break;
        }
    }
    // Guarda la lista de tareas en localStorage.
    localStorage.setItem('tareas', JSON.stringify(tareas));
}


//
// Vista.
//

// Lista de tareas (DOM).
const lista = document.getElementById("task-list");

function appendTaskDOM(tarea) {
    // Item de la lista
    const item = document.createElement("li");
    item.className = "task-list__item";
    // Checkbox.
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `tarea-${tarea.id}`);
    // Label.
    const label = document.createElement("label");
    label.setAttribute("for", `tarea-${tarea.id}`);
    label.innerHTML = `${tarea.nombre} - ${tarea.fecha}`;
    checkbox.checked = tarea.completo;

    // Botón de borrar.
    const buttonDelete = document.createElement("button");
    buttonDelete.className = "task-list__delete";
    buttonDelete.setAttribute("id", `delete-${tarea.id}`);
    buttonDelete.innerHTML = "Borrar";
    // Se agregan elementos.
    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(buttonDelete);
    lista.appendChild(item);

    checkbox.addEventListener("click", (event) => {
        const complete = event.currentTarget.checked;
        const itemId = event.currentTarget.getAttribute('id');
        const taskId = parseInt(itemId.substring(6));
        taskStatus(taskId, complete);
    });
    buttonDelete.addEventListener("click", (event) => {
        const itemId = event.currentTarget.getAttribute('id');
        const taskId = parseInt(itemId.substring(7));
        deleteTask(taskId);
        // Borra la tarea en el DOM.
        event.currentTarget.parentNode.remove();
    });
}

for (let i = 0; i < tareas.length; i++) {
    appendTaskDOM(tareas[i]);
}

//
// Controlador.
//

// Formulario para añadir tareas.
const formulario = document.getElementById("new-task-form");

// Event handler para el evento 'submit' del formulario.
// Crea una nueva tarea.
formulario.addEventListener("submit", (event) => {
    // Se cancela el comportamiento default del formulario.
    event.preventDefault();

    // Agrega el nuevo ítem (modelo).
    const tarea = addTasks(
        formulario.elements[0].value,
        formulario.elements[1].value,
        false
    );
    // Se despliega la nueva tarea en el DOM.

    // Reseteamos ambos form.
    formulario.elements[0].value = "";
    formulario.elements[1].value = "";
});
