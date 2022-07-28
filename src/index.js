import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';
import './styles.css';

//TODO: Código principal
export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );
//todo => crearTodoHtml(todo) === crearTodoHtml
//solo funciona con un solo argumento