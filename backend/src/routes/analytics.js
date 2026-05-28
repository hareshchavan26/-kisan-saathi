import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/summary', async (req, res, next) => {
  try {
    const totalSearches = await prisma.searchLog.count();

    const topStatesGroup = await prisma.searchLog.groupBy({
      by: ['state'],
      _count: { state: true },
      orderBy: { _count: { state: 'desc' } },
      take: 5
    });

    const topCropsGroup = await prisma.searchLog.groupBy({
      by: ['cropType'],
      _count: { cropType: true },
      orderBy: { _count: { cropType: 'desc' } },
      take: 5
    });

    const avgMatchAgg = await prisma.searchLog.aggregate({
      _avg: { matchedCount: true }
    });

    res.json({
      success: true,
      data: {
        totalSearches,
        topStates: topStatesGroup.map(g => ({ state: g.state, count: g._count.state })),
        topCrops: topCropsGroup.map(g => ({ crop: g.cropType, count: g._count.cropType })),
        avgMatchCount: avgMatchAgg._avg.matchedCount || 0
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
