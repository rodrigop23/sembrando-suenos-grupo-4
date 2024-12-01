import { getActivitiesDataAction } from "@/actions/activity/actions";
import Activities from "@/components/activities/activities";
import CustomPagination from "@/components/custom-pagination";
import SearchInput from "@/components/search-input";

export default async function ActivitiesPage({
  searchParams,
}: Readonly<{
  searchParams: { q: string; page: string };
}>) {
  const { page, q } = searchParams;

  const pageNumber = parseInt(page) || 1;
  const searchString = q || "";

  const { data: activities, meta } = await getActivitiesDataAction(
    pageNumber,
    searchString
  );

  return (
    <div className="max-w-7xl mx-auto md:px-2 md:py-4 px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Actividades Benéficas</h1>
        <p className="text-muted-foreground mb-6">
          Descubre cómo puedes marcar la diferencia en tu comunidad
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            placeholder="Buscar actividades..."
            className="w-full sm:w-96"
          />
        </div>
      </div>

      {activities?.length === 0 && (
        <div className="text-center text-muted-foreground py-20">
          No se encontraron actividades
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {activities?.map((activity) => (
          <Activities key={activity.id} activity={activity} />
        ))}
      </div>

      {meta?.pagination && meta.pagination.pageCount > 0 && (
        <CustomPagination pageCount={meta?.pagination.pageCount ?? 1} />
      )}
    </div>
  );
}
