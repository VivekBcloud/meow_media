import type { NextApiRequest, NextApiResponse } from 'next';
// import { supabaseServerClient } from "../../lib/supabase";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseServerClient = createServerSupabaseClient({
        req,
        res,
    });
    if (req.method === 'GET') {
        const { data, error } = await supabaseServerClient
            .from('Like')
            .select('*');

        if (error) throw error;
        return res.status(200).json(data);
    }
    const {
        data: { session },
    } = await supabaseServerClient.auth.getSession();

    if (!session)
        return res.status(401).json({
            error: 'not_authenticated',
            description:
                'The user does not have an active session or is not authenticated',
        });

    if (req.method === 'POST') {
        const { user_id, post_id } = req.body;
        const { error } = await supabaseServerClient.from('Like').upsert({
            user_id,
            post_id,
        });
        if (error) throw error;
        return res.status(200).json({ message: 'successfully liked' });
    }

    if (req.method === 'DELETE') {
        const { post_id, user_id } = req.body;
        const { error } = await supabaseServerClient
            .from('Like')
            .delete()
            .match({ post_id, user_id });

        if (error) throw error;
        return res.status(200).json({ message: 'successfully removed like' });
    }
};

export default handler;
