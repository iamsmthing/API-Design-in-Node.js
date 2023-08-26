import { timeStamp } from "console";
import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  const product = await prisma.update.findUnique({
    where: {
      id: req.user.id,
    },
  });
  res.json({ data: product });
};

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    console.log(allUpdates);
    console.log(product);
    return [...allUpdates, ...product.updates];
  }, []);
  res.json({ data: updates });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.id,
    },
  });
  if (!product) {
    return res.json({ message: "Product not found" });
  }

  const update = await prisma.update.create({
    data: req.body,
  });
  res.json({ data: update });
};

export const updateUpdate = async () => {};

export const deleteUpdate = async () => {};
