import { getEventDetailsAction } from "@/actions/event/action";
import EventDetail from "@/components/events/events-detail";
import { EventDetailType } from "@/lib/zod-schemas/event.schema";
import { redirect } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getEventDetailsAction(id);

  console.log(result);

  // if (!result.ok) {
  // redirect("/eventos");
  // }

  return <EventDetail data={result.data as EventDetailType} />;
}
