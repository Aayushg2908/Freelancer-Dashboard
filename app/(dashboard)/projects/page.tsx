import { getProjects } from "@/actions/projects";
import { ProjectModalButton } from "./_components/ProjectModalButton";
import { ProjectCard } from "./_components/ProjectCard";
import { ProjectsFilter } from "./_components/ProjectsFilter";

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: { type: string | undefined };
}) => {
  const projects = await getProjects(searchParams.type);

  return (
    <div className="m-6 flex flex-col">
      <div className="text-center md:text-start font-semibold text-4xl sm:text-5xl tracking-tight">
        Projects
      </div>
      <div className="flex flex-col justify-center md:flex-row md:justify-between items-center gap-y-2">
        <ProjectModalButton />
        <ProjectsFilter />
      </div>
      {projects.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-4 w-full flex flex-col items-center">
          <div className="font-bold text-4xl tracking-tight">
            No Projects found
          </div>
          <div className="text-muted-foreground">
            Start be creating some projects...
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
