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

  // Retorna la nueva tarea que se añadió a la lista.
  return miTarea;
}

//
// Vista.
//

// Lista de tareas (DOM).
const lista = document.getElementById('task-list');

function appendTaskDOM(tarea) {
  // Item de la lista
  const item = document.createElement('li');
  item.className = 'task-list__item';
  // Checkbox.
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', `tarea-${tarea.id}`);
  // Label.
  const label = document.createElement('label');
  label.setAttribute('for', `tarea-${tarea.id}`);
  label.innerHTML = `${tarea.nombre} - ${tarea.fecha}`;
  // Se agregan elementos.
  item.appendChild(checkbox);
  item.appendChild(label);
  lista.appendChild(item);
}

//
// Controlador.
//

// Formulario para añadir tareas.
const formulario = document.getElementById('new-task-form');

// Event handler para el evento 'submit' del formulario.
// Crea una nueva tarea.
formulario.addEventListener('submit', (event) => {
  // Se cancela el comportamiento default del formulario.
  event.preventDefault();

  // Agrega el nuevo ítem (modelo).
  const tarea = addTasks(formulario.elements[0].value, formulario.elements[1].value, false);
  // Se despliega la nueva tarea en el DOM.
  appendTaskDOM(tarea);

  // Reseteamos ambos form.
  formulario.elements[0].value = '';
  formulario.elements[1].value = '';
})