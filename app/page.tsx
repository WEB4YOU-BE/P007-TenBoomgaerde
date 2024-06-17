import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser()
  console.log(data)
  console.error(error)
  if (error || !data?.user) return redirect("/sign-in")

  return <>
  </>
}
