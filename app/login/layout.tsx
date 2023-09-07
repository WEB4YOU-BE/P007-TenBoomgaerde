export default function Layout({children}: { children: React.ReactNode }) {
    return <div className={"h-full flex flex-col justify-center"}>
        <div className={"flex flex-row justify-center p-4"}>
            {children}
        </div>
    </div>
}