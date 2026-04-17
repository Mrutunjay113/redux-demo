"use client";

import { useState } from "react";
import { addTodo, removeTodo, updateTodo } from "@/features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash } from "lucide-react";
export default function Home() {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      dispatch(updateTodo({ id: editingId, text }));
      setEditingId(null);
    } else {
      dispatch(addTodo(text));
    }
    setText("");
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setText(todo.text);
  };
  return (
    <div className="flex flex-col max-w-md mx-auto items-center justify-center h-screen p-4 gap-4">
      <form
        onSubmit={submitHandler}
        className="flex flex-row items-center justify-center gap-2 w-full"
      >
        <Input
          placeholder={editingId !== null ? "Update todo" : "Add a todo"}
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full"
        />
        <Button type="submit">
          {editingId !== null ? "Update" : "Add"}
        </Button>
      </form>
      <ScrollArea className="h-[calc(100vh-500px)] min-w-48 w-full rounded-md border p-4">
        {todos.map((todo) => (
          <Item
            key={todo.id}
            variant="outline"
            size="sm"
            className="w-full px-2 py-1 first:my-0 my-2 last:mb-0 hover:bg-primary/10"
          >
            <ItemContent>
              <ItemTitle>{todo.text}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button
                size="icon"
                variant="ghost"
                type="button"
                aria-label="Edit todo"
                onClick={() => startEdit(todo)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                type="button"
                aria-label="Delete todo"
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                  if (editingId === todo.id) {
                    setEditingId(null);
                    setText("");
                  }
                }}
              >
                <Trash className="text-destructive" />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ScrollArea>
    </div>
  );
}
