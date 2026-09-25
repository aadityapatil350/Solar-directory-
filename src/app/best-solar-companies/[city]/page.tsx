import { permanentRedirect } from 'next/navigation';

interface Props {
  params: Promise<{ city: string }>;
}

export default async function BestSolarCompaniesCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  permanentRedirect(`/${citySlug}`);
}
