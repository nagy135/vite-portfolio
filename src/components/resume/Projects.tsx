import { Card, CardContent } from '@/components/ui/card'

interface Project {
  name: string
  description: string
  url: string
  video?: string
  videoDescription?: string
}

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <div className="space-y-2">
      <Card>
        <CardContent>
          <ul className="list-disc pl-6 pt-6 space-y-3 text-sm">
            {projects.map((project, index) => (
              <li key={index}>
                <div>
                  <span className="font-medium">{project.name}:</span> {project.description} — <a className="underline" href={project.url} target="_blank" rel="noreferrer">{project.url}</a>
                </div>
                {project.video && (
                  <div className="mt-2">
                    <video
                      src={project.video}
                      controls
                      playsInline
                      className="w-full max-w-2xl rounded border border-gray-200"
                    />
                    {project.videoDescription && (
                      <p className="mt-1 text-xs text-muted-foreground max-w-2xl">
                        {project.videoDescription}
                      </p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
