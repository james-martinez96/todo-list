import { useState, useEffect } from "react";

interface Item  {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([
    // temp values
    // {id: 1, text: "learn typescript", completed: false},
    // {id: 2, text: "test", completed: false},
  ])
  const [input, setInput] = useState<string>("");

  const saveTodos = (todos: Item[]) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleToggle = (id: number) => {
  setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    )
  }

  const handleClick = () => {
    const newTodo: Item = {id: Date.now(), text: input, completed: false}
    setTodos([ ...todos, newTodo ])
    saveTodos([ ...todos, newTodo ])
    console.log(newTodo)
    console.log(todos)
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  return <div className='main-container'>
    <h1>Todo List</h1>
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => handleToggle(todo.id)}
          style={{textDecoration: todo.completed ? "line-through" : "none"}}
        >
          {todo.text}
        </li>
      ))}
    </ul>
    <input
      type='text'
      placeholder='Add todo item'
      onChange={(e) => setInput(e.currentTarget.value)}
    />
    <button onClick={handleClick}>Add</button>
  </div>
}
