import * as React from "react";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "./button";

export const Logout: React.FC = () => {
  return (
    <Button asChild>
      <Link href="/logout">
        <LogOut className="mr-2 h-4 w-4" />
        LogOut
      </Link>
    </Button>
  );
};
