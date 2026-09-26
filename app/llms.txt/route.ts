import { siteUrl, siteName, siteDescription } from '@/lib/site';

export async function GET() {
  const content = `# ${siteName}
${siteDescription}

Public pages:
- ${siteUrl}/
- ${siteUrl}/plan
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}