import { handleFormSubmission } from '@/lib/forms';

export async function POST(req: Request) {
  const result = await handleFormSubmission('volunteer', req, [
    { name: 'name', required: true, max: 120 },
    { name: 'email', required: true, email: true },
    { name: 'phone', required: true, max: 40 },
    { name: 'city', max: 120 },
    { name: 'interest', max: 200 },
    { name: 'availability', max: 200 },
    { name: 'message', max: 2000 },
  ]);
  return Response.json(result.body, { status: result.status });
}
