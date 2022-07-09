import { User } from ".prisma/client";
import dbClient from "~~/server/dbClient";

export default defineEventHandler(async (event) => {
    let req = await useBody(event) as User;
    return await dbClient.user.create({data: {
        name:  req.name,
        email: req.email,
        password: req.password
    }});
});