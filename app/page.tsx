import { NextPage } from "next";

interface PageProps {}
const Page: NextPage<PageProps> = async ({}) => {
    return (
        <>
            <button type="button" className="bg-green-400">
                Hey
            </button>
        </>
    );
};
export default Page;
