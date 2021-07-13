const d = document;

export default function calculator() {
  //Inputs (Bill and Number of People)
  const $txtAmountBill = d.getElementById("txtbill"),
    $txtQuantityPeople = d.getElementById("txtpeople");

  //Outputs (Tip Amount and Total)
  const $amount = d.getElementById("amount"),
    $total = d.getElementById("total");

  //Boton Reset
  const $reset = d.getElementById("btnreset");

  //Botons Tip (Category) and TxtCustomValue
  const $categoryTip = d.querySelectorAll("[data-tip]"),
    $customValue = d.getElementById("txtcustomvalue");

  //Crear elementos span - mensajes de error
  const $span = d.createElement("span");
  const searchInputElement = (context) => context.parentElement.previousElementSibling;

  //Interacción con los inputs
  d.addEventListener("keyup", (e) => {
    const $target = e.target.value;
    //Validar el input (bill) , con decimales
    if (e.target === $txtAmountBill) {
      const resultPos = validityNumbersPositive($target);
      const resultBill = validityBill($target);

      //Mensajes de error
      contextInputs(resultPos, resultBill, $txtAmountBill, $txtQuantityPeople);
    }

    //Validar el input de entrada de personas , solo enteros
    if (e.target === $txtQuantityPeople) {
      const resultPos = validityNumbersPositive($target);
      const resultInteger = validityIntegers($target);

      //Mensajes de error
      contextInputs(resultPos, resultInteger, $txtQuantityPeople, $txtAmountBill);
    }

    //Validación del Porcentaje personalizado
    if (e.target === $customValue) {
      operationsCalculator(e.target.value);
      if ($customValue.value === "") {
        $amount.textContent = "0.00";
        $total.textContent = "0.00";
      }
    }
  });

  //Estado inicial del contenido
  $reset.addEventListener("click", (e) => {
    $txtAmountBill.value = "";
    $txtQuantityPeople.value = "";
    $amount.textContent = "0.00";
    $total.textContent = "0.00";
    $customValue.value = "";
    $customValue.disabled = true;
    $categoryTip.forEach((tip) => (tip.disabled = true));
    $reset.disabled = true;
  });

  //Optimización del codigo del input - Validaciones , activación de elementos desactivados a activados.
  const contextInputs = (resPos, resContext, context, contextOp) => {
    if (resPos !== true || resContext !== true) {
      let result;
      if (resPos !== true) result = resPos;
      else if (resContext !== true) result = resContext;
      $span.textContent = result;
      searchInputElement(context).appendChild($span);
      if (((context.value === "" || contextOp.value === "") && resPos !== true) || resContext !== true) {
        $categoryTip.forEach((tip) => (tip.disabled = true));
        $customValue.disabled = true;
        $reset.disabled = true;
      }
    } else {
      $span.textContent = "";
      if (context.value !== "" && contextOp.value !== "") {
        $categoryTip.forEach((tip) => (tip.disabled = false));
        $customValue.disabled = false;
        $reset.disabled = false;
      }
    }
  };

  //Interacción con los botones (porcentajes) ,Visualización de resultados
  $categoryTip.forEach((tip) => {
    tip.addEventListener("click", (e) => {
      let percentageTip = e.target.value.split("%")[0];
      operationsCalculator(percentageTip);
      $customValue.value = "";
    });
  });

  //Optimización de los calculos realizados , Tip Amount and Total
  const operationsCalculator = (perc) => {
    //Inputs
    const $bill = $txtAmountBill.value,
      $people = $txtQuantityPeople.value;

    //Operations
    const productBillWithTip = (perc / 100) * $bill;
    const amount = (productBillWithTip / $people).toFixed(2);
    const totalPerson = ((Number($bill) + productBillWithTip) / Number($people)).toFixed(2);

    $amount.textContent = amount;
    $total.textContent = totalPerson;
  };
}

//Permite validar el ingreso de numeros positivos
const validityNumbersPositive = (number = undefined) => {
  if (parseInt(number) === 0) return "Can´'t be Zero";
  if (!number || number === "") return "Empty field";
  if (Math.sign(number) === -1) return "Only positive numbers";
  return true;
};

//Permite validar solo enteros (Number of people)
const validityIntegers = (number = undefined) => {
  if (!Number.isInteger(Number(number))) return "Not Integer";
  if (number.includes(".")) return "Not Integer";
  return true;
};

//Permite validar la factura (enteros o decimales) - bill
const validityBill = (bill = undefined) => {
  if (isNaN(bill)) return "Not a number";
  return true;
};
