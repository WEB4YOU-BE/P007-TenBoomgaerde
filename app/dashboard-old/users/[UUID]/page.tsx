import InfoUserForm from "@/components/business/users/info-users-form";

export default async function Page({ params }: { params: { UUID: string } }) {
  return (
    <main className={"mx-auto flex flex-col gap-4 p-4 lg:px-8"}>
      <h1
        className={
          "truncate whitespace-nowrap text-center text-4xl font-extrabold tracking-tight md:flex-grow lg:text-5xl"
        }
      >
        Gebruiker bekijken
      </h1>
      <InfoUserForm id={params.UUID} />
    </main>
  );
}
