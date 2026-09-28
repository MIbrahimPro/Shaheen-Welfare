import { handleFormSubmission } from '@/lib/forms';

export async function POST(req: Request) {
  const result = await handleFormSubmission('contact', req, [
    { name: 'name', required: true, max: 120 },
    { name: 'email', required: true, email: true },
    { name: 'phone', max: 40 },
    { name: 'subject', max: 200 },
    { name: 'message', required: true, max: 2000 },
  ]);
  return Response.json(result.body, { status: result.status });
}
