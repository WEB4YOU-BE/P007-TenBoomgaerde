import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface ReservationCreatedEmailProps {
    bookerFirstName: string;
    bookerLastName: string;
    endDate: string;
    hallNames: string[];
    isParty: boolean;
    organisationName: string | null;
    remarks: string | null;
    reservationNumber: string;
    startDate: string;
}

const ReservationCreatedEmail = ({
    bookerFirstName,
    bookerLastName,
    endDate,
    hallNames,
    isParty,
    organisationName,
    remarks,
    reservationNumber,
    startDate,
}: ReservationCreatedEmailProps) => {
    const fullName = `${bookerFirstName} ${bookerLastName}`.trim();

    return (
        <Html lang="nl">
            <Head />
            <Preview>
                Uw reservatie {reservationNumber} is ontvangen - Ten Boomgaerde
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>Reservatie ontvangen</Heading>

                    <Text style={paragraph}>Beste {fullName},</Text>

                    <Text style={paragraph}>
                        Bedankt voor uw reservatie bij Ten Boomgaerde. Uw
                        aanvraag is succesvol ontvangen en wordt zo snel
                        mogelijk verwerkt.
                    </Text>

                    <Section style={detailsSection}>
                        <Heading as="h2" style={subheading}>
                            Reservatiegegevens
                        </Heading>

                        <table style={table}>
                            <tbody>
                                <tr>
                                    <td style={labelCell}>Reservatienummer:</td>
                                    <td style={valueCell}>
                                        {reservationNumber}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={labelCell}>Naam:</td>
                                    <td style={valueCell}>{fullName}</td>
                                </tr>
                                {organisationName ? (
                                    <tr>
                                        <td style={labelCell}>Organisatie:</td>
                                        <td style={valueCell}>
                                            {organisationName}
                                        </td>
                                    </tr>
                                ) : null}
                                <tr>
                                    <td style={labelCell}>Start:</td>
                                    <td style={valueCell}>{startDate}</td>
                                </tr>
                                <tr>
                                    <td style={labelCell}>Einde:</td>
                                    <td style={valueCell}>{endDate}</td>
                                </tr>
                                <tr>
                                    <td style={labelCell}>Zaal/zalen:</td>
                                    <td style={valueCell}>
                                        {hallNames.join(", ")}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={labelCell}>Type:</td>
                                    <td style={valueCell}>
                                        {isParty ? "Feest" : "Standaard"}
                                    </td>
                                </tr>
                                {remarks ? (
                                    <tr>
                                        <td style={labelCell}>Opmerkingen:</td>
                                        <td style={valueCell}>{remarks}</td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </Section>

                    <Hr style={hr} />

                    <Section style={noteSection}>
                        <Text style={noteText}>
                            <strong>Belangrijk:</strong> Uw reservatie wordt
                            momenteel beoordeeld. Zodra deze is goedgekeurd,
                            ontvangt u een bevestigingsmail met uw toegangscode.
                        </Text>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Met vriendelijke groeten,
                        <br />
                        VZW Ten Boomgaerde Lichtervelde
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main: React.CSSProperties = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid #e6ebf1",
    borderRadius: "5px",
    margin: "40px auto",
    maxWidth: "600px",
    padding: "40px",
};

const heading: React.CSSProperties = {
    color: "#1f2937",
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "1.25",
    marginBottom: "24px",
    textAlign: "center",
};

const subheading: React.CSSProperties = {
    color: "#374151",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.25",
    marginBottom: "16px",
};

const paragraph: React.CSSProperties = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "1.625",
    marginBottom: "16px",
};

const detailsSection: React.CSSProperties = {
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    marginBottom: "24px",
    marginTop: "24px",
    padding: "20px",
};

const table: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%",
};

const labelCell: React.CSSProperties = {
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
    padding: "8px 12px 8px 0",
    verticalAlign: "top",
    width: "140px",
};

const valueCell: React.CSSProperties = {
    color: "#1f2937",
    fontSize: "14px",
    padding: "8px 0",
    verticalAlign: "top",
};

const hr: React.CSSProperties = {
    borderColor: "#e6ebf1",
    borderStyle: "solid",
    borderWidth: "1px 0 0 0",
    margin: "24px 0",
};

const noteSection: React.CSSProperties = {
    backgroundColor: "#fef3c7",
    borderLeft: "4px solid #f59e0b",
    borderRadius: "4px",
    padding: "16px",
};

const noteText: React.CSSProperties = {
    color: "#92400e",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0",
};

const footer: React.CSSProperties = {
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "1.5",
    textAlign: "center",
};

export default ReservationCreatedEmail;
export type { ReservationCreatedEmailProps };
