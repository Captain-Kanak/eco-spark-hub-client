import { getIdeaBySlug } from "@/actions/idea";
import PaymentClient from "@/components/modules/payment/PaymentClient";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: idea } = await getIdeaBySlug(slug);
  return (
    <>
      <PaymentClient idea={idea} />
    </>
  );
}
