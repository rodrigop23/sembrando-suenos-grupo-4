import { getBlogsDataAction } from "@/actions/blog/action";
import Blog from "@/components/blog/blog";
import CustomPagination from "@/components/custom-pagination";
import SearchInput from "@/components/search-input";

export default async function BlogsPage({
  searchParams,
}: Readonly<{
  searchParams: { q: string; page: string };
}>) {
  const { page, q } = searchParams;

  const pageNumber = parseInt(page) || 1;
  const searchString = q || "";

  const { data: blogs, meta } = await getBlogsDataAction(
    pageNumber,
    searchString
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Nuestro Blog</h1>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
        Explora nuestras últimas publicaciones sobre el impacto de nuestros
        programas, historias inspiradoras y consejos para el cambio social.
      </p>

      <div className="mb-8 grid place-items-center">
        <SearchInput
          placeholder="Buscar blogs..."
          className="w-full sm:w-[32rem]"
        />
      </div>

      {blogs?.length === 0 && (
        <div className="text-center text-muted-foreground py-20">
          No se encontraron blogs publicados.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {blogs?.map((blog) => <Blog key={blog.id} data={blog} />)}
      </div>

      {meta?.pagination && meta.pagination.pageCount > 0 && (
        <CustomPagination pageCount={meta?.pagination.pageCount ?? 1} />
      )}
    </div>
  );
}
