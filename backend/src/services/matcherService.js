export function calculateEligibility(scheme, inputs) {
  let passedCount = 0;
  let totalRules = 0;

  for (const rule of scheme.eligibilityRules) {
    if (rule.operator === "any") {
      continue; // any always passes, does not count against matchScore
    }
    
    totalRules++;
    
    let isPass = false;
    const inputValue = inputs[rule.field];

    if (inputValue === undefined || inputValue === null) {
      continue;
    }

    try {
      if (rule.operator === "equals") {
        isPass = (String(inputValue).toLowerCase() === JSON.parse(rule.value).toLowerCase());
      } else if (rule.operator === "in") {
        const allowedValues = JSON.parse(rule.value);
        if (Array.isArray(allowedValues)) {
          isPass = allowedValues.map(v => String(v).toLowerCase()).includes(String(inputValue).toLowerCase());
        }
      } else if (rule.operator === "lte") {
        isPass = (parseFloat(inputValue) <= parseFloat(rule.value));
      } else if (rule.operator === "gte") {
        isPass = (parseFloat(inputValue) >= parseFloat(rule.value));
      }
    } catch(err) {
      // rule parsing error
    }

    if (isPass) {
      passedCount++;
    }
  }

  // If a scheme has no restricting rules, it's a 100% match automatically.
  // Otherwise, a scheme ONLY is eligible if ALL its rules passed.
  const isEligible = (passedCount === totalRules);
  const matchScore = totalRules === 0 ? 100 : Math.round((passedCount / totalRules) * 100);

  return { isEligible, matchScore };
}
