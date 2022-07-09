import dbClient from "~~/server/dbClient";

export default defineEventHandler(async (event) => {
    return await dbClient.poema.findMany()
});