// import { Tables, TablesInsert } from "@/types/supabase/database";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import React, { useEffect } from "react";
// import { toast } from "sonner";
// import { z } from "zod";

// import { getCategoryById } from "./actions";

// const formSchema = z.object({
//     id: z.string().optional(),
//     name: z.string(),
// });
// interface Props {
//     id: string;
// }
// const UpdateCategoryForm = ({ id }: Props) => {
//     const { data, isPending } = useQuery({
//         networkMode: "online",
//         queryFn: () => getCategoryById(id),
//         queryKey: ["category", id],
//         retry: true,
//         staleTime: 1000 * 60, // 1 minute
//     });

//     const onSubmit = (formData: z.infer<typeof formSchema>) => {
//         console.log(formData);
//     };
//     const { mutate } = useMutation({
//         mutationFn: () => {},
//         mutationKey: ["UpdateCategory"],
//         networkMode: "online",
//         onError: (error) => {
//             toast.error(error.name, {
//                 description: error.message,
//             });
//         },
//         onSuccess: () => {
//             toast.success("De categorië is bijgewerkt!");
//         },
//     });

//     useEffect(() => {
//         if (data) {
//             console.log(data);
//         }
//     }, [data]);
// };

// export default UpdateCategoryForm;

// Ik was fucking moe, doe morgen wel verder.
