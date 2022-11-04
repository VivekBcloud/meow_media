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
        const { data, error } = await supabaseServerClient
            .from("Post")
            .select("*, user_email (image,name)");
        // console.log({ data });
        if (error) {
            throw error;
        }
        res.status(200).json(data);
    }

    if (req.method === "POST") {
        const { userId, content, imageUrl, user_email } = req.body;
        let { error } = await supabaseServerClient.from("Post").insert({
            user_id: userId,
            content,
            img_url: imageUrl,
            user_email,
        });
        if (error) throw error;
        res.status(200).json({ message: "successfully added new post" });
    }

    if (req.method === "PUT") {
        const { id, userId, content, imageUrl, user_email } = req.body;
        let { error } = await supabaseServerClient
            .from("Post")
            .update({
                user_id: userId,
                content,
                img_url: imageUrl,
                user_email,
            })
            .eq("id", id);
        if (error) throw error;
        res.status(200).json({ message: "successfully updated post" });
    }

    if (req.method === "DELETE") {
        const { id } = req.body;
        let { error } = await supabaseServerClient
            .from("Post")
            .delete()
            .eq("id", id);
        if (error) throw error;
        res.status(200).json({ message: "successfully updated post" });
    }
};

export default handler;
