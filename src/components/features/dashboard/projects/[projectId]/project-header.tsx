import { Calendar, Code2 } from "lucide-react";
import { Category, DevSession, Technology } from "@/generated";
import { DeleteButtonWithConfirmation } from "../../button/delete-button-with-confirmation";
import { Badge } from "@/components/ui/badge";
import { ManageCategoryDialog } from "./manage-category-dialog";
import { ManageTechnologyDialog } from "./manage-technology-dialog";

type ProjectHeaderProps = {
  projectName: string;
  projectId: string;
  createdAt: Date;
  lastSession: DevSession | null;
  technologies: Technology[];
  categories: Category[];
};

export const ProjectHeader = async ({
  projectName,
  projectId,
  createdAt,
  lastSession,
  technologies,
  categories,
}: ProjectHeaderProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">{projectName}</h1>
        <DeleteButtonWithConfirmation
          name={projectName}
          projectId={projectId}
        />
      </div>

      <div className="flex items-center gap-6 p-2">
        <p className="text-sm inline-flex items-center gap-2">
          <Calendar className="size-5" /> Created at{" "}
          {createdAt.toLocaleDateString()}
        </p>
        {lastSession && (
          <p className="text-sm inline-flex items-center gap-2">
            <Code2 className="size-5" />
            Last session at {lastSession.startedAt.toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="space-y-4">
        {/* Categories */}
        <div className="flex items-center gap-2">
          {categories.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              Categories:
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <Badge variant={"outline"} key={cat.id}>
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <ManageCategoryDialog
            projectId={projectId}
            projectCategories={categories}
          />
        </div>

        {/* Technologies */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            Technologies:
            {technologies.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                {technologies.map((tech) => (
                  <Badge
                    variant={"outline"}
                    key={tech.id}
                    className="border-primary"
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p>Add technology</p>
            )}
          </div>
          <ManageTechnologyDialog
            projectId={projectId}
            projectTechnologies={technologies}
          />
        </div>
      </div>
    </div>
  );
};
