import SearchInput from "@/components/search-input";
import CustomPagination from "@/components/custom-pagination";
import { getEventsDataAction } from "@/actions/event/action";
import Events from "@/components/events/events";

export default async function EventsPage({
  searchParams,
}: Readonly<{
  searchParams: { q: string; page: string };
}>) {
  const { page, q } = searchParams;

  const pageNumber = parseInt(page) || 1;
  const searchString = q || "";

  const { data: events, meta } = await getEventsDataAction(
    pageNumber,
    searchString
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Próximos Eventos</h1>

      <p className="text-muted-foreground mb-6">
        Explora y participa en nuestros próximos eventos. Desde actividades
        comunitarias hasta talleres educativos, hay algo para todos. Usa la
        barra de búsqueda para encontrar eventos específicos y navega por las
        páginas para ver más opciones.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SearchInput
          placeholder="Buscar eventos..."
          className="w-full sm:w-96"
        />
      </div>

      {events?.length === 0 && (
        <div className="text-center text-muted-foreground py-20">
          No se encontraron eventos
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {events?.map((event) => <Events key={event.id} event={event} />)}
      </div>

      {meta?.pagination && meta.pagination.pageCount > 0 && (
        <CustomPagination pageCount={meta?.pagination.pageCount ?? 1} />
      )}
    </div>
  );
}
