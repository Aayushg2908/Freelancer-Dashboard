import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Project } from "@prisma/client";
import { ProjectActions } from "./ProjectActions";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  console.log(project.startDate);
  console.log(project.endDate);

  return (
    <Card className="hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{project.title}</CardTitle>
          <ProjectActions project={project} />
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <Separator className="w-full" />
      <CardContent className="mt-4">
        <div className="flex flex-col gap-y-4">
          <div className="flex lg:flex-col lg:gap-y-2 xl:gap-y-0 xl:flex-row gap-x-2">
            <div className="w-full flex flex-col gap-y-2">
              Start Date
              <Badge className="text-center rounded-sm">
                {new Date(project.startDate).toLocaleDateString()}
              </Badge>
            </div>
            <div className="w-full flex flex-col gap-y-2">
              End Date
              <Badge className="text-center rounded-sm">
                {new Date(project.endDate).toLocaleDateString()}
              </Badge>
            </div>
          </div>
          <Separator className="w-full" />
          <div className="flex flex-col gap-y-2">
            Project Type
            <Badge className="text-center rounded-sm">{project.type}</Badge>
          </div>
          <Separator className="w-full" />
          <div className="flex justify-between items-center">
            Project Status
            {project.endDate <= new Date() ? (
              <Badge variant="success" className="text-center rounded-sm">
                Completed
              </Badge>
            ) : project.startDate > new Date() ? (
              <Badge variant="warning" className="text-center rounded-sm">
                Not started yet
              </Badge>
            ) : (
              <Badge variant="danger">
                {Math.ceil(
                  (new Date(project.endDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) === 1
                  ? "1 Day remaining"
                  : `${Math.ceil(
                      (new Date(project.endDate).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )} Days remaining`}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
