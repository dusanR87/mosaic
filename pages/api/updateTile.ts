// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MosaicTile, prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const bodyParser = require('body-parser')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MosaicTile>
) {
  const prisma = new PrismaClient();
  const tile: MosaicTile = JSON.parse(req.body);

  try {
    const mosaicTile = await prisma.mosaicTile.update({
      where: {
        x_y: { x: tile.x,  y: tile.y }
      },
      data: {
        color: "0070f3",
      }
    })
   return res.send(mosaicTile);
  } catch (error) {
   return res.status(500).json({} as MosaicTile);
  }
 
  
}
