import { Tooltip } from '@/components/ui/tooltip'
interface TechnologyIconsProps {
  stack: string
}

// Import SVG icons
import TypeScriptIcon from '@/assets/icons/typescript.svg'
import ReactIcon from '@/assets/icons/react.svg'
import NextjsIcon from '@/assets/icons/nextjs.svg'
import PythonIcon from '@/assets/icons/python.svg'
import VueIcon from '@/assets/icons/vue.svg'
import DjangoIcon from '@/assets/icons/django.svg'
import LaravelIcon from '@/assets/icons/laravel.svg'
import PHPIcon from '@/assets/icons/php.svg'
import DockerIcon from '@/assets/icons/docker.svg'
import AWSIcon from '@/assets/icons/aws.svg'
import AzureIcon from '@/assets/icons/azure.svg'
import ShellIcon from '@/assets/icons/shell.svg'
import SocketIcon from '@/assets/icons/socket.svg'
import MongoDBIcon from '@/assets/icons/mongo.svg'
import PostgresIcon from '@/assets/icons/postgres.svg'
import NestjsIcon from '@/assets/icons/nestjs.svg'


const technologyIconMap: Record<string, string> = {
  'TypeScript': TypeScriptIcon,
  'React': ReactIcon,
  'Next.js': NextjsIcon,
  'NestJS': NestjsIcon,
  'Python': PythonIcon,
  'Vue.js': VueIcon,
  'Django': DjangoIcon,
  'Laravel': LaravelIcon,
  'PHP': PHPIcon,
  'Docker': DockerIcon,
  'AWS': AWSIcon,
  'Azure': AzureIcon,
  'Shell': ShellIcon,
  'Shell scripting': ShellIcon,
  'Socket': SocketIcon,
  'Sockets': SocketIcon,
  'Socket.IO': SocketIcon,
  'Socket.io': SocketIcon,
  'MongoDB': MongoDBIcon,
  'Postgres': PostgresIcon
}

export function TechnologyIcons({ stack }: TechnologyIconsProps) {
  if (!stack) return null

  // Extract technologies from stack string
  const technologies = stack.split(',').map(tech => tech.trim())
  
  // Get icons for technologies that have mappings
  const icons = technologies
    .map(tech => {
      const iconSrc = technologyIconMap[tech]
      return iconSrc ? { name: tech, src: iconSrc } : null
    })
    .filter((icon): icon is { name: string; src: string } => icon !== null)
    .slice(0, 6) // Limit to 6 icons max

  if (icons.length === 0) return null

  return (
    <div className="flex gap-1 justify-start sm:justify-end flex-wrap">
      {icons.map(({ name, src }, index) => (
        <Tooltip key={index} content={name}>
          <div 
            className="p-1 rounded-md bg-card border shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 cursor-pointer dark:bg-slate-200"
          >
            <div className="h-8 w-8 rounded p-0">
              <img 
                src={src} 
                alt={name}
                className="h-full w-full"
              />
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
