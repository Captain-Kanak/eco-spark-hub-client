import { LoginForm } from "@/components/modules/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const redirect = params.redirect || "/";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 lg:px-0 py-6">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-125 w-125 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <LoginForm redirect={redirect} />
      </div>
    </div>
  );
}
