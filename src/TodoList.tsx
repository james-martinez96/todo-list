import { useState, useEffect } from "react";

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Item | null>(null);
  const saveTodos = (todos: Item[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleToggle = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    console.log(updatedTodos);
  };

  const handleEdit = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditingTodo(todo || null);
  };

  const handleUpdate = (id: number, text: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodo(null);
    saveTodos(updatedTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const handleReset = () => {
    localStorage.clear();
    setTodos([]);
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo: Item = { id: Date.now(), text: input, completed: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setInput("");
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos([]);
    }
  }, []);

  return (
    <div className="main-container">
      <h1 className="Card">Todo List</h1>
      <ul className="Card-Grid">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {editingTodo?.id === todo.id ? (
              <input
                type="text"
                value={editingTodo.text}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    text: e.currentTarget.value,
                  })
                }
                onBlur={() => handleUpdate(todo.id, editingTodo.text)}
              />
            ) : (
              <span onClick={() => handleToggle(todo.id)}>
                <p>{todo.text}</p>
              </span>
            )}
            <div>
              <button
                className="editButton"
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </button>
              <button
                className="deleteButton"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form className="Card">
        <input
          className="input"
          type="text"
          placeholder="Add todo item"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button className="addButton" type="submit" onClick={handleClick}>
          Add
        </button>
        <button className="resetButton" type="reset" onClick={handleReset}>
          Clear
        </button>
      </form>
    </div>
  );
};
