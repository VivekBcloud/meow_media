import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const { post_id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await supabaseServerClient
      .from('Comment')
      .select('*')
      .eq('post_id', post_id)
      .order('created_at', { ascending: false });

    // console.log({ data });
    if (error) {
      throw error;
    }
    res.status(200).json(data);
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
    const { user_id, comment } = req.body;
    const { error } = await supabaseServerClient.from('Comment').insert({
      user_id,
      comment,
      post_id,
    });
    if (error) throw error;
    res.status(200).json({ message: 'successfully added comment' });
  }
};
export default handler;
