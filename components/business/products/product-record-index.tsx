import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface ProductRecordIndexProps {
    id: string;
    name?: string;
    price?: number | null;
    forSale?: boolean;
    category?: string | null;
}


export default async function ProductRecordIndex({id, name, price, forSale, category}: ProductRecordIndexProps) {
    return <tr className={"hover:bg-gray-100"} key={id}>
        <td className={"p-3 text-xs sm:text-base font-medium text-gray-900 whitespace-nowrap"}>
            <data value={"naam"}>{name}</data>
        </td>
        <td className={"p-3 text-xs sm:text-base font-medium text-gray-900 whitespace-nowrap"}>
            <data value={"price"}>&euro; {price}</data>
        </td>
        <td className={"p-3 text-xs sm:text-base font-medium text-gray-900 whitespace-nowrap"}>
            <data value={"category"}>{category}</data>
        </td>
        <td>
            <div className={"flex items-center p-4"}>
                <input
                    id={`checkbox-${forSale}`}
                    checked={!!forSale}
                    readOnly={true}
                    aria-describedby={"checkbox-1"}
                    type={"checkbox"}
                    className={"w-3 sm:w-4 h-3 sm:h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"}
                />
            </div>
        </td>
        <td className={"p-3 space-x-2 whitespace-nowrap"}>
            <Link
                className={cn(buttonVariants({variant: "green"}))}
                href={`/dashboard/producten/${id}`}
            >
                <svg
                    className={"w-3 sm:w-4 h-3 sm:h-4"}
                    fill={"currentColor"}
                    viewBox={"0 0 20 20"}
                    xmlns={"http://www.w3.org/2000/svg"}
                >
                    <svg>
                        <path
                            d={"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"}/>
                        <path
                            fillRule={"evenodd"}
                            d={"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"}
                            clipRule={"evenodd"}
                        />
                    </svg>
                </svg>
                <span className={"sm:ml-2 hidden sm:block"}>Bewerk</span>
            </Link>
            <button
                className={cn(buttonVariants({variant: "destructive"}))}
            >
                <svg
                    className={"w-3 sm:w-4 h-3 sm:h-4"}
                    fill={"currentColor"}
                    viewBox={"0 0 20 20"}
                    xmlns={"http://www.w3.org/2000/svg"}
                >
                    <path
                        fillRule={"evenodd"}
                        d={"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"}
                        clipRule={"evenodd"}
                    />
                </svg>
                <span className={"sm:ml-2 hidden sm:block"}>Verwijder</span>
            </button>
        </td>
    </tr>
}