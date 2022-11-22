import type { NextApiRequest, NextApiResponse } from 'next';
// import { supabaseServerClient } from "../../lib/supabase";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  // const {
  //     data: { session },
  // } = await supabaseServerClient.auth.getSession();

  // if (!session)
  //     return res.status(401).json({
  //         error: "not_authenticated",
  //         description:
  //             "The user does not have an active session or is not authenticated",
  //     });
  if (req.method === 'GET') {
    try {
      const { username } = req.query;
      console.log('called me with username', username);

      const { data, error } = await supabaseServerClient
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();
      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(502).json({ error });
    }
  }
};

export default handler;
