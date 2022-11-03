import type { NextApiRequest, NextApiResponse } from "next";
// import { supabaseServerClient } from "../../lib/supabase";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, content, imageUrl, user_email } = req.body;
    const supabaseServerClient = createServerSupabaseClient({
        req,
        res,
    });
    let { error } = await supabaseServerClient
        .from("Post")
        .insert({ user_id: userId, content, img_url: imageUrl, user_email });
    if (error) throw error;
    res.status(200).json({ message: "successfully added new post" });
};

export default handler;
