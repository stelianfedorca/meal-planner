import { Params } from 'next/dist/server/request/params';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params)?.slug;
  console.log('slug: ', slug);
  return <div>Hello dynamic route</div>;
}
