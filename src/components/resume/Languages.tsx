import { Card, CardContent } from '@/components/ui/card'

interface Language {
  language: string
  level: string
}

interface LanguagesProps {
  languages: Language[]
}

export function Languages({ languages }: LanguagesProps) {
  return (
    <div className="space-y-2">
      <Card>
        <CardContent>
          <ul className="list-disc pl-6 pt-6 space-y-1 text-sm">
            {languages.map((lang, index) => (
              <li key={index}>{lang.language}: {lang.level}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
