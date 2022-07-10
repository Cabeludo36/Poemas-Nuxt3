import dbClient from "~~/server/dbClient";

export default defineEventHandler(async () => {
  return await dbClient.poema.findMany();
});
