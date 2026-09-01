# Manual Test Plan — Shopware 6 Guest Checkout

**Scope:** A guest visitor finds a product, adds it to the cart, and places an order with Cash on Delivery.  
**Environment:** Shopware 6 public demo, current Chrome/Edge on Windows 11, https://www.shopware6-demo.development-s25.com/  
**Test data:** Valid fictional customer/address data; use a unique email address for each checkout.

| ID | Title | Preconditions | Steps | Expected result | Priority |
|---|---|---|---|---|---|
| POS-01 | Complete guest checkout with Cash on Delivery | Storefront is available | 1. Open home page. 2. Open any in-stock product. 3. Add it to cart. 4. Go to checkout. 5. Choose guest checkout. 6. Fill valid required customer/address fields. 7. Select Cash on Delivery. 8. Accept terms. 9. Confirm order. | Cart contains the product; confirmation page displays an order number and the selected payment method. | High |
| POS-02 | Search then purchase | Storefront is available | 1. Search for a known product term. 2. Open a result. 3. Add to cart. 4. Complete POS-01 steps 4–9. | Search results are relevant and the order is confirmed. | High |
| POS-03 | Buy a product with a variant | Product with sizes/variants is available | 1. Open variant product. 2. Choose a valid variant. 3. Add to cart. 4. Complete checkout. | Selected variant and its price appear consistently in cart and order confirmation. | High |
| POS-04 | Change quantity before checkout | Product is in cart | 1. Set quantity to 2. 2. Verify line total. 3. Complete guest checkout. | Quantity and totals update correctly; order shows quantity 2. | Medium |
| POS-05 | Use valid special characters in name | Product is in cart | 1. Checkout as guest. 2. Enter a realistic name such as `Ana-Maria O'Neil`. 3. Complete checkout. | Valid human-name punctuation is accepted and shown correctly. | Medium |
| NEG-01 | Checkout with empty cart | Cart is empty | 1. Open checkout URL or click Checkout. | User cannot place an order; a clear empty-cart message/action is shown. | High |
| NEG-02 | Required fields left blank | Product is in cart | 1. Start guest checkout. 2. Leave email, first name, address, postal code, or city blank. 3. Continue. | Inline validation identifies every required missing field; checkout does not continue. | High |
| NEG-03 | Invalid email address | Product is in cart | 1. Start guest checkout. 2. Enter `test@domain` as email. 3. Continue. | Clear invalid-email error is displayed; order cannot be submitted. | High |
| EDGE-01 | Quantity boundaries | Product is in cart | 1. Attempt quantity 0. 2. Attempt quantity 101 (or the configured maximum + 1). | Invalid quantity is blocked or corrected; total never becomes invalid. | Medium |
| EDGE-02 | Long customer data | Product is in cart | 1. Enter 255+ characters in first name/address where the UI allows it. 2. Continue. | The UI enforces a documented maximum or shows a useful validation error without breaking layout. | Low |

## Entry and exit criteria

Run on a clean guest session. Record browser/version and screenshots for failures. A test passes only when each expected result is observed; log defects with reproducible steps.
