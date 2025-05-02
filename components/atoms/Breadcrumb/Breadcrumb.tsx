import React, { type ComponentPropsWithRef } from "react";

const Breadcrumb = ({ ...props }: ComponentPropsWithRef<"nav">) => (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
);

export default Breadcrumb;
