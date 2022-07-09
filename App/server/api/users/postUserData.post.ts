import dbClient from "~~/server/dbClient";

export default defineEventHandler(async (event) => {
    let req = await useBody(event) as {email: string, password: string};
    return await dbClient.user.findFirst({where: {email: req.email, password: req.password}});
});