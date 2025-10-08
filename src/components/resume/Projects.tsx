import { Card, CardContent } from '@/components/ui/card'

interface Project {
  name: string
  description: string
  url: string
}

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <div className="space-y-2">
      <Card>
        <CardContent>
          <ul className="list-disc pl-6 pt-6 space-y-1 text-sm">
            {projects.map((project, index) => (
              <li key={index}>
                <span className="font-medium">{project.name}:</span> {project.description} — <a className="underline" href={project.url} target="_blank" rel="noreferrer">{project.url}</a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
