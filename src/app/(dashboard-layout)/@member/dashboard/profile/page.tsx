import { getMe } from "@/actions/auth";
import ProfilePage from "@/components/modules/dashboard/shared/ProfilePage";

export default async function MemberProfilePage() {
  const { data: user } = await getMe();

  if (!user) return null;

  return (
    <>
      <ProfilePage user={user} />
    </>
  );
}
