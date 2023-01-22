import { Invoice, InvoiceStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod"
import type { Session } from "next-auth";
import { db } from "../db";

const createSchema = z.object({
  clientId: z.string().optional(),
  dueDate: z.string().transform(s => new Date(s)).optional(),
})

const updateSchema = z.object({
  clientId: z.string().optional(),
  published: z.boolean().optional(),
  status: z.nativeEnum(InvoiceStatus).optional(),
  dueDate: z.string().transform(s => new Date(s)).optional()
})

const selectFields = {
  id: true,
  number: true,
  client: true,
  status: true,
  dueDate: true,
  published: true,
  createdAt: true,
}

export async function getInvoices(res: NextApiResponse, session: Session): Promise<void | NextApiResponse<Invoice | null>> {
  const { user } = session

  try {
    const invoices = await db.invoice.findMany({
      select: selectFields,
      where: {
        userId: user.id,
      },
    })

    return res.json(invoices)
  } catch (error) {
    return res.status(500).end()
  }
}

export async function createInvoice(req: NextApiRequest, res: NextApiResponse, session: Session): Promise<void | NextApiResponse<Invoice | null>> {
  const { user } = session

  try {
    const body = createSchema.parse(req.body)
    const invoice = await db.invoice.create({
      data: {
        dueDate: body.dueDate,
        user: {
          connect: { id: user.id }
        },
        ...(body.clientId && {
          client: {
            connect: { id: body.clientId }
          }
        })
      },
      select: selectFields,
    })

    return res.json(invoice)
  } catch(error) {

    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues)
    }

    console.log(error)

    return res.status(500).end()
  }
}

export async function deleteInvoice(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<Invoice | null>> {
  try {
    await db.invoice.delete({
      where: {
        id: req.query.id as string,
      },
    })

    return res.status(204).end()
  } catch (error) {
    return res.status(500).end()
  }
}

export async function updateInvoice(req: NextApiRequest, res: NextApiResponse, session: Session) {

  try {
    const itemId = req.query.id as string
    const invoice = await db.invoice.findUnique({
      where: {
        id: itemId,
      },
    })

    const body = updateSchema.parse(req.body)

    // TODO: Implement sanitization for content.

    await db.invoice.update({
      where: {
        id: invoice.id,
      },
      data: {
        client: {
          connect: { id: body.clientId || invoice.clientId, }
        },
        published: body.published || invoice.published,
        status: body.status || invoice.status,
        dueDate: body.dueDate || invoice.dueDate,
        updatedAt: new Date()
      },
    })

    return res.end()
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues)
    }

    return res.status(422).end()
  }
}