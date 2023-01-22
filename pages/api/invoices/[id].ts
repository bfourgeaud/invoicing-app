import { unstable_getServerSession } from "next-auth/next";

import { HttpMethod } from "@/types";
import { authOptions } from "@/lib/auth";

import type { NextApiRequest, NextApiResponse } from "next";
import { deleteInvoice, updateInvoice } from "@/lib/api/invoice";


export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(403).end();

  switch (req.method) {
    case HttpMethod.DELETE:
      return deleteInvoice(req, res);
    case HttpMethod.PUT:
      return updateInvoice(req, res, session);
    default:
      res.setHeader("Allow", [
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
