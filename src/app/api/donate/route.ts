import { handleFormSubmission } from '@/lib/forms';

export async function POST(req: Request) {
  const result = await handleFormSubmission('donation', req, [
    { name: 'name', required: true, max: 120 },
    { name: 'email', required: true, email: true },
    { name: 'phone', max: 40 },
    { name: 'amount', required: true, max: 40 },
    { name: 'type', max: 80 },
    { name: 'cause', max: 200 },
    { name: 'message', max: 2000 },
  ]);
  return Response.json(result.body, { status: result.status });
}
