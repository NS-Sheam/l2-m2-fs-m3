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
// import { addTodo, updateTodos } from "@/redux/features/todoSlice";
import { FormEvent, useState } from "react";
import { TTodo, useAddTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "@/redux/api/api";
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectContent, SelectLabel } from "@radix-ui/react-select";

type TAddTodoModalProps = {
  id: string | null;
  modalTitle: string;
  modalDescription: string;
  children?: React.ReactNode;
};

export function AddTodoModal({ id, modalTitle, modalDescription, children }: TAddTodoModalProps) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  // From local state
  // const { todos } = useAppSelector((state) => state.todos);
  const { data } = useGetTodosQuery("");
  const todos: TTodo[] = data?.data;
  // From server
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const todo = todos?.find((item) => item._id === id);

  const [priority, setPriority] = useState("");

  // const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!id) {
      const taskDetails = { title: task, description, priority, isCompleted: false };
      // For local state
      // dispatch(addTodo(taskDetails));
      // For server
      addTodo(taskDetails);
    } else {
      updateTodo({
        id,
        data: {
          title: task || todo?.title,
          description: description || todo?.description,
          priority: priority || todo?.priority,
          isCompleted: todo?.isCompleted,
        },
      });
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Priority</Label>
              <Select
                defaultValue={todo?.priority}
                onValueChange={(value) => setPriority(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
