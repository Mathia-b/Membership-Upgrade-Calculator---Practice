/* ==========================================================
   MEMBERSHIP UPGRADE CALCULATOR
   PRACTICE VERSION

   No prorating is performed.

   Calculation:
   Current Membership Price + $12
   ========================================================== */


/* ==========================================================
   PRACTICE MEMBERSHIP PRICES

   Replace these with your desired practice prices.
   ========================================================== */

const MEMBERSHIP_RATES = {

  "Young Adult": 42.00,

  "Adult": 68.00,

  "Senior": 58.00,

  "One Adult Household": 78.00,

  "Household": 92.00

};


/* ==========================================================
   FIXED UPGRADE AMOUNT
   ========================================================== */

const UPGRADE_AMOUNT = 12.00;


/* ==========================================================
   CALCULATE UPGRADED AMOUNT
   ========================================================== */

function calculateUpgrade(membershipType) {

  const currentPrice =
    MEMBERSHIP_RATES[membershipType];


  if (currentPrice === undefined) {

    throw new Error(
      "The selected membership price could not be found."
    );

  }


  const upgradedPrice =
    currentPrice + UPGRADE_AMOUNT;


  return {

    currentPrice:
      roundCurrency(currentPrice),

    upgradeAmount:
      roundCurrency(UPGRADE_AMOUNT),

    upgradedPrice:
      roundCurrency(upgradedPrice)

  };

}


/* ==========================================================
   ROUND TO TWO DECIMAL PLACES
   ========================================================== */

function roundCurrency(amount) {

  return Math.round(
    (amount + Number.EPSILON) * 100
  ) / 100;

}


/* ==========================================================
   FORMAT CURRENCY
   ========================================================== */

function formatMoney(amount) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD"
    }
  ).format(amount);

}
