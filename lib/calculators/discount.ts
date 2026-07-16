export interface DiscountResult {
  discountAmount: number;
  priceAfterDiscount: number;
  additionalTaxAmount: number;
  finalPrice: number;
  totalSavings: number;
  effectiveDiscountPercent: number;
}

export type DiscountValidationResult =
  | { valid: true }
  | { valid: false; error: string };

export function validateDiscountInput(
  originalPrice: number,
  discountPercent: number,
  taxPercent: number,
): DiscountValidationResult {
  if (!Number.isFinite(originalPrice) || originalPrice < 0) {
    return { valid: false, error: "Enter a valid original price." };
  }
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    return { valid: false, error: "Discount must be between 0 and 100%." };
  }
  if (!Number.isFinite(taxPercent) || taxPercent < 0) {
    return { valid: false, error: "Tax must be zero or a positive number." };
  }
  return { valid: true };
}

/**
 * Calculates the discounted price and, optionally, price after applying a
 * tax on top of the discounted amount (common for retail: discount is
 * applied first, then sales tax on the reduced price).
 */
export function calculateDiscount(
  originalPrice: number,
  discountPercent: number,
  taxPercent = 0,
): DiscountResult {
  const validation = validateDiscountInput(originalPrice, discountPercent, taxPercent);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const discountAmount = (originalPrice * discountPercent) / 100;
  const priceAfterDiscount = originalPrice - discountAmount;
  const additionalTaxAmount = (priceAfterDiscount * taxPercent) / 100;
  const finalPrice = priceAfterDiscount + additionalTaxAmount;
  const totalSavings = originalPrice - finalPrice;
  const effectiveDiscountPercent =
    originalPrice === 0 ? 0 : (totalSavings / originalPrice) * 100;

  return {
    discountAmount,
    priceAfterDiscount,
    additionalTaxAmount,
    finalPrice,
    totalSavings,
    effectiveDiscountPercent,
  };
}
