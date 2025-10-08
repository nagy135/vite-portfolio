import { Card, CardContent } from '@/components/ui/card'

interface TechnicalSkillsData {
  languages: string
  frameworks: string
  infrastructure: string
  other: string
  preferences: string
}

interface TechnicalSkillsProps {
  skills: TechnicalSkillsData
}

export function TechnicalSkills({ skills }: TechnicalSkillsProps) {
  return (
    <div className="space-y-2">
      <Card>
        <CardContent>
          <ul className="list-disc pl-6 pt-6 space-y-1 text-sm">
            <li><span className="font-medium">Languages:</span> {skills.languages}</li>
            <li><span className="font-medium">Frameworks:</span> {skills.frameworks}</li>
            <li><span className="font-medium">Infrastructure:</span> {skills.infrastructure}</li>
            <li><span className="font-medium">Other:</span> {skills.other}</li>
            <li><span className="font-medium">Preferences:</span> {skills.preferences}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
