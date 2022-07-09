import dbClient from "~~/server/dbClient";

export default defineEventHandler(async (event) => {
  return await dbClient.comment.findMany();
});
