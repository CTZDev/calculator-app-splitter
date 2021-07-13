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
  });

  //Optimización del codigo del input - Validaciones , activación de elementos desactivados a activados.
  const contextInputs = (resPos, resContext, context, contextOp) => {
    if (resPos !== true || resContext !== true) {
      $span.textContent = resPos || resContext;
      searchInputElement(context).appendChild($span);
      if ((context.value === "" && contextOp.value === "") || context.value === "" || contextOp.value === "") {
        $categoryTip.forEach((tip) => (tip.disabled = true));
        $customValue.disabled = true;
      }
    } else {
      $span.textContent = "";
      if (context.value !== "" && contextOp.value !== "") {
        $categoryTip.forEach((tip) => (tip.disabled = false));
        $customValue.disabled = false;
      }
    }
  };

  //Interacción con los botones (porcentajes)
  $categoryTip.forEach((tip) => {
    tip.addEventListener("click", (e) => {
      const $bill = $txtAmountBill.value,
        $people = $txtQuantityPeople.value;

      //Id de los Span creados , crear vinculo al crear un span
      let percentageTip = e.target.value.split("%")[0];
      const productBillWithTip = (percentageTip / 100) * $bill;
      const amount = (productBillWithTip / $people).toFixed(2);
      const totalPerson = ((Number($bill) + productBillWithTip) / Number($people)).toFixed(2);
    });
  });
}

//Permite validar el ingreso de numeros positivos
const validityNumbersPositive = (number = undefined) => {
  if (parseInt(number) === 0) return "Can´'t be Zero";
  if (!number || number === "") return "Empty field, not (- ó +)";
  if (Math.sign(number) === -1) return "Only positive numbers";
  return true;
};

//Permite validar solo enteros (Number of people)
const validityIntegers = (number = undefined) => {
  if (!parseInt(number)) return "Not Integer";
  return true;
};

//Permite validar la factura (enteros o decimales) - bill
const validityBill = (bill = undefined) => {
  if (isNaN(bill)) return "Not a number";
  return true;
};
