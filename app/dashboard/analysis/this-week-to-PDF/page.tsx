import { createClient } from "@/utils/supabase/server";
import dynamic from "next/dynamic";

const PDF = dynamic(() => import("../../../../components/pdf/pdf"), {
  ssr: false,
});

export default async function Page() {
  const supabase = createClient();
  const { data: reservations } = await supabase.from("reservations").select();
  if (!reservations) return <></>;

  return (
    <main className={"h-full w-full"}>
      <PDF reservations={reservations} />
    </main>
  );
}
