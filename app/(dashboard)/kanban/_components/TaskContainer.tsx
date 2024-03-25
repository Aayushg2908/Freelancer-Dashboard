"use client";

import { updateTaskInSameStatus } from "@/actions/tasks";
import { Button } from "@/components/ui/button";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { cn } from "@/lib/utils";
import { tasks } from "@/lib/validations/task";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Task } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TaskContainerProps {
  tasksArray: Task[][];
}

const getStatusIndex = (status: string) => {
  if (status === "TODO") return 0;
  if (status === "DOING") return 1;
  if (status === "DONE") return 2;
  return -1;
};

export const TaskContainer = ({ tasksArray }: TaskContainerProps) => {
  const { onOpen } = useDeleteModal();

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "task") {
      if (source.droppableId === destination.droppableId) {
        const status = source.droppableId;
        const indexOfTaskStatus =
          status === "TODO" ? 0 : status === "DOING" ? 1 : 2;
        const requiredTaskArray = tasksArray[indexOfTaskStatus];
        const [removed] = requiredTaskArray.splice(source.index, 1);
        requiredTaskArray.splice(destination.index, 0, removed);
        requiredTaskArray.forEach((task, index) => {
          task.order = index;
        });
        const updatedTasks = await updateTaskInSameStatus(
          requiredTaskArray,
          status
        );
        if (updatedTasks) {
          toast.success("Task reordered successfully");
        }
      } else {
        const sourceStatus = source.droppableId;
        const destinationStatus = destination.droppableId;
        const sourceTaskStatus = getStatusIndex(sourceStatus);
        const destinationTaskStatus = getStatusIndex(destinationStatus);
        if (sourceTaskStatus === -1 || destinationTaskStatus === -1) return;
        const sourceTaskArray = tasksArray[sourceTaskStatus];
        const destinationTaskArray = tasksArray[destinationTaskStatus];
        const [removed] = sourceTaskArray.splice(source.index, 1);
        destinationTaskArray.splice(destination.index, 0, removed);
        destinationTaskArray.forEach((task, index) => {
          task.order = index;
        });
        await updateTaskInSameStatus(destinationTaskArray, destinationStatus);
        toast.success("Task reordered successfully");
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ol className="grid grid-cols-1 gap-y-4 md:gap-x-2 md:grid-cols-3">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="mt-6 flex-1 min-h-[400px] bg-slate-50 dark:bg-neutral-800 rounded-md p-4"
          >
            <div className="flex gap-x-2 items-center">
              <p
                className={cn(
                  "w-[15px] h-[15px]  rounded-full",
                  index === 0 && "bg-orange-600",
                  index === 1 && "bg-green-600",
                  index === 2 && "bg-blue-600"
                )}
              />
              <div className="flex items-center gap-2 font-semibold text-xl">
                <p>{task}</p>
                <p className="text-xl">
                  (<span className="px-0.5">{tasksArray[index].length}</span>)
                </p>
              </div>
            </div>
            <Droppable droppableId={task} type="task">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-y-2 py-0.5 px-1 mx-1"
                >
                  <div className="mt-4">
                    {tasksArray[index].map((task, index) => (
                      <Draggable
                        key={index}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-white dark:bg-black mt-2 flex justify-between items-center border dark:border-neutral-700 p-1 rounded-lg"
                          >
                            <div className="ml-2">{task.content}</div>
                            <Button
                              onClick={() => onOpen(task.id, "task")}
                              variant="secondary"
                              size="icon"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </ol>
              )}
            </Droppable>
          </li>
        ))}
      </ol>
    </DragDropContext>
  );
};
