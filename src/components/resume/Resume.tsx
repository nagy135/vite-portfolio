import { Experience } from './Experience'
import { Education } from './Education'
import { TechnicalSkills } from './TechnicalSkills'
import { Languages } from './Languages'
import { Projects } from './Projects'
import { AboutMe } from './AboutMe'
import { Stack } from './Stack'
import { CollapsibleSection } from './CollapsibleSection'
import { experienceData } from '@/data/experience'
import { educationData } from '@/data/education'
import { technicalSkillsData } from '@/data/technicalSkills'
import { languagesData } from '@/data/languages'
import { projectsData } from '@/data/projects'
import { aboutMeData } from '@/data/aboutMe'
import { stackData } from '@/data/stack'

export function Resume() {
  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <CollapsibleSection title="Stack" defaultOpen={true}>
          <Stack stack={stackData} />
        </CollapsibleSection>

        <CollapsibleSection title="Experience">
          <Experience experiences={experienceData} />
        </CollapsibleSection>

        <CollapsibleSection title="Education">
          <Education education={educationData} />
        </CollapsibleSection>

        <CollapsibleSection title="Technical Skills">
          <TechnicalSkills skills={technicalSkillsData} />
        </CollapsibleSection>

        <CollapsibleSection title="Languages">
          <Languages languages={languagesData} />
        </CollapsibleSection>

        <CollapsibleSection title="Projects">
          <Projects projects={projectsData} />
        </CollapsibleSection>

        <CollapsibleSection title="About Me">
          <AboutMe aboutMe={aboutMeData} />
        </CollapsibleSection>
      </div>
    </div>
  )
}
