import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import { profile, education, skills, works, clients } from './data'

const sectionIds = ['top', 'about', 'education', 'skills', 'works', 'social', 'contact', 'thanks']

const Title = ({ children, className = '' }) => (
  <h2 className={`font-display uppercase leading-[0.95] tracking-tight text-zinc-200 text-6xl sm:text-7xl lg:text-8xl ${className}`}>{children}</h2>
)
const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative overflow-hidden px-6 sm:px-12 lg:px-24 py-20 lg:py-28 ${className}`}>
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
)
const SectionNavigation = () => {
  const [navigation, setNavigation] = useState({
    href: '#about',
    up: false,
    previousHref: null,
  })

  useEffect(() => {
    const updateNavigation = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2
      const currentIndex = sectionIds.reduce((index, id, candidateIndex) => {
        const section = document.getElementById(id)
        return section && section.offsetTop <= viewportCenter ? candidateIndex : index
      }, 0)
      const isLastSection = currentIndex === sectionIds.length - 1
      const nextNavigation = {
        href: isLastSection ? '#top' : `#${sectionIds[currentIndex + 1]}`,
        up: isLastSection,
        previousHref: currentIndex > 0 ? `#${sectionIds[currentIndex - 1]}` : null,
      }
      setNavigation((current) => current.href === nextNavigation.href
        && current.up === nextNavigation.up
        && current.previousHref === nextNavigation.previousHref
        ? current
        : nextNavigation)
    }

    updateNavigation()
    window.addEventListener('scroll', updateNavigation, { passive: true })
    window.addEventListener('resize', updateNavigation)
    return () => {
      window.removeEventListener('scroll', updateNavigation)
      window.removeEventListener('resize', updateNavigation)
    }
  }, [])

  const NextArrow = navigation.up ? Icons.ChevronUp : Icons.ChevronDown
  const buttonClass = 'grid h-12 w-12 place-items-center rounded-full border-2 border-brand bg-transparent text-brand transition-colors hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 sm:bottom-8 sm:right-12">
      {navigation.previousHref && (
        <a href={navigation.previousHref} aria-label="Go to previous section" className={buttonClass}>
          <Icons.ChevronUp size={24} aria-hidden="true" />
        </a>
      )}
      <a href={navigation.href} aria-label={navigation.up ? 'Back to top' : 'Go to next section'} className={buttonClass}>
        <NextArrow size={24} aria-hidden="true" />
      </a>
    </div>
  )
}
const Cutout = ({ src, alt, circle = true, className = '', widthClass = 'max-w-md', imageClass = '', circleSize = 'w-[85%]' }) => (
  <div className={`relative mx-auto w-full ${widthClass} ${className}`}>
    {circle && <div className={`absolute left-1/2 top-[8%] aspect-square ${circleSize} -translate-x-1/2 rounded-full bg-brand`} />}
    <img src={src} alt={alt} loading="lazy" className={`relative w-full object-contain ${imageClass}`} />
  </div>
)

function Hero() {
  return (
    <header id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[24vw] leading-none text-brand select-none">PORTFOLIO</h1>
      <img src="/img/hero.png" alt={profile.name} className="relative z-10 h-[80vh] max-h-[820px] object-contain object-bottom self-end" />
      <p className="absolute left-6 top-6 z-20 text-sm font-medium tracking-wide sm:left-12">{profile.name}</p>
      <p className="absolute bottom-8 left-6 z-20 text-xs font-medium sm:left-12 sm:text-sm">{profile.location}</p>
      <p className="absolute right-6 top-6 z-20 max-w-[12rem] text-right text-xs font-medium sm:right-12 sm:max-w-xs sm:text-sm">{profile.title}<br />{profile.subtitle}</p>
    </header>
  )
}
const About = () => (
  <Section id="about"><div className="grid items-center gap-12 md:grid-cols-2">
    <div><Title>Who<br />I am</Title>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-zinc-200 sm:text-base">{profile.about.map((p) => <p key={p}>{p}</p>)}</div></div>
    <Cutout src="/img/about.png" alt="Sahal presenting" />
  </div></Section>
)
const Education = () => (
  <Section id="education"><div className="grid items-center gap-12 md:grid-cols-2">
    <Cutout src="/img/education.png" alt="Sahal at laptop" className="order-2 md:order-1" widthClass="max-w-lg" imageClass="scale-120" circleSize="w-[70%]" />
    <div className="order-1 md:order-2"><Title>My<br />Education</Title>
      <div className="mt-10 space-y-8">{education.map((e) => (
        <div key={e.school} className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-sm">
          <div><p className="font-semibold">{e.school}</p><p className="italic text-zinc-300">{e.course}</p></div>
          <p className="text-zinc-300">({e.date})</p></div>))}</div></div>
  </div></Section>
)
const Skills = () => (
  <Section id="skills"><div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
    <div><Title>Personal<br />Skills</Title>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">{skills.map((s) => { const I = Icons[s.icon]; return (
        <div key={s.t} className="flex gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-brand text-brand"><I size={20} /></span>
          <div><h3 className="text-sm font-semibold">{s.t}</h3><p className="mt-1 text-xs text-zinc-400">{s.d}</p></div></div>)})}</div></div>
    <Cutout src="/img/skills.png" alt="Sahal with tablet" widthClass="max-w-lg" imageClass="scale-110" />
  </div></Section>
)
const Works = () => (
  <Section id="works"><div className="grid items-center gap-12 md:grid-cols-2">
    <div><Title>Works I<br />have done</Title><div className="mt-6 h-0.5 w-40 bg-brand" />
      <ol className="mt-10 space-y-5">{works.categories.map((c, i) => (
        <li key={c} className="flex items-center gap-4 text-sm font-semibold sm:text-base">
          <span className="text-brand">{String(i + 1).padStart(2, '0')}</span><span className="h-4 w-px bg-zinc-500" />{c}</li>))}</ol></div>
    <div><p className="mb-8 text-right text-sm italic leading-relaxed text-zinc-300">{works.note}</p>
      <Cutout src="/img/works.png" alt="Sahal seated" /></div>
  </div></Section>
)
const Social = () => (
  <Section id="social" className="!pt-5">
    <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {clients.map((c) => (
        <article key={c.name} className="text-center">
          <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${c.name} on Instagram`} className="group rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
            <img src={c.img} alt={`${c.name} Instagram profile`} loading="lazy" className="h-66 w-full rounded-2xl border border-zinc-700 object-cover object-top transition-opacity group-hover:border-brand" />
            <h3 className="mt-3 font-display text-lg uppercase transition-colors group-hover:text-brand sm:text-xl">{c.name}</h3>
          </a>
        </article>))}</div>
      <Title className="lg:border-l lg:border-zinc-600 lg:pl-10 lg:text-right !text-5xl sm:!text-6xl lg:!text-7xl">Social<br />Media<br />Management</Title>
    </div>
  </Section>
)
const Contact = () => {
  const rows = [[Icons.Phone, profile.phone, `tel:${profile.phone.replace(/\s/g, '')}`], [Icons.Mail, profile.email, `mailto:${profile.email}`],
    [Icons.Linkedin, profile.linkedin, profile.linkedinUrl], [Icons.MapPin, 'Dubai, UAE']]
  return (
    <Section id="contact"><div className="grid items-center gap-12 md:grid-cols-2">
      <div><h2 className="font-display text-6xl uppercase leading-[0.95] sm:text-7xl lg:text-8xl">Let’s<br /><span className="text-brand">Connect</span></h2>
        <ul className="mt-10 space-y-5">{rows.map(([I, t, href]) => (
          <li key={t} className="flex items-center gap-4"><span className="grid h-10 w-10 place-items-center rounded-full border border-white"><I size={18} /></span>
            {href ? <a href={href} className="text-sm hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand sm:text-base">{t}</a> : <span className="text-sm sm:text-base">{t}</span>}</li>))}</ul></div>
      <Cutout src="/img/contacts.png" alt="Sahal at laptop" widthClass="max-w-lg" imageClass="scale-130" circleSize="w-[70%]" />
    </div></Section>
  )
}
const Thanks = () => (
  <footer id="thanks" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black py-16 text-center">
    <p className="relative font-display text-[16vw] leading-none text-brand">THANK YOU</p>
  </footer>
)
export default function App() {
  return (<><Hero /><About /><Education /><Skills /><Works /><Social />
    <Contact /><Thanks /><SectionNavigation /></>)
}
