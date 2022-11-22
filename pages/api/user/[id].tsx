import type { NextApiRequest, NextApiResponse } from 'next';
// import { supabaseServerClient } from "../../lib/supabase";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      console.log('called me with id', id);

      const { data, error } = await supabaseServerClient
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(502).json({ error });
    }
  }
};

export default handler;
