import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { storeName } = req.query;
  const { data, error } = await supabase
    .from("measurements")
    .select()
    .eq("hotel", storeName as string);
  if (data) res.status(200).json({ data });
}

// add storename
