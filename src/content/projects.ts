import { getCollection } from 'astro:content';

export type Project = Awaited<ReturnType<typeof getProjects>>[number]

export type getProjectsOptions = {
  drafts?: boolean
}

export const getProjects = async (options?: getProjectsOptions) => {
  const projects = await getCollection('projects', ({ data }) => options?.drafts || data.draft !== true)
  // getCollection() has no guaranteed order, so keep projects sorted by filename.
  projects.sort((a, b) => a.id.localeCompare(b.id))

  return projects.map(project => ({
    ...project,
    // The project's URL, served by src/pages/projects/[id].astro
    slug: `/projects/${project.id}`
  } as const))
}
