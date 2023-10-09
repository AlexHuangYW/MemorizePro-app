const API_URL = process.env.PUBLIC_API_URL;

interface Todos {
    id: number;
    text: string;
    done: boolean;
};

export const getTodos = async () => {
    const response = await fetch(`${API_URL}/todos`);
    const result = await response.json();
    return result;
}