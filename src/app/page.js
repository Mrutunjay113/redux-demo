"use client";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { decrement, increment } from "@/features/count/countSlice";
import Todo from "@/components/todo";

export default function Page() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  console.log(todos);
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-md mx-auto w-full  gap-4">
      {/* <p>Count: {count}</p>
      <div className="flex flex-row items-center justify-center gap-2">
        <Button size="icon" onClick={() => dispatch(increment())}>
          <Plus />
        </Button>
        <Button size="icon" onClick={() => dispatch(decrement())}>
          <Minus />
        </Button>
      </div> */}
      <Todo />
    </div>
  );
}
