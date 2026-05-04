import { getIdeas } from "@/actions/idea.action";

export default async function ManageApprovedIdeasPage() {
  const { data: approvedIdeas, meta } = await getIdeas({});

  console.log("approvedIdeas", approvedIdeas);

  return <div>Manage Approved Ideas Page</div>;
}
