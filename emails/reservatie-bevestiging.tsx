import {Column, Container, Font, Head, Heading, Html, Link, Row, Section, Tailwind, Text} from "@react-email/components";

interface ReservatieBevestigingProps {
    voornaam: string
}

export default function Email({voornaam}: ReservatieBevestigingProps) {
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
                <Heading as="h1">Dag [Jens] {voornaam}!</Heading>
                <Text className={"text-sm text-gray-500"}>
                    We hebben <Link href={"https://www.vzwtenboomgaerdelichtervelde.be/klant"}>uw reservering</Link> bij VZW Ten Boomgaerde Lichtervelde ontvangen. Deze is nog niet bevestigd. U kan
                    dit bekijken op de website bij uw reservering.
                    {/*U ontvangt een bevestigingsmail bij goedkeuring of afwijzing, met uw reserveringsnummer: [{"XXXX-XXX"}].*/}
                </Text>
                <Section>
                    <Row>
                        <Heading as="h1" className="text-lg font-semibold leading-none tracking-tight">Reservatie</Heading>
                        <Section className={"border border-black border-solid px-2 rounded"}>
                            <Row><Text><b>Reservatienummer:</b> [{"XXXX-XXX"}]</Text></Row>
                            <Row>
                                <Column><Text><b>Van:</b><br/>[DATUM (UUR)]</Text></Column>
                                <Column><Text><b>Tot:</b><br/>[DATUM (UUR)]</Text></Column>
                            </Row>
                            <Row><Text><b>Zaal:</b> [{"Zaalnaam"}]</Text></Row>
                            <Row><Text><b>Telefoonnummer van de poort:</b> <Link href={"tel:+32480634334"}>+32 480 63 43 34</Link></Text></Row>
                        </Section>
                    </Row>
                    <Row>
                        <Heading as="h1" className="text-lg font-semibold leading-none tracking-tight">Reserverende partij</Heading>
                        <Section className={"border border-black border-solid px-2 rounded"}>
                            <Row><Text><b>Verantwoordelijke:</b> [{"VOLLEDIGE_NAAM (TELEFOONNUMMER)"}]</Text></Row>
                            <Row><Text><b>Organistatie:</b> [{"ORG_NAAM (BTW-NUMMER)"}]</Text></Row>
                            <Row>
                                <Text>
                                    <b>Factuuradres:</b>: [STAART NR], [POSTNR STAD]
                                </Text>
                            </Row>
                        </Section>
                    </Row>
                    <Row>
                        <Heading key={"hey"} as="h1" className="text-lg font-semibold leading-none tracking-tight">Opmerkingen</Heading>
                        <Text key={"hoi"} className={"text-gray-500 text-sm border border-black border-solid p-2 rounded"}>
                            [Meegegeven opmerking]
                        </Text>
                    </Row>
                </Section>
            </Container>
        </Tailwind>
    </Html>
}

{/* TODO: Telefoonnummer poort zeker toevoegen ( +32 480 63 43 34 ). Code aanpassen op maandag US-tijd, niet zondag. */
}