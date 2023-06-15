import Link from "next/link";

export default function Index() {
    return <main className={"w-full h-[100svh] flex flex-col gap-4 justify-between p-4"}>
        <span className={"text-lg md:text-xl font-semibold"}>VZW Ten Boomgaerde Lichtervelde</span>
        <span className={"text-7xl md:text-9xl text-center font-extrabold"} lang="nl-BE">Coming soon!</span>
        <span className={"font-light"}>Onder constructie bij <Link className={"text-blue-800 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-100"} href="https://web-4-you.be" target={"_blank"}>WEB4YOU</Link></span>
    </main>;
}
