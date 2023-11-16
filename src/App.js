import React, { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const [inputValue, setInputValue] = useState("");

  const filteredItems = useMemo(() => {
    if (filter === 'active') {
      return items.filter(item => {
        return !item.isCompleted;
      })
    } else if (filter === 'completed') {
      return items.filter(item => {
        return item.isCompleted;
      })
    } else {
      return items;
    }
  }, [items, filter])

  return (
    <div class="container">
      <input
        type="text"
        id="todo-input"
        placeholder="할 일 추가"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <button id="add-todo" onClick={() => {
        setItems([
          ...items,
          {
            id: items.length,
            content: inputValue,
            isCompleted: false,
          },
        ]);
        // 초기화
        setInputValue("");
      }}
      >추가</button>
      <div class="spacing-10"></div>
      <div class="filters">
        <button id="filter-all" onClick={() => {
          setFilter("all")
        }}>전체</button>
        <button id="filter-active" onClick={() => {
          setFilter("active")
        }}>진행 중</button>
        <button id="filter-completed" onClick={() => {
          setFilter("completed")
        }}>완료됨</button>
      </div>
      <ul id="todo-list">
        {filteredItems.map((item, index) => {
          return (
            <li
              key={item.id}
              style={{
                textDecoration: item.isCompleted ? "line-through" : "none"
              }}
              onClick={() => {
                const newItems = [...items];
                newItems[index].isCompleted = !newItems[index].isCompleted;
                setItems(newItems);
              }}
            >{item.content}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
