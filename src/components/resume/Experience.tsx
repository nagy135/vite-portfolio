import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TechnologyIcons } from './TechnologyIcons'
import { CollapsibleSection } from './CollapsibleSection'

interface JobExperience {
  title: string
  company: string
  location?: string
  startDate: string
  endDate: string
  responsibilities: string[]
  stack?: string
}

interface ExperienceProps {
  experiences: JobExperience[]
}

function JobCard({ job }: { job: JobExperience }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div className="flex-1">
            <CardTitle>
              {job.title}
              {job.company && ` — ${job.company}`}
              {job.location && ` — ${job.location}`}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{job.startDate} — {job.endDate}</p>
          </div>
          {job.stack && (
            <div className="flex-shrink-0">
              <TechnologyIcons stack={job.stack} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          {job.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
          {job.stack && (
            <li><span className="font-medium">Stack:</span> {job.stack}</li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}

export function Experience({ experiences }: ExperienceProps) {
  // Split experiences: first 3 are main, last 4 go into "Beginnings"
  const recentExperiences = experiences.slice(0, 4)
  const beginningExperiences = experiences.slice(5)

  return (
    <div className="space-y-4">
      {recentExperiences.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}

      {beginningExperiences.length > 0 && (
        <CollapsibleSection title="Beginnings" defaultOpen={false}>
          <div className="space-y-4">
            {beginningExperiences.map((job, index) => (
              <JobCard key={index + recentExperiences.length} job={job} />
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  )
}
