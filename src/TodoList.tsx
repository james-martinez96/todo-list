import { useState, useEffect } from "react";
// import deleteSVG from './assets/icons8-x-64.png'

interface Item  {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([])
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

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
    saveTodos(newTodos)
  }

  const handleReset = () => {
    localStorage.clear()
    setTodos([])
  }

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault()
    const newTodo: Item = {id: Date.now(), text: input, completed: false}
    setTodos([ ...todos, newTodo ])
    saveTodos([ ...todos, newTodo ])
    setInput("")
    console.log(newTodo)
    console.log(todos)
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    } else {
      setTodos([]) // Set todos to an empty array if there are no todos in local storage
    }
  }, [])

  return <div className='main-container'>
    <h1>Todo List</h1>
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span
            onClick={() => handleToggle(todo.id)}
            style={{textDecoration: todo.completed ? "line-through" : "none"}}
          >
            {todo.text}
          </span>
          <button
            className='deleteButton'
            onClick={() => handleDelete(todo.id)}
          >  
            {/* <img className='deleteButton' src={deleteSVG} alt='delete' /> */}
            Delete
          </button>
        </li>
      ))}
    </ul>
    <form>
      <input
        className='input'
        type='text'
        placeholder='Add todo item'
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <button
        className='addButton'
        type='submit'
        onClick={handleClick}
      >
        Add
      </button>
      <button
        className="resetButton"
        type="reset"
        onClick={handleReset}
      >
        Clear
      </button>
    </form>
  </div>
}
