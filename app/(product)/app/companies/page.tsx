import { redirect } from "next/navigation";

// Companies index merged into home. Deep-links with query params are
// preserved so bookmarks like /app/companies?sector=luxury still work.
export default function CompaniesPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const qs = new URLSearchParams(searchParams).toString();
  redirect(qs ? `/app?${qs}` : "/app");
}
