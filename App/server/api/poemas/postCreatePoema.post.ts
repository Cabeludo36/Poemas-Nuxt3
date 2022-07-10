import { Poema } from ".prisma/client";
import dbClient from "~~/server/dbClient";

export default defineEventHandler(async (event) => {
  let req = (await useBody(event)) as Poema;
  return await dbClient.poema.create({
    data: {
        title: req.title,
        content: req.content,
        userId: req.userId,
    }
  });
});
