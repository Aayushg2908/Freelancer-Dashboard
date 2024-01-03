import { getTaskByStatus } from "@/actions/tasks";
import { AddTaskButton } from "./_components/AddTaskButton";
import { TaskContainer } from "./_components/TaskContainer";

const KanbanPage = async () => {
  const todoTasks = await getTaskByStatus("TODO");
  const doingTasks = await getTaskByStatus("DOING");
  const doneTasks = await getTaskByStatus("DONE");

  const tasks = [todoTasks, doingTasks, doneTasks];

  return (
    <div className="m-6 flex flex-col">
      <div className="text-center md:text-start font-semibold text-4xl sm:text-5xl tracking-tight">
        Kanban
      </div>
      <AddTaskButton />
      <TaskContainer tasksArray={tasks} />
    </div>
  );
};

export default KanbanPage;
