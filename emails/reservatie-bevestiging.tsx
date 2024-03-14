import {CodeInline, Container, Font, Head, Heading, Html, Row, Section, Tailwind, Text} from "@react-email/components";

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
                <Heading as="h1">Dag [Jens]!</Heading>
                <Text className={"text-sm text-gray-500"}>We hebben uw reservering bij VZW Ten Boomgaerde ontvangen in Lichtervelde. Deze is nog niet bevestigd. U ontvangt een bevestigingsmail bij
                    goedkeuring of afwijzing, met uw reserveringsnummer: [{"XXXX-XXX"}].</Text>
                <Section>
                    <Row>
                        <Heading as="h1" className="text-lg font-semibold leading-none tracking-tight">Reservatie</Heading>
                    </Row>
                    <Row>
                        <Heading as="h1" className="text-lg font-semibold leading-none tracking-tight">Organisatie</Heading>
                    </Row>
                    <Row>
                        <Heading as="h1" className="text-lg font-semibold leading-none tracking-tight">Verantwoordelijke</Heading>
                    </Row>
                    <Row>
                        <Heading key={"hey"} as="h1" className="text-lg font-semibold leading-none tracking-tight">Opmerkingen</Heading>
                        <CodeInline key={"hoi"} className={"text-gray-500 text-sm"}>
                            [Meegegeven opmerking]
                        </CodeInline>
                    </Row>
                </Section>
            </Container>
        </Tailwind>
    </Html>
}

{/* TODO: Telefoonnummer poort zeker toevoegen ( +32 480 63 43 34 ). Code aanpassen op maandag US-tijd, niet zondag. */
}