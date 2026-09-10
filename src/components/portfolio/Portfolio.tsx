import { lazy, Suspense, useEffect, useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Github,
  Linkedin,
  Mail,
  Moon,
  Pause,
  Phone,
  Play,
  Printer,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Particles } from "@/components/ui/particles"
import { useTheme } from "@/hooks/use-theme"
import { RobotStage } from "@/components/portfolio/RobotStage"
import { aboutMeData } from "@/data/aboutMe"
import { educationData } from "@/data/education"
import { experienceData } from "@/data/experience"
import { languagesData } from "@/data/languages"
import { projectsData } from "@/data/projects"
import { stackData } from "@/data/stack"
import { technicalSkillsData } from "@/data/technicalSkills"
import { cn } from "@/lib/utils"

const Demos = lazy(() =>
  import("@/components/demos/Demos").then((module) => ({ default: module.Demos })),
)
const email = "viktor.nagy1995@gmail.com"
const filters = ["All projects", "Platforms", "Personal tools"] as const
type ProjectFilter = (typeof filters)[number]
type Project = (typeof projectsData)[number]

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const [playing, setPlaying] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [videoFailed, setVideoFailed] = useState(false)
  const preview = project.images?.[imageIndex] ?? project.poster

  return (
    <article className={cn("project", `project-${project.id}`)}>
      {preview ? (
        <div className="project-media">
          {playing && project.video ? (
            <div className="project-player">
              <video
                controls
                autoPlay
                playsInline
                preload="none"
                poster={preview}
                src={project.video}
                aria-label={`${project.name} demonstration`}
                onError={() => setVideoFailed(true)}
              />
              {videoFailed && (
                <p role="status">
                  The video couldn’t load. <a href={project.video}>Open the recording</a> to try
                  again.
                </p>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="close-video"
                onClick={() => {
                  setPlaying(false)
                  setVideoFailed(false)
                }}
              >
                Close video
              </Button>
            </div>
          ) : (
            <>
              <img
                src={preview}
                alt={`${project.name} application preview`}
                loading="lazy"
                width={1200}
                height={750}
              />
              {project.video && (
                <button
                  type="button"
                  className="play-project"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${project.name} demo`}
                >
                  <Play size={16} fill="currentColor" />
                  <span>Watch demo</span>
                </button>
              )}
              {project.images && project.images.length > 1 && (
                <div className="image-switcher" aria-label={`${project.name} screenshots`}>
                  {project.images.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      aria-label={`Show ${index === 0 ? "editor" : "edit history"} screenshot`}
                      aria-pressed={imageIndex === index}
                      onClick={() => setImageIndex(index)}
                    >
                      {index === 0 ? "Editor" : "Edit history"}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="project-text-mark">
          <Code2 size={28} />
          <span>{project.category}</span>
        </div>
      )}
      <div className="project-copy">
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.name} website`}
          >
            <ArrowUpRight size={23} />
          </a>
        </div>
        <p>{project.description}</p>
        {project.technologies.length > 0 && (
          <ul className="tech-tags" aria-label={`${project.name} technologies`}>
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
        {project.videoDescription && (
          <details className="project-notes">
            <summary>
              Behind the project <ChevronDown size={14} />
            </summary>
            <p>{project.videoDescription}</p>
          </details>
        )}
      </div>
    </article>
  )
}

function WorkExperience() {
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let previousStates: { element: HTMLDetailsElement; open: boolean }[] = []
    const preparePrint = () => {
      previousStates = Array.from(
        document.querySelectorAll<HTMLDetailsElement>(".experience-item"),
      ).map((element) => ({ element, open: element.open }))
      previousStates.forEach(({ element }) => {
        element.open = true
      })
    }
    const restore = () =>
      previousStates.forEach(({ element, open }) => {
        element.open = open
      })
    window.addEventListener("beforeprint", preparePrint)
    window.addEventListener("afterprint", restore)
    return () => {
      window.removeEventListener("beforeprint", preparePrint)
      window.removeEventListener("afterprint", restore)
    }
  }, [])

  return (
    <section id="experience" className="section-grid page-section">
      <div className="section-intro">
        <h2>Experience</h2>
        <button type="button" className="text-action print-action" onClick={() => window.print()}>
          <Printer size={16} /> Print résumé
        </button>
      </div>
      <div>
        <div className={cn("experience-list", !showAll && "experience-condensed")}>
          {experienceData.map((job, index) => (
            <details
              key={`${job.company}-${job.startDate}`}
              className={cn("experience-item", index >= 4 && "earlier-experience")}
              open={index === 0 ? true : undefined}
            >
              <summary>
                <span className="job-heading">
                  <span className="company-name">{job.company}</span>
                  <span className="job-title">{job.title}</span>
                </span>
                <span className="job-meta">
                  <span>
                    {job.endDate === "Previous role"
                      ? `Started ${job.startDate}`
                      : job.startDate
                        ? `${job.startDate} – ${job.endDate}`
                        : job.endDate}
                  </span>
                  {job.endDate === "Present" && (
                    <span className="current-role">
                      <span />
                      Current
                    </span>
                  )}
                  {job.endDate === "Previous role" && <span>Previous role</span>}
                </span>
                <ChevronDown className="details-chevron" size={19} />
              </summary>
              <div className="job-details">
                {job.location && <p className="job-location">{job.location}</p>}
                <ul>
                  {job.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
                {job.stack && <p className="job-stack">{job.stack}</p>}
              </div>
            </details>
          ))}
        </div>
        <Button
          variant="outline"
          className="history-toggle"
          aria-expanded={showAll}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show recent experience" : "Show earlier experience"}
          <ChevronDown size={16} className={cn(showAll && "rotate-180")} />
        </Button>
      </div>
    </section>
  )
}

export function Portfolio() {
  const { resolvedTheme, setTheme } = useTheme()
  const [filter, setFilter] = useState<ProjectFilter>("All projects")
  const [showDemos, setShowDemos] = useState(false)
  const [starsPaused, setStarsPaused] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const isDark = resolvedTheme === "dark"
  const projects = projectsData.filter(
    (project) => filter === "All projects" || project.category === filter,
  )

  function copyEmail() {
    if (!navigator.clipboard) {
      setCopyFailed(true)
      return
    }
    void navigator.clipboard.writeText(email).then(
      () => {
        setCopied(true)
        setCopyFailed(false)
      },
      () => setCopyFailed(true),
    )
  }

  return (
    <div className="portfolio">
      <Particles
        className="portfolio-stars"
        quantity={100}
        size={0.6}
        ease={80}
        vy={-0.04}
        paused={starsPaused}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header page-width">
        <a className="wordmark" href="#" aria-label="Viktor Nagy, home">
          <span className="monogram" aria-hidden="true">
            vn
          </span>
          <span>infiniter.tech</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <a className="contact-nav" href="#contact">
            Contact <ArrowUpRight size={16} />
          </a>
          <Button
            variant="ghost"
            size="icon"
            aria-label={starsPaused ? "Resume background stars" : "Pause background stars"}
            aria-pressed={starsPaused}
            onClick={() => setStarsPaused(!starsPaused)}
          >
            {starsPaused ? <Play size={17} /> : <Pause size={17} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </Button>
        </div>
      </header>
      <main id="main" className="page-width">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">CV</h1>
            <p className="hero-name">Viktor Nagy</p>
            <p className="hero-role">Senior full-stack developer</p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <a href="#work">
                  View projects <ArrowDown size={17} />
                </a>
              </Button>
              <a className="text-action" href={`mailto:${email}`}>
                Get in touch <Mail size={17} />
              </a>
            </div>
          </div>
          <RobotStage />
        </section>
        <div className="intro-footnote">
          <p>
            <span className="status-dot" />
            <span><a href="#experience">Sensory-Minds</a> in Germany</span>
          </p>
          <div className="intro-socials">
            <a href={aboutMeData.github} target="_blank" rel="noreferrer">
              <Github size={17} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/viktor-nagy-5a3504167"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={17} />
              LinkedIn
            </a>
          </div>
        </div>
        <section id="work" className="work-section page-section" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <h2 id="work-title">Projects</h2>
            </div>
            <div className="project-filters" role="group" aria-label="Filter projects">
              {filters.map((option) => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={filter === option}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className={cn("project-grid", filter !== "All projects" && "project-grid-filtered")}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <p className="sr-only" role="status">
            {projects.length} projects shown
          </p>
          <div className="playground-callout">
            <div>
              <span className="playground-icon">
                <Code2 size={24} />
              </span>
              <div>
                <h3>Playground</h3>
              </div>
            </div>
            <Button
              variant="outline"
              aria-expanded={showDemos}
              aria-controls="experiments"
              onClick={() => setShowDemos(!showDemos)}
            >
              {showDemos ? "Close playground" : "Open playground"}
              <ChevronDown size={16} className={cn(showDemos && "rotate-180")} />
            </Button>
          </div>
          {showDemos && (
            <div id="experiments" className="experiments">
              <Suspense fallback={<p role="status">Loading the playground…</p>}>
                <Demos />
              </Suspense>
            </div>
          )}
        </section>
        <WorkExperience />
        <section id="about" className="about-section page-section">
          <div className="section-grid">
            <div className="section-intro">
              <h2>About</h2>
            </div>
            <div className="about-copy">
              <p>{aboutMeData.description}</p>
              <div className="personal-interests">
                <span>3D printing</span>
                <span>Fitness & new sports</span>
                <span>Linux tinkering</span>
              </div>
              <p className="linux-note">{technicalSkillsData.preferences}</p>
            </div>
          </div>
          <div className="toolkit">
            <div className="section-heading">
              <h3>Technical skills</h3>
            </div>
            <div className="toolkit-grid">
              {Object.entries(stackData).map(([category, technologies]) => (
                <div key={category}>
                  <h4>
                    {category === "frontend"
                      ? "Frontend"
                      : category === "backend"
                        ? "Backend"
                        : category === "infrastructure"
                          ? "Infrastructure"
                          : category === "tools"
                            ? "Tools & testing"
                            : "Databases"}
                  </h4>
                  <p>{technologies}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="background-grid">
            <div>
              <h3>Education</h3>
              {educationData.map((education) => (
                <div className="education-item" key={education.institution}>
                  <p className="education-years">
                    {education.startDate} – {education.endDate}
                  </p>
                  <h4>
                    {education.degree}, {education.field}
                  </h4>
                  <p>{education.institution}</p>
                  {education.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <h3>Languages</h3>
              <dl className="languages-list">
                {languagesData.map((language) => (
                  <div key={language.language}>
                    <dt>{language.language}</dt>
                    <dd>{language.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div>
            <h2 id="contact-title">Contact</h2>
          </div>
          <div className="contact-details">
            <a className="email-link" href={`mailto:${email}`}>
              {email}
              <ArrowUpRight size={25} />
            </a>
            <div className="contact-options">
              <button type="button" className="text-action" onClick={copyEmail}>
                {copied ? <Check size={15} /> : <Mail size={15} />}
                {copied ? "Email copied" : "Copy email"}
              </button>
              <a href="tel:+4917641111740">
                <Phone size={15} />
                +49 176 4111 1740
              </a>
            </div>
            <p role="status" className="copy-status">
              {copyFailed
                ? "Select the email address above to copy it, or click it to open your mail app."
                : copied
                  ? "Email address copied to clipboard."
                  : ""}
            </p>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
        <p>© {new Date().getFullYear()} Viktor Nagy</p>
        <div>
          <a href={aboutMeData.github} target="_blank" rel="noreferrer">
            <Github size={16} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/viktor-nagy-5a3504167"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a href="#hero-title" aria-label="Back to top">
            <ArrowUp size={16} />
          </a>
        </div>
      </footer>
    </div>
  )
}

ProjectCard.displayName = "ProjectCard"
WorkExperience.displayName = "WorkExperience"
Portfolio.displayName = "Portfolio"
