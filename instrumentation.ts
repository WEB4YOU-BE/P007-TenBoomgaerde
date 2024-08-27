import { registerOTel } from "@vercel/otel";

export function register() {
    registerOTel({
        serviceName: "VZW Ten Boomgaerde Lichtervelde",
        autoDetectResources: true,
    });
}
