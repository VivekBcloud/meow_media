import type { NextApiRequest, NextApiResponse } from 'next';
// import { supabaseServerClient } from "../../lib/supabase";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

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
      error: 'not_authenticated',
      description:
        'The user does not have an active session or is not authenticated',
    });

  if (req.method === 'GET') {
    const { data, error } = await supabaseServerClient
      .from('activities')
      .select('*')
      .limit(10)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return res.status(200).json(data);
  }
};

export default handler;
