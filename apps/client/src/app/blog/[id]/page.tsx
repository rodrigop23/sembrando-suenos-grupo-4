import { getBlogDetailsAction } from "@/actions/blog/action";
import BlogDetail from "@/components/blog/blog-detail";
import { BlogDetailType } from "@/lib/zod-schemas/blog.schema";
import { redirect } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getBlogDetailsAction(id);

  if (!result.ok) {
    redirect("/blog");
  }

  return <BlogDetail data={result.data as BlogDetailType} />;
}
