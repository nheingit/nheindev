import * as React from "react";

import { Input } from "./input";
import { Microscope } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="flex items-center">
      <Input className="mr-4" placeholder="Search..." />
      <Microscope className="text-red-500" />
    </div>
  );
};
