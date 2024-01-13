import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTodo, updateTodos } from "@/redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { FormEvent, useState } from "react";
import TodoFilter from "./TodoFilter";

type TAddTodoModalProps = {
  id: string | null;
  modalTitle: string;
  modalDescription: string;
  children?: React.ReactNode;
};

export function AddTodoModal({ id, modalTitle, modalDescription, children }: TAddTodoModalProps) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const { todos } = useAppSelector((state) => state.todos);
  const todo = todos?.find((item) => item.id === id);
  const [priority, setPriority] = useState(todo?.priority || "low");

  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!id) {
      const taskDetails = { title: task, description, id: Math.random().toString(32).substring(2, 7), priority };
      dispatch(addTodo(taskDetails));
    } else {
      const taskDetails = { title: task, description, id, priority };
      dispatch(updateTodos(taskDetails));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!children ? (
          <Button className="bg-primary-gradient text-xl  font-semibold">Add Todo</Button>
        ) : (
          <Button className="bg-[#5C53FE]">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="task"
                className="text-right"
              >
                Task
              </Label>
              <Input
                onBlur={(e) => setTask(e.target.value)}
                defaultValue={todo?.title}
                id="task"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="description"
                className="text-right"
              >
                Description
              </Label>
              <Input
                onBlur={(e) => setDescription(e.target.value)}
                defaultValue={todo?.description}
                id="description"
                className="col-span-3"
              />
            </div>
            <TodoFilter setPriority={setPriority} />
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
