const primaryBtn = document.querySelector("#primary-btn");
primaryBtn.addEventListener("click", generateDiv);

function generateDiv(e) {
  e.preventDefault();
  const year = Number(document.querySelector("#primary-input").value);
  if (!year || year < 1) {
    alert("Please enter a valid positive number of years.");
    return;
  }

  const container = document.querySelector("#dynamic-fields");
  container.innerHTML = "";
  container.insertAdjacentHTML("beforeend", `
    <div class="card mb-3 shadow-sm">
      <div class="card-header">Enter Cash Flows</div>
      <div class="card-body">
        <form id="cashflow-form" class="row g-3"></form>
      </div>
    </div>
  `);

  const form = document.querySelector("#cashflow-form");
  for (let i = 1; i <= year; i++) {
    form.insertAdjacentHTML("beforeend", `
      <div class="col-md-8 cashflow-input">
        <label for="year-${i}" class="form-label">Year ${i}</label>
        <input type="number" class="form-control" id="year-${i}" placeholder="e.g. -1000 or 800" required>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <button type="button" class="btn btn-success pre-populate" data-year="${i}">Pre-Populate</button>
      </div>
    `);
  }

  form.insertAdjacentHTML("beforeend", `
    <div class="col-12 text-end">
      <button id="compute" class="btn btn-danger">Compute IRR</button>
    </div>
  `);

  primaryBtn.disabled = true;
  document.querySelector("#compute").addEventListener("click", computeData);


  document.querySelectorAll(".pre-populate").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const year = btn.getAttribute("data-year");


      if (document.querySelector(`#popup-${year}`)) return;


      const openPopup = document.querySelector(".input-group");
      if (openPopup) openPopup.remove();

      btn.insertAdjacentHTML("afterend", `
        <div class="input-group input-group-sm mt-2 mb-2" id="popup-${year}">
            <input type="number" min="${year}" class="form-control" id="end-year-${year}" placeholder="Fill up to year...">
            <button type="button" class="btn btn-outline-success submit-populate" data-source="${year}">Submit</button>
        </div>
      `);



      document.querySelector(`#popup-${year} .submit-populate`).addEventListener("click", () => {
        const sourceYear = Number(year);
        const endYear = Number(document.querySelector(`#end-year-${year}`).value);
        const sourceValue = document.querySelector(`#year-${sourceYear}`).value;

        if (sourceValue === "" || isNaN(sourceValue)) {
          alert(`Please enter a valid cash flow in Year ${sourceYear} first.`);
          return;
        }

        if (!endYear || endYear < sourceYear) {
          alert(`Please enter a valid year (>= ${sourceYear}).`);
          return;
        }

        for (let i = sourceYear; i <= endYear; i++) {
          const input = document.querySelector(`#year-${i}`);
          if (input) {
            input.value = sourceValue;
          }
        }


        document.querySelector(`#popup-${year}`).remove();
      });
    });
  });
}

function collectInputs() {
  const inputs = Array.from(document.querySelectorAll("#cashflow-form input"));
  const values = inputs.map((inp, i) => {
    const v = inp.value.trim();
    if (v === "" || isNaN(Number(v))) {
      alert(`Invalid input at Year ${i + 1}. Please enter a number.`);
      throw new Error("Invalid cash flow");
    }
    return Number(v);
  });
  return values;
}

function computeData(e) {
  e.preventDefault();
  let cashFlows;
  try {
    cashFlows = collectInputs();
  } catch {
    return;
  }

  const npv0 = getNVM(0, cashFlows);
  const npvHigh = getNVM(10, cashFlows);
  if ((npv0 > 0 && npvHigh > 0) || (npv0 < 0 && npvHigh < 0)) {
    alert("IRR is undefined for these cash flows.");
    return;
  }

  const irr = binarySearch(0, 10, cashFlows);
  showResult(irr);
}

function binarySearch(low, high, flows) {
  const eps = 1e-6;
  while ((high - low) > eps) {
    const mid = (low + high) / 2;
    const val = getNVM(mid, flows);
    if (Math.abs(val) < eps) return mid;
    if (val > 0) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

function getNVM(rate, cashFlows) {
  return cashFlows.reduce((sum, cf, i) => sum + cf / ((1 + rate) ** (i + 1)), 0);
}

function showResult(rate) {
  document.querySelector("#result-text")
    .textContent = `Effective IRR: ${(rate * 100).toFixed(6)}%`;
  document.querySelector("#result-card").classList.remove("d-none");
}
