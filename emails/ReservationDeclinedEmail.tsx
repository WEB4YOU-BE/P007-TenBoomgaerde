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

interface ReservationDeclinedEmailProps {
    bookerFirstName: string;
    bookerLastName: string;
    reservationNumber: string;
    startDate: string;
}

const ReservationDeclinedEmail = ({
    bookerFirstName,
    bookerLastName,
    reservationNumber,
    startDate,
}: ReservationDeclinedEmailProps) => {
    const fullName = `${bookerFirstName} ${bookerLastName}`.trim();

    return (
        <Html lang="nl">
            <Head />
            <Preview>
                Uw reservatie {reservationNumber} is helaas afgewezen - Ten
                Boomgaerde
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>Reservatie afgewezen</Heading>

                    <Text style={paragraph}>Beste {fullName},</Text>

                    <Text style={paragraph}>
                        Helaas moeten wij u meedelen dat uw reservatie{" "}
                        <strong>{reservationNumber}</strong> niet kon worden
                        goedgekeurd.
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
                                    <td style={labelCell}>
                                        Aangevraagde datum:
                                    </td>
                                    <td style={valueCell}>{startDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Section>

                    <Hr style={hr} />

                    <Section style={noteSection}>
                        <Text style={noteText}>
                            Heeft u vragen over deze beslissing? Neem dan gerust
                            contact met ons op. U bent uiteraard welkom om een
                            nieuwe reservatie aan te vragen voor een andere
                            datum.
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
    color: "#dc2626",
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
    width: "160px",
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
    backgroundColor: "#f3f4f6",
    borderLeft: "4px solid #6b7280",
    borderRadius: "4px",
    padding: "16px",
};

const noteText: React.CSSProperties = {
    color: "#374151",
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

export default ReservationDeclinedEmail;
export type { ReservationDeclinedEmailProps };
