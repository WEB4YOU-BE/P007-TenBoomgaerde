import {Container, Font, Head, Heading, Hr, Html, Section, Tailwind, Text} from "@react-email/components";

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
                {/*<Heading as="h1">Reservatie ontvangen!</Heading>*/}
                <Section className={"rounded-lg border border-solid bg-card text-card-foreground shadow-sm"}>
                    <div className="flex flex-col px-6 pt-4">
                        <Heading as="h1" className="text-lg font-semibold leading-none tracking-tight">ZAALNAAM</Heading>
                        <Text className={"text-sm text-gray-500"}>Reservatie-ID: {voornaam} {"XXXX-XXX"}</Text>
                    </div>
                    <Hr/>
                </Section>
            </Container>
        </Tailwind>
    </Html>
}

{/* TODO: Telefoonnummer poort zeker toevoegen ( +32 480 63 43 34 ). Code aanpassen op maandag US-tijd, niet zondag. */
}