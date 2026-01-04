import React, { type ComponentPropsWithoutRef } from "react";

const PaginationItem = ({ ...props }: ComponentPropsWithoutRef<"li">) => (
    <li data-slot="pagination-item" {...props} />
);

export default PaginationItem;
