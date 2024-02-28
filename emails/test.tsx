import {Container, Head, Heading, Hr, Html, Preview, Text} from "@react-email/components";
import * as React from "react";

export default function Email() {
    return <Html lang="nl-BE" dir="ltr">
        <Head>
            <title>Dit is een test-mail.</title>
        </Head>
        <Preview>Dit is de tekst die je ziet voordat de mail open is.</Preview>
        <Container>
            <Heading as="h1">Test mail</Heading>
            <Text>Deze mail is slechts een fictief voorbeeld van hoe mails eruit kunnen zien.</Text>
            <Hr/>
            <Text>Enkel verzonden om Resend mails te testen.</Text>
        </Container>
    </Html>

}
