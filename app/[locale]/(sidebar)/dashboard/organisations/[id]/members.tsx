"use client";

import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useQuery } from "@tanstack/react-query";
import parsePhoneNumberFromString from "libphonenumber-js";
import React, { useCallback } from "react";

import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/atoms/Table";
import { Link } from "@/i18n/navigation";
import getMembersForOrganisationAdmin, {
    GetMembersForOrganisationAdminResponse,
} from "@/service/organisations/getMembersForOrganisationAdmin";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

interface MembersSectionProps {
    organisationId: string;
}

const MembersSection = ({ organisationId }: MembersSectionProps) => {
    const queryFn = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getMembersForOrganisationAdmin({ organisationId, signal }),
        [organisationId]
    );

    const { data: members, isLoading } =
        useQuery<GetMembersForOrganisationAdminResponse>({
            queryFn,
            queryKey: ["organisationMembers", organisationId],
        });

    const formatPhone = (phone: string | null) => {
        if (!phone) return "-";
        const parsed = parsePhoneNumberFromString(phone, {
            defaultCountry: "BE",
        });
        return parsed ? parsed.formatInternational() : phone;
    };

    const formatAddress = (member: NonNullable<typeof members>[number]) => {
        const street = [member.address_street, member.address_number]
            .filter(Boolean)
            .join(" ");
        const city = [member.address_postal_code, member.address_city]
            .filter(Boolean)
            .join(" ");
        const address = [street, city].filter(Boolean).join(", ");
        return address || "-";
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Leden</CardTitle>
                <CardDescription>
                    Alle leden van deze organisatie
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <SpinnerBallIcon className="size-8 animate-spin" />
                    </div>
                ) : !members || members.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                        Geen leden gevonden
                    </p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Naam</TableHead>
                                <TableHead>E-mail</TableHead>
                                <TableHead>Telefoon</TableHead>
                                <TableHead>Adres</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member) => {
                                const fullName = [
                                    member.firstname,
                                    member.lastname,
                                ]
                                    .filter(Boolean)
                                    .join(" ")
                                    .trim();
                                return (
                                    <TableRow key={member.id}>
                                        <TableCell>{fullName || "-"}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>
                                            {formatPhone(member.phone)}
                                        </TableCell>
                                        <TableCell>
                                            {formatAddress(member)}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                className={cn(
                                                    buttonVariants({
                                                        size: "sm",
                                                        variant: "outline",
                                                    })
                                                )}
                                                href={`/dashboard/users/${member.id}`}
                                            >
                                                Bekijken
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};

export default MembersSection;
