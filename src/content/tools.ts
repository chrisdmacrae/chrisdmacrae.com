import type { ImageMetadata } from 'astro'
import claude from '../assets/images/logos/claude.svg'
import ghostty from '../assets/images/logos/ghostty.svg'
import proxmox from '../assets/images/logos/proxmox.svg'
import railway from '../assets/images/logos/railway.svg'
import fly from '../assets/images/logos/fly.svg'
import companion from '../assets/images/logos/companion.svg'
import gogitcms from '../assets/images/logos/gogitcms.svg'

export type Tool = {
  title: string
  description: string
  link: string
  logo: ImageMetadata
}

export const tools: Tool[] = [
  {
    title: "Claude",
    description: "Anthropic's AI assistant, for chat, research, and writing code with Claude Code.",
    link: "https://claude.ai",
    logo: claude
  },
  {
    title: "Ghostty",
    description: "A fast, feature-rich terminal emulator with platform-native UI and GPU acceleration.",
    link: "https://ghostty.org",
    logo: ghostty
  },
  {
    title: "Proxmox",
    description: "An open-source platform for running virtual machines and containers on your own hardware.",
    link: "https://www.proxmox.com",
    logo: proxmox
  },
  {
    title: "Railway",
    description: "A deployment platform for shipping apps, databases, and services without managing servers.",
    link: "https://railway.com",
    logo: railway
  },
  {
    title: "Fly.io",
    description: "Runs apps in fast-booting virtual machines, in regions close to your users.",
    link: "https://fly.io",
    logo: fly
  },
  {
    title: "Companion",
    description: "A productivity app for notes, tasks, and habits, with end-to-end encryption and your own AI agents.",
    link: "https://companionapp.cloud",
    logo: companion
  },
  {
    title: "GoGitCMS",
    description: "A Git-backed CMS: writers get a friendly editor, developers get plain files, and every save is a commit.",
    link: "https://gogitcms.com",
    logo: gogitcms
  }
]

export default tools
