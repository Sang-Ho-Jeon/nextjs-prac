import { NextApiRequest, NextApiResponse } from "next";

export default async function hanlder(
  req:NextApiRequest,
  res:NextApiResponse
) {
  try{
    await res.revalidate('/')
    return res.json({ revalidate: true });
  } catch(err) {
    res.status(500).send("Revalidation Failed");
    console.log(err);
  }
}