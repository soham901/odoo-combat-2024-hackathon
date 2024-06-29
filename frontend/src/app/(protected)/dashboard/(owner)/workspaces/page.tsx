import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [
  {
    id: 1,
    title: "Project A",
    description: "This is an amazing project",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: "Project B",
    description: "This is an amazing project",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    title: "Project C",
    description: "This is an amazing project",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function Projects() {
  return (
    <div className="">
      <div className="space-y-4">
        <div className="text-2xl font-semibold">
          Projects ({projects.length})
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              {/* <CardContent></CardContent> */}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
