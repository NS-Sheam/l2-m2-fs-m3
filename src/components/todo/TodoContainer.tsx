import { AddTodoModal } from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useState } from "react";
import { TTodo, useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
  // from state
  // const { todos } = useAppSelector((state) => state.todos);
  // from server
  const [priority, setPriority] = useState("");
  const { data } = useGetTodosQuery(priority);
  const todos: TTodo[] = data?.data;

  const priorityTask = todos?.filter((item) => item.priority === priority);
  const remainingTask = todos?.filter((item) => item.priority !== priority);
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
        {!todos?.length && (
          <div className="bg-white p-5 text-2xl font-bold flex justify-center items-center">
            <p>There is no task pending</p>
          </div>
        )}
        <div className="bg-white p-5 w-full h-full rounded-xl space-y-3">
          {priorityTask?.map((item: TTodo) => (
            <TodoCard
              key={item?._id}
              {...item}
            />
          ))}
          {remainingTask?.map((item) => (
            <TodoCard
              key={item?._id}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
