import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = ( initialState=[] ) => {

    // useReducer: TODOS
    const [ todos, dispatch ] = useReducer(todoReducer, initialState, init);

    // useEffect: Se ejecutara cuando el estado 'todos' cambie.
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [ todos ])
    
    // method: Agregar nuevo Todo
    const handlerAddTodo = ( todo ) => {

        // Action
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        
        // Disparando / Despechando
        dispatch( action )
    }

    // method: Eliminar un Todo por ID
    const handlerDeleteTodo = ( id ) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }

        dispatch( action )
    }

    // method: Cambiar la propiedad 'done' ( true / false )
    const handlerToggleTodo = ( id ) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }

        dispatch( action ) 
    }

    return({
        todos,
        handlerAddTodo,
        handlerDeleteTodo,
        handlerToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done ).length
    })

}