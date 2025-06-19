import { registerOTel } from "@vercel/otel";

export function register() {
    registerOTel({
        autoDetectResources: true,
        serviceName: "VZW Ten Boomgaerde Lichtervelde",
    });
}
