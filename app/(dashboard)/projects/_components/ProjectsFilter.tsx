"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectTypes } from "@/constants/project";

export const ProjectsFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState<any>(
    searchParams.get("type") ? searchParams.get("type") : ""
  );

  const handleChange = (value: string) => {
    setValue(value);
    router.push(`/projects?type=${value}`);
  };

  return (
    <div className="w-full justify-end flex gap-x-3 items-center">
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-full md:w-fit">
          <SelectValue placeholder="Filter projects by type" />
        </SelectTrigger>
        <SelectContent className="w-full">
          {projectTypes.map((projectType) => (
            <SelectItem
              className="cursor-pointer"
              key={projectType}
              value={projectType}
            >
              {projectType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <Button
          onClick={() => {
            setValue("");
            router.push("/projects");
          }}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LuX className="h-[13px] w-[13px] mt-[2px]" />
        </Button>
      )}
    </div>
  );
};
