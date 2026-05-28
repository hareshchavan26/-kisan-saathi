import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ success: true, data: [] });
    }

    const schemes = await prisma.scheme.findMany({
      where: {
        isActive: true,
        OR: [
          { nameEn: { contains: String(q) } },
          { nameHi: { contains: String(q) } },
          { descriptionEn: { contains: String(q) } },
          { descriptionHi: { contains: String(q) } }
        ]
      },
      take: 10
    });

    res.json({ success: true, data: schemes });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const scheme = await prisma.scheme.findUnique({
      where: { id: req.params.id },
      include: {
        documents: true,
        applicationSteps: {
          orderBy: { stepNumber: 'asc' }
        }
      }
    });

    if (!scheme) {
      return res.status(404).json({ success: false, error: 'Scheme not found', code: 'NOT_FOUND' });
    }

    res.json({ success: true, data: scheme });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const schemes = await prisma.scheme.findMany({
      where: { isActive: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.scheme.count({ where: { isActive: true } });

    res.json({
      success: true,
      data: schemes,
      meta: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
