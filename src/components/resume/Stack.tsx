import { Card, CardContent } from '@/components/ui/card'
import { TechnologyIcons } from './TechnologyIcons'

interface StackData {
  frontend: string
  backend: string
  infrastructure: string
  tools: string
  databases: string
}

interface StackProps {
  stack: StackData
}

export function Stack({ stack }: StackProps) {
  return (
    <div className="space-y-2">
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Frontend</h3>
                <TechnologyIcons stack={stack.frontend} />
              </div>
              <p className="text-muted-foreground">{stack.frontend}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Backend</h3>
                <TechnologyIcons stack={stack.backend} />
              </div>
              <p className="text-muted-foreground">{stack.backend}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Infrastructure</h3>
                <TechnologyIcons stack={stack.infrastructure} />
              </div>
              <p className="text-muted-foreground">{stack.infrastructure}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Tools</h3>
                <TechnologyIcons stack={stack.tools} />
              </div>
              <p className="text-muted-foreground">{stack.tools}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Databases</h3>
                <TechnologyIcons stack={stack.databases} />
              </div>
              <p className="text-muted-foreground">{stack.databases}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
