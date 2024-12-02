import { getEventDetailsAction } from "@/actions/event/action";
import { getCurrentUser } from "@/actions/user/action";
import EventDetail from "@/components/events/events-detail";
import { EventDetailType } from "@/lib/zod-schemas/event.schema";
import { getToken } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function EventPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const result = await getEventDetailsAction(id);
  const user = await getCurrentUser();
  const token = getToken();

  if (!result.ok) {
    redirect("/eventos");
  }

  const isParticipating =
    result.data?.users.some((u) => u.id === user?.id) ?? false;

  return (
    <EventDetail
      data={result.data as EventDetailType}
      token={token ?? ""}
      isParticipating={isParticipating}
    />
  );
}
