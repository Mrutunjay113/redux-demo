"use client";

import { useState } from "react";
import { addTodo, removeTodo } from "@/features/todo/todoSlice";
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
import { Trash } from "lucide-react";
export default function Home() {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText("");
  };
  return (
    <div className="flex flex-col max-w-md mx-auto items-center justify-center h-screen p-4 gap-4">
      <form
        onSubmit={addTodoHandler}
        className="flex flex-row items-center justify-center gap-2 w-full"
      >
        <Input
          placeholder="Add a todo"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full"
        />
        <Button type="submit">Add</Button>
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
                onClick={() => dispatch(removeTodo(todo.id))}
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
