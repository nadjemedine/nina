import { getProductBySlug } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/ProductDetailsClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
