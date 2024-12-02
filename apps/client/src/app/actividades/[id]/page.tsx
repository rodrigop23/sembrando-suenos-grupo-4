import { getActivityDetailsAction } from "@/actions/activity/actions";
import { getCurrentUser } from "@/actions/user/action";
import ActivityDetail from "@/components/activities/activity-detail";
import { ActivityDetailType } from "@/lib/zod-schemas/activity.schema";
import { getToken } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function ActivityPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const result = await getActivityDetailsAction(id);
  const user = await getCurrentUser();
  const token = getToken();

  if (!result.ok) {
    redirect("/actividades");
  }

  const isParticipating =
    result.data?.users.some((u) => u.id === user?.id) ?? false;

  return (
    <ActivityDetail
      data={result.data as ActivityDetailType}
      token={token ?? ""}
      isParticipating={isParticipating}
    />
  );
}
