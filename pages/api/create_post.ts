import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServerClient } from "../../lib/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, content, image } = req.body;

    let { error } = await supabaseServerClient
        .from("post")
        .upsert({ user_id: userId, content, image });
    if (error) throw error;
    res.status(200).json({ message: "successfully added new post" });
};

export default handler;