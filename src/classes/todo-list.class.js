import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        
        this.cargarLocalStorage();

    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {

        //regresara un nuevo arreglo sin el element con id
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        for( const todo of this.todos ){
            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    cargarLocalStorage() {
        this.todos = ( localStorage.getItem('todo') ) 
                    ? JSON.parse(localStorage.getItem('todo')) 
                    : [];

        this.todos = this.todos.map( Todo.fromJson );
        //map() retorna un arreglo con sus elementos ya mutados
    }


    //localstorege solo sirve para el front end
    //localstorage si persiste aunque se reinicie la pc
    //al momento no posee tiempo de expiracion
    //solo puede gardar strings y ya
    //al regresar el JSON del local storage a objeto nuevamente
    // es que son objetos genericos, se ocupa arreglar con map
    // de esta forma ya no pierdes la estructura del objeto
}