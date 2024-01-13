import { Button } from "../ui/button";

const TodoCard = () => {
  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input
        type="checkbox"
        name=""
        id=""
      />
      <p className="font-semibold">Todo Title</p>
      <p>Time</p>
      <p>Description</p>
      <div className="space-x-5">
        <Button className="bg-red-500">Delete</Button>
        <Button className="bg-[#5C53FE]">Edit</Button>
      </div>
    </div>
  );
};

export default TodoCard;
