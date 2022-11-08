import type { NextApiRequest, NextApiResponse } from "next";
// import { supabaseServerClient } from "../../lib/supabase";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseServerClient = createServerSupabaseClient({
        req,
        res,
    });
    const {
        data: { session },
    } = await supabaseServerClient.auth.getSession();

    if (!session)
        return res.status(401).json({
            error: "not_authenticated",
            description:
                "The user does not have an active session or is not authenticated",
        });
    if (req.method === "GET") {
        const { user_id } = req.body;
        let { data, error } = await supabaseServerClient
            .from("Like")
            .select("*")
            .eq("user_id", user_id);

        if (error) throw error;
        res.status(200).json(data);
    }
    if (req.method === "POST") {
        const { user_id, post_id } = req.body;
        let { error } = await supabaseServerClient.from("Like").upsert({
            user_id,
            post_id,
        });
        if (error) throw error;
        res.status(200).json({ message: "successfully liked" });
    }
    if (req.method === "DELETE") {
        const { post_id, user_id } = req.body;
        let { error } = await supabaseServerClient
            .from("Like")
            .delete()
            .eq("post_id", post_id)
            .eq("user_id", user_id);

        if (error) throw error;
        res.status(200).json({ message: "successfully removed like" });
    }
};

export default handler;
