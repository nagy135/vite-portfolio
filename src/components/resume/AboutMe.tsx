import { Card, CardContent } from '@/components/ui/card'

interface AboutMeData {
  description: string
  github: string
}

interface AboutMeProps {
  aboutMe: AboutMeData
}

export function AboutMe({ aboutMe }: AboutMeProps) {
  return (
    <div className="space-y-2">
      <Card>
        <CardContent>
          <p className="text-sm">
            {aboutMe.description} GitHub: <a className="underline" href={aboutMe.github} target="_blank" rel="noreferrer">github.com/nagy135</a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
