const API_URL = process.env.PUBLIC_API_URL;
///import { PUBLIC_API_URL } from '@env';

import sleep from 'sleep-promise';
export interface Todos {
    id: number;
    text: string;
    done: boolean;
};

export const getTodos = async () => {
    await sleep(2000);
 
    const response = await fetch('http://192.168.1.2:3001/todos');
    //console.log("aip,", API_URL)
    
    const result = await response.json();
    return result;
}

export const createTodo = async (text: string): Promise<Todos> => {
    const todo = {
        text,
        done: false
    }
    const result = await fetch(`http://192.168.1.2:3001/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    })
    return result.json(); 
}

export const updateTodo =async (todo: Todos): Promise<Todos> => {
    const result = await fetch(`http://192.168.1.2:3001/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    }
    )
    return result.json(); 
}

export const deleteTodo =async (id: number): Promise<Todos> => {
    const result = await fetch(`http://192.168.1.2:3001/todos/${id}`, {
        method: 'DELETE',
    }
    )
    return result.json();  
}

export const getTodoById =async (id: number): Promise<Todos> => {
    const result = await fetch(`http://192.168.1.2:3001/todos/${id}`)
    return result.json();  
}