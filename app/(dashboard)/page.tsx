import {
  getAllClients,
  getAllEvents,
  getAllProjects,
  getAllTasks,
} from "@/actions/home";
import { TbListCheck } from "react-icons/tb";
import { AiOutlineCalendar } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { ImFilesEmpty } from "react-icons/im";
import { HomeCard } from "./_components/HomeCard";
import ProjectTypesBarChart from "./_components/ProjectTypesBarChart";
import ClientsSource from "./_components/ClientsSource";

export default async function Home() {
  const { projects, barChartArray } = await getAllProjects();
  const { clients, donutChartArray } = await getAllClients();
  const tasks = await getAllTasks();
  const events = await getAllEvents();

  const cardData = [
    {
      title: "Total Tasks",
      amount: tasks.length,
      description: "Number of all the tasks you have",
      icon: TbListCheck,
    },
    {
      title: "Total Events",
      amount: events.length,
      description: "Number of all the events you have",
      icon: AiOutlineCalendar,
    },
    {
      title: "Total Clients",
      amount: clients.length,
      description: "Number of all the clients you have",
      icon: GoPeople,
    },
    {
      title: "Total Projects",
      amount: projects.length,
      description: "Number of all the projects you have",
      icon: ImFilesEmpty,
    },
  ];

  return (
    <div className="m-6 flex flex-col">
      <div className="text-center md:text-start font-semibold text-4xl sm:text-5xl tracking-tight">
        Dashboard
      </div>
      <div className="mt-6 grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-5">
        {cardData.map((card, index) => (
          <HomeCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            amount={card.amount}
          />
        ))}
      </div>
      <div className="flex flex-col gap-5 my-5">
        <ProjectTypesBarChart chartData={barChartArray} />
        <ClientsSource chartData={donutChartArray} />
      </div>
    </div>
  );
}
