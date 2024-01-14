import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "../ui/button";

type TodoFilterProps = {
  setPriority: React.Dispatch<React.SetStateAction<string>>;
};

const TodoFilter = ({ priority, setPriority }: TodoFilterProps) => {
  const [position, setPosition] = useState("bottom");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={setPosition}
        >
          <DropdownMenuRadioItem
            onClick={() => setPriority("high")}
            value="high"
          >
            High
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => setPriority("medium")}
            value="medium"
          >
            Medium
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => setPriority("low")}
            value="low"
          >
            Low
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoFilter;
