import { useAppSelector } from "@/redux/hook";
import { AddTodoModal } from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useState } from "react";

const TodoContainer = () => {
  const { todos } = useAppSelector((state) => state.todos);
  const [priority, setPriority] = useState("high");
  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal
          id={null}
          modalTitle="Add Todo"
          modalDescription="Add todo as you want..."
        />
        <TodoFilter setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        {/* <div className="bg-white p-5 text-2xl font-bold flex justify-center items-center">
          <p>There is no task pending</p>
        </div> */}
        <div className="bg-white p-5 w-full h-full rounded-xl space-y-3">
          {todos
            .filter((item) => item.priority === priority)
            .map((item) => (
              <TodoCard
                key={item.id}
                {...item}
              />
            ))}
          {todos
            .filter((item) => item.priority !== priority)
            .map((item) => (
              <TodoCard
                key={item.id}
                {...item}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
