import {Column, Container, Font, Head, Heading, Html, Link, Row, Section, Tailwind, Text} from "@react-email/components";

interface ReservatieBevestigingProps {
    fullName: string;
    reservationNumber: string;
    startDate: Date;
    startTime: String;
    endDate: Date;
    endTime: String;
    roomName: String;
    phoneNumber: String;
    organisationName: String;
    vatNumber: String;
    delAddress: String;
    delPostalCode: number;
    delCity: String;
    remarks: String;
}

export default function Email({
                                  fullName,
                                  reservationNumber,
                                  startDate,
                                  startTime,
                                  endDate,
                                  endTime,
                                  roomName,
                                  phoneNumber,
                                  organisationName,
                                  vatNumber,
                                  delAddress,
                                  delPostalCode,
                                  delCity,
                                  remarks
                              }: ReservatieBevestigingProps) {
    return <Html>
        <Head>
            <Font
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
        </Head>
        <Tailwind>
            <Container>
                <Heading as="h1">Dag {fullName}!</Heading>
                <Text className={"text-sm text-gray-500"}>
                    We hebben <Link href={"https://www.vzwtenboomgaerdelichtervelde.be/klant"}>uw reservering</Link> bij VZW Ten Boomgaerde Lichtervelde ontvangen. Deze is nog niet bevestigd. U kan
                    dit bekijken op de website bij uw reservering.
                    {/*U ontvangt een bevestigingsmail bij goedkeuring of afwijzing, met uw reserveringsnummer: [{"XXXX-XXX"}].*/}
                </Text>
            </Container>
            <Container>
                <Heading as="h1" className="text-lg font-semibold leading-none tracking-tight">Reservatie</Heading>
                <Section className={"border border-black border-solid px-2 rounded"}>
                    <Row><Text><b>Reservatienummer:</b> {reservationNumber}</Text></Row>
                    <Row>
                        <Column><Text><b>Van:</b><br/>{startDate?.toString()} ({startTime})</Text></Column>
                        <Column><Text><b>Tot:</b><br/>{endDate?.toString()} ({endTime})</Text></Column>
                    </Row>
                    <Row><Text><b>Zaal:</b> {roomName}</Text></Row>
                    <Row><Text><b>Telefoonnummer van de poort:</b> <Link href={"tel:+32480634334"}>+32 480 63 43 34</Link></Text></Row>
                </Section>
            </Container>
            <Container>
                <Heading as="h1" className="text-lg font-semibold leading-none tracking-tight">Reserverende partij</Heading>
                <Section className={"border border-black border-solid px-2 rounded"}>
                    <Row><Text><b>Verantwoordelijke:</b> {fullName}</Text></Row>
                    <Row><Text><b>Telefoonnummer van de verantwoordelijke:</b> {phoneNumber}</Text></Row>
                    <Row><Text><b>Organistatie:</b> {organisationName} <span className={"text-gray-500 text-sm"}>{vatNumber}</span></Text></Row>
                    <Row>
                        <Text>
                            <b>Factuuradres:</b>: {delAddress}, {delPostalCode} {delCity}
                        </Text>
                    </Row>
                </Section>
            </Container>
            <Container>
                <Heading as="h1" className="text-lg font-semibold leading-none tracking-tight">Opmerkingen</Heading>
                <Text className={"text-gray-500 text-sm border border-black border-solid p-2 rounded"}>
                    {remarks}
                </Text>
            </Container>
        </Tailwind>
    </Html>
}

{/* TODO: Telefoonnummer poort zeker toevoegen ( +32 480 63 43 34 ). Code aanpassen op maandag US-tijd, niet zondag. */
}