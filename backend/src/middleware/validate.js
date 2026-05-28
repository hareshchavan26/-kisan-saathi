import { z } from 'zod';

export const checkEligibilitySchema = z.object({
  body: z.object({
    state: z.string({ required_error: "State is required" }),
    cropType: z.string({ required_error: "Crop type is required" }),
    landSize: z.number({ required_error: "Land size is required" }),
    annualIncome: z.number({ required_error: "Annual income is required" }),
    landOwnership: z.string({ required_error: "Land ownership is required" })
  })
});

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      details: err.errors
    });
  }
};
