"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProjectModal } from "@/hooks/use-project-modal";
import { projectSchema } from "@/lib/validations/project";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { projectTypes } from "@/constants/project";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { toast } from "sonner";
import { addProject, updateProject } from "@/actions/projects";
import { useEffect, useState } from "react";

export const ProjectModal = () => {
  const { project, type, isOpen, onClose } = useProjectModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project ? project.title : "",
      description: project ? project.description : "",
      type: project ? project.type : "",
      startDate: project ? project.startDate : new Date(),
      endDate: project
        ? project.endDate
        : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    },
  });

  useEffect(() => {
    if (project) {
      form.setValue("title", project.title);
      form.setValue("description", project.description);
      form.setValue("type", project.type);
      form.setValue("startDate", project.startDate);
      form.setValue("endDate", project.endDate);
    } else {
      form.reset();
    }
  }, [form, project]);

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    try {
      setLoading(true);
      if (type === "Add") {
        await addProject(values);
        toast.success("Project added successfully");
      } else if (type === "Update" && project) {
        await updateProject(project.id, values);
        toast.success("Project updated successfully");
      }
      form.reset();
      onClose();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type} Project</DialogTitle>
          <DialogDescription>
            {type === "Add" && "Add a new project here."} Click {type} when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project's type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((projectType) => (
                          <SelectItem key={projectType} value={projectType}>
                            {projectType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="flex items-center justify-center"
                          variant="outline"
                        >
                          {format(field.value, "PPP")}
                          <CalendarIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          required
                          disabled={{ before: new Date() }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="flex items-center justify-center"
                          variant="outline"
                        >
                          {format(field.value, "PPP")}
                          <CalendarIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          required
                          disabled={{
                            before: new Date(
                              new Date().getTime() + 24 * 60 * 60 * 1000
                            ),
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className="w-full mt-4" type="submit">
              {type} Project
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
