import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import UKLogo from '@/assets/UK_logo.png'

interface EducationItem {
  institution: string
  location: string
  degree: string
  field: string
  startDate: string
  endDate: string
  details: string[]
}

interface EducationProps {
  education: EducationItem[]
}

function EducationCard({ item, showLogo }: { item: EducationItem; showLogo?: boolean }) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <CardTitle>{item.institution} — {item.location}</CardTitle>
            <p className="text-sm text-muted-foreground">{item.degree} — {item.field} — {item.startDate}–{item.endDate}</p>
          </div>
          {showLogo && (
            <div className="flex-shrink-0 p-1 rounded-md shadow-sm border bg-black">
              <img 
                src={UKLogo} 
                alt="Comenius University Logo" 
                className="h-12 w-12 object-contain"
              />
            </div>
          )}
        </div>
      </CardHeader>
      {item.details.length > 0 && (
        <CardContent>
          <ul className="list-disc pl-6 space-y-1 text-sm py-0">
            {item.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  )
}

export function Education({ education }: EducationProps) {
  return (
    <div className="space-y-2">
      {education.map((item, index) => (
        <EducationCard key={index} item={item} showLogo={index === 0} />
      ))}
    </div>
  )
}
