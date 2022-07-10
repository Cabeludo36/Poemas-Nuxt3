import dbClient from "~~/server/dbClient";

export default defineEventHandler(async (event) => {
  try {
    let id = Number(event.context.params.id);
    let res =  await dbClient.poema.findFirst({
      where: {
          active: true,
          poemaId: id,
      },
    });
    if (!res) {
      throw new Error("Poema not found");
    }
    return res;
  } catch (error) {
    return error
  }
});
