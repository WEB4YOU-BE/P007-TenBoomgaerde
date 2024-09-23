"use server";

import createClient from "@/utils/supabase/server";

export const fetchAccount = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
};

export const fetchUser = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.from("users").select().eq("id", id);
    if (error) throw error;
    return data;
};

export interface User {
    city: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    postcode: string;
    street: string;
}
export const updateUser = async ({ id, user }: { id: string; user: User }) => {
    const supabase = createClient();
    const { error } = await supabase.from("users").update(user).eq("id", id);
    if (error) throw error;
    return;
};
