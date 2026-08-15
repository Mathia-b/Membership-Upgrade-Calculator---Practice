/* ==========================================================
   MEMBERSHIP UPGRADE CALCULATOR
   PRACTICE VERSION
   ========================================================== */


/* ==========================================================
   GLOBAL CALCULATOR VALUE
   ========================================================== */

let calculatedUpgradeAmount = null;


/* ==========================================================
   WEBSITE SETTINGS
   ========================================================== */

const CALCULATOR_SETTINGS = {

  adjustmentAmountSelector:
    "#Order_AdjustOrderPriceView_txtAdjustmentAmount"

};


/* ==========================================================
   DETERMINE WHEN CALCULATOR SHOULD APPEAR

   Calculator only appears when:

   1. User is on the Personify Order page
   AND
   2. The Adjustment Amount field exists
   ========================================================== */

function checkCalculatorPage() {

  const correctPage =
    window.location.pathname ===
    "/PersonifyGO/Order/Index";


  const adjustmentAmountField =
    document.querySelector(
      CALCULATOR_SETTINGS
        .adjustmentAmountSelector
    );


  const calculatorButton =
    document.getElementById(
      "membership-upgrade-calculator-button"
    );


  const calculatorPanel =
    document.getElementById(
      "membership-upgrade-calculator-panel"
    );


  /* ========================================================
     SHOW CALCULATOR
     ======================================================== */

  if (
    correctPage &&
    adjustmentAmountField
  ) {

    if (!calculatorButton) {

      initializeCalculator();

    }

  }


  /* ========================================================
     HIDE CALCULATOR
     ======================================================== */

  else {

    if (calculatorButton) {

      calculatorButton.remove();

    }


    if (calculatorPanel) {

      calculatorPanel.remove();

    }


    calculatedUpgradeAmount = null;

  }

}


/* ==========================================================
   CHECK WHEN PAGE FIRST LOADS
   ========================================================== */

checkCalculatorPage();


/* ==========================================================
   PERSONIFY LOADS SOME CONTENT DYNAMICALLY

   Check twice per second to see whether the
   Adjustment Amount field has appeared or disappeared.
   ========================================================== */

setInterval(
  checkCalculatorPage,
  500
);

/* ==========================================================
   INITIALIZE
   ========================================================== */

function initializeCalculator() {

  createCalculatorButton();

  createCalculatorPanel();

}

/* ==========================================================
   CREATE FLOATING CALCULATOR BUTTON
   ========================================================== */

function createCalculatorButton() {

  const button =
    document.createElement("button");


  button.id =
    "membership-upgrade-calculator-button";


  button.type =
    "button";


  button.innerHTML =
    "🧮";


  button.title =
    "Membership Upgrade Calculator";


  button.setAttribute(
    "aria-label",
    "Open Membership Upgrade Calculator"
  );


  document.body.appendChild(
    button
  );


  button.addEventListener(
    "click",
    toggleCalculator
  );

}


/* ==========================================================
   CREATE CALCULATOR PANEL
   ========================================================== */

function createCalculatorPanel() {

  const panel =
    document.createElement("div");


  panel.id =
    "membership-upgrade-calculator-panel";


  panel.innerHTML = `

    <div class="upgrade-calculator-header">

      <div>

        <div class="upgrade-calculator-eyebrow">
          PRACTICE TOOL
        </div>

        <h2>
          Membership Upgrade
        </h2>

      </div>


      <button
        id="upgrade-calculator-close"
        type="button"
        aria-label="Close calculator"
      >
        ×
      </button>

    </div>


    <div class="upgrade-calculator-body">


      <label class="upgrade-calculator-field">

        <span>
          Current Membership
        </span>

        <select
          id="current-membership-type"
        >
        </select>

      </label>


      <div class="upgrade-price-box">

        <span>
          Current Membership Price
        </span>

        <strong id="current-membership-price">
          $0.00
        </strong>

      </div>


      <button
        id="calculate-upgrade-button"
        type="button"
      >
        + Add $12 Upgrade
      </button>


      <div
        id="upgrade-calculation-results"
        class="calculator-hidden"
      >


        <div class="upgrade-result-row">

          <span>
            Current Price
          </span>

          <strong id="result-current-price">
            $0.00
          </strong>

        </div>


        <div class="upgrade-result-row">

          <span>
            Upgrade Amount
          </span>

          <strong>
            + $12.00
          </strong>

        </div>


        <div class="upgrade-result-divider">
        </div>


        <div class="upgrade-total-box">

          <span>
            NEW AMOUNT
          </span>

          <strong id="result-upgraded-price">
            $0.00
          </strong>

        </div>


        <div class="review-message">

          Review the amount before applying it
          to the Adjustment Amount field.

        </div>


        <button
          id="apply-upgrade-button"
          type="button"
          disabled
        >
          Apply Amount
        </button>


        <div
          id="upgrade-status-message"
          aria-live="polite"
        >
        </div>

      </div>


      <div class="upgrade-safety-box">

        <strong>
          Practice Mode
        </strong>

        <br><br>

        This extension only calculates an amount
        and fills the Adjustment Amount field.

        <br><br>

        It does not submit the adjustment,
        process a payment, save the order,
        or complete the transaction.

      </div>


    </div>

  `;


  document.body.appendChild(
    panel
  );


  populateMembershipOptions();

  updateMembershipPreview();

  attachCalculatorEvents();

}


/* ==========================================================
   POPULATE MEMBERSHIP DROPDOWN
   ========================================================== */

function populateMembershipOptions() {

  const dropdown =
    document.getElementById(
      "current-membership-type"
    );


  Object.keys(
    MEMBERSHIP_RATES
  ).forEach(
    membershipType => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        membershipType;


      option.textContent =
        membershipType;


      dropdown.appendChild(
        option
      );

    }
  );

}


/* ==========================================================
   UPDATE CURRENT PRICE
   ========================================================== */

function updateMembershipPreview() {

  const membershipType =
    document.getElementById(
      "current-membership-type"
    ).value;


  const currentPrice =
    MEMBERSHIP_RATES[
      membershipType
    ];


  document.getElementById(
    "current-membership-price"
  ).textContent =
    formatMoney(
      currentPrice
    );


  /*
    If the user changes memberships after performing
    a calculation, require them to calculate again.
  */

  calculatedUpgradeAmount = null;


  const results =
    document.getElementById(
      "upgrade-calculation-results"
    );


  results.classList.add(
    "calculator-hidden"
  );


  const applyButton =
    document.getElementById(
      "apply-upgrade-button"
    );


  applyButton.disabled = true;

}


/* ==========================================================
   EVENT LISTENERS
   ========================================================== */

function attachCalculatorEvents() {

  document.getElementById(
    "upgrade-calculator-close"
  ).addEventListener(
    "click",
    closeCalculator
  );


  document.getElementById(
    "current-membership-type"
  ).addEventListener(
    "change",
    updateMembershipPreview
  );


  document.getElementById(
    "calculate-upgrade-button"
  ).addEventListener(
    "click",
    calculateMembershipUpgrade
  );


  document.getElementById(
    "apply-upgrade-button"
  ).addEventListener(
    "click",
    applyUpgradeAmount
  );

}


/* ==========================================================
   OPEN / CLOSE CALCULATOR
   ========================================================== */

function toggleCalculator() {

  document.getElementById(
    "membership-upgrade-calculator-panel"
  ).classList.toggle(
    "calculator-open"
  );

}


function closeCalculator() {

  document.getElementById(
    "membership-upgrade-calculator-panel"
  ).classList.remove(
    "calculator-open"
  );

}


/* ==========================================================
   CALCULATE UPGRADE
   ========================================================== */

function calculateMembershipUpgrade() {

  const membershipDropdown =
    document.getElementById(
      "current-membership-type"
    );

  const membershipType =
    membershipDropdown.value;

  const currentPrice =
    MEMBERSHIP_RATES[
      membershipType
    ];

  if (currentPrice === undefined) {

    alert(
      "The membership price could not be found."
    );

    return;

  }

  const upgradedPrice =
  currentPrice + UPGRADE_AMOUNT;

  calculatedUpgradeAmount =
    upgradedPrice;


  document.getElementById(
    "result-current-price"
  ).textContent =
    formatMoney(
      currentPrice
    );


  document.getElementById(
    "result-upgraded-price"
  ).textContent =
    formatMoney(
      upgradedPrice
    );


  document.getElementById(
    "upgrade-calculation-results"
  ).classList.remove(
    "calculator-hidden"
  );


  const applyButton =
    document.getElementById(
      "apply-upgrade-button"
    );


  applyButton.disabled =
    false;


  applyButton.textContent =
    `Apply ${formatMoney(
      upgradedPrice
    )}`;


  document.getElementById(
    "upgrade-status-message"
  ).textContent =
    "Calculation complete.";

}

/* ==========================================================
   APPLY AMOUNT TO PERSONIFY

   SAFETY BOUNDARY:

   This function ONLY attempts to change the value of
   the Adjustment Amount textbox.

   It does NOT:
   - click Save
   - click Submit
   - process payment
   - complete an order
   - click any other Personify button
   ========================================================== */

function applyUpgradeAmount() {

  const statusMessage =
    document.getElementById(
      "upgrade-status-message"
    );


  /* -----------------------------------------------
     SAFETY CHECK
     ----------------------------------------------- */

  if (calculatedUpgradeAmount === null) {

    statusMessage.textContent =
      "Calculate the upgrade amount first.";

    return;

  }


  /* -----------------------------------------------
     FIND PERSONIFY FIELD
     ----------------------------------------------- */

  const adjustmentField =
    document.querySelector(
      CALCULATOR_SETTINGS
        .adjustmentAmountSelector
    );


  if (!adjustmentField) {

    statusMessage.textContent =
      "The Adjustment Amount field could not be found.";

    return;

  }


  /*
    IMPORTANT:

    calculatedUpgradeAmount is the FULL calculated amount.

    Example:

    Current membership = $68.00
    Add               = $12.00

    calculatedUpgradeAmount = $80.00

    Therefore 80.00 is what we send to the field.
  */

  const amountToApply =
    calculatedUpgradeAmount;


  try {

    /* -----------------------------------------------
       TRY KENDO NUMERIC TEXTBOX
       ----------------------------------------------- */

    if (
      typeof window.jQuery !== "undefined"
    ) {

      const $field =
        window.jQuery(
          adjustmentField
        );


      const kendoWidget =
        $field.data(
          "kendoNumericTextBox"
        );


      if (kendoWidget) {

        kendoWidget.value(
          amountToApply
        );


        kendoWidget.trigger(
          "change"
        );


        statusMessage.textContent =
          `${formatMoney(
            amountToApply
          )} was entered into Adjustment Amount. Review the Personify results before continuing.`;


        return;

      }

    }


    /* -----------------------------------------------
       FALLBACK METHOD
       ----------------------------------------------- */

    adjustmentField.value =
      amountToApply.toFixed(2);


    adjustmentField.dispatchEvent(
      new Event(
        "input",
        {
          bubbles: true
        }
      )
    );


    adjustmentField.dispatchEvent(
      new Event(
        "change",
        {
          bubbles: true
        }
      )
    );


    adjustmentField.dispatchEvent(
      new Event(
        "blur",
        {
          bubbles: true
        }
      )
    );


    statusMessage.textContent =
      `${formatMoney(
        amountToApply
      )} was entered into Adjustment Amount. Review the Personify results before continuing.`;

  }

  catch (error) {

    console.error(
      "Membership Upgrade Calculator:",
      error
    );


    statusMessage.textContent =
      "The field was found, but the calculator could not update it. Nothing was submitted.";

  }

}
