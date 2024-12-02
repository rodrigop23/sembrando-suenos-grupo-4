import { getActivityDetailsAction } from "@/actions/activity/actions";
import ActivityDetail from "@/components/activities/activity-detail";
import { ActivityDetailType } from "@/lib/zod-schemas/activity.schema";
import { redirect } from "next/navigation";

export default async function ActivityPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const result = await getActivityDetailsAction(id);

  if (!result.ok) {
    redirect("/actividades");
  }

  return <ActivityDetail data={result.data as ActivityDetailType} />;
}
