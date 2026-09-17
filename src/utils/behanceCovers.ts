import { ProjectItem } from '../types';

export const BEHANCE_COVER_MAP: Record<string, string> = {
  '255212215': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/39f532255212215.Y3JvcCw4MDAwLDYyNTgsMCwxMDEw.jpg',
  '255236881': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/395a07255236881.Y3JvcCw5MjAwLDcxOTYsMCw0MzI.jpg',
  '255250677': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/2b03a6255250677.Y3JvcCw5MjAwLDcxOTYsMCwxMDAx.jpg',
  '255644821': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/a62667255644821.Y3JvcCwxMzA5LDEwMjQsMTEzLDA.png',
  '254863705': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/2e330e254863705.Y3JvcCwxMDI0LDgwMCwwLDE3.jpg',
  '254863423': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/28e94d254863423.Y3JvcCw5MjIsNzIxLDAsODQ.jpg',
  '254818611': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/6c7459254818611.Y3JvcCwxMTIyLDg3NywwLDI2MQ.png',
  '254884983': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/be325a254884983.Y3JvcCwxMjU0LDk4MCwwLDEzNg.jpg',
  '254840487': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/00f502254840487.Y3JvcCwxMDI0LDgwMCwwLDExMQ.jpg',
  '253635481': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/a86b83253635481.Y3JvcCwxMzA5LDEwMjQsMTEzLDA.png',
  '254107271': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/81f92e254107271.Y3JvcCwxMDg2LDg0OSwwLDI5OA.png',
  '254866321': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/6195cd254866321.Y3JvcCwxMjU0LDk4MCwwLDEzNg.png',
  '254862215': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/b207ea254862215.6a8f949c7bffa.png',
  '254861839': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/38010d254861839.Y3JvcCwzNTk3LDI4MTQsMjg0LDA.jpg',
  '254860475': 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/0e1fe8254860475.Y3JvcCwyNTU2LDIwMDAsMjIxLDA.jpg',
};

/**
 * Extracts Behance Project ID from any Behance gallery / project URL
 */
export function extractBehanceId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:gallery|project|embed\/project)\/(\d+)/i);
  return match ? match[1] : null;
}

/**
 * Returns authentic, fast-loading Behance CDN cover image if available,
 * eliminating all generic Unsplash placeholders.
 */
export function getOptimizedCover(project: Partial<ProjectItem>): string {
  const behanceId = extractBehanceId(project.liveUrl);
  if (behanceId && BEHANCE_COVER_MAP[behanceId]) {
    return BEHANCE_COVER_MAP[behanceId];
  }

  // If project is Meta Marketing, never inject Behance graphic design covers
  if (project.category === 'meta') {
    return project.coverImage || '';
  }

  // If coverImage is currently an Unsplash stock photo, replace with relevant real Behance creative
  if (!project.coverImage || project.coverImage.includes('unsplash.com')) {
    if (project.category === 'graphics') {
      return BEHANCE_COVER_MAP['255212215'];
    }
    return '/profile.png';
  }

  return project.coverImage;
}
