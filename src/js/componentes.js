import { Todo } from '../classes';
import { todoList } from '../index'
import '../css/componentes.css';

//TODO: Funciones modulares
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrarT    = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const spTareasP     = document.querySelector('.todo-count');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    // el div se una con hack como contenedor del HTML
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    // aqui el div se desecha solo se inyecta el HTML
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
};

const updateTareasPendientes = () => {
    let count = 0;
    for( const todo of todoList.todos ){
        if( !todo.completado ) {
            count++;
        }
    }
    spTareasP.firstChild.innerHTML = count;
}

txtInput.addEventListener('keyup', ( event ) => {
    // 13 es el enter
    // no aceptar cadenas vacias
    if( event.keyCode === 13 && txtInput.value.length > 0){
        //creamos elementos html y agregaremos a la lista
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
        updateTareasPendientes();
    }
});


divTodoList.addEventListener('click', (event) => {
    //obtener el nombre del evento para hacer la acción
    const nombreElemento = event.target.localName;
    //se necesita ele elemento para poder borrarlo si se presiona la x
    const todoElemento   = event.target.parentElement.parentElement;
    //tomamos el id del elemento
    const todoId         = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ){
        //click en el check
        todoList.marcarCompletado( todoId );
        //alterna entre completed o vacio en el html
        todoElemento.classList.toggle('completed');
    } else if( nombreElemento.includes('button') ){
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
    updateTareasPendientes();
});

btnBorrarT.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    //filtrar el undefined
    if ( !filtro ){ return; }

    //es para mover el cuadro visual que indica que filtro esta seleccionado
    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){
        //la siguiente instrucción ayuda para aplicar el filtro mostrar Todos
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});