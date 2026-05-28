import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validate, checkEligibilitySchema } from '../middleware/validate.js';
import { calculateEligibility } from '../services/matcherService.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/check', validate(checkEligibilitySchema), async (req, res, next) => {
  try {
    const { state, cropType, landSize, annualIncome, landOwnership } = req.body;

    const schemes = await prisma.scheme.findMany({
      where: { isActive: true },
      include: {
        eligibilityRules: true,
        documents: true,
        applicationSteps: {
          orderBy: { stepNumber: 'asc' }
        }
      }
    });

    const inputs = { state, cropType, landSize, annualIncome, landOwnership };
    const matchedSchemes = [];

    for (const scheme of schemes) {
      const { isEligible, matchScore } = calculateEligibility(scheme, inputs);
      if (isEligible) {
        matchedSchemes.push({ ...scheme, matchScore });
      }
    }

    // Sort by benefitAmount descending (parse if possible)
    matchedSchemes.sort((a, b) => {
      const amountA = parseFloat(a.benefitAmount) || 0;
      const amountB = parseFloat(b.benefitAmount) || 0;
      return amountB - amountA;
    });

    // Log the search
    await prisma.searchLog.create({
      data: {
        state,
        cropType,
        landSize,
        annualIncome,
        landOwnership,
        matchedCount: matchedSchemes.length
      }
    });

    res.json({ success: true, data: matchedSchemes });
  } catch (err) {
    next(err);
  }
});

export default router;
