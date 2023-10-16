const { PrismaClient } = require('@prisma/client');

const router = require('express').Router();
const prisma = new PrismaClient();

router.post('/categories', async (req, res, next) => {
  try {
    const category = await prisma.category.create({
      data: req.body
    })
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true }
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const category = await prisma.product.create({
      data: req.body
    })
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: +req.params.id
      },
      include: { category: true }
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: +req.params.id
      }
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/products/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: +req.params.id
      },
      data: req.body,
      include: { category: true }
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
