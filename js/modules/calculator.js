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
  const $category = d.querySelectorAll("[data-tip]"),
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
      contextInputs(resultPos, resultBill, $txtAmountBill);
    }

    //Validar el input de entrada de personas , solo enteros
    if (e.target === $txtQuantityPeople) {
      const resultPos = validityNumbersPositive($target);
      const resultInteger = validityIntegers($target);

      //Mensajes de error
      contextInputs(resultPos, resultInteger, $txtQuantityPeople);
    }
  });

  //Optimización del codigo del input - Validaciones
  const contextInputs = (resPos, resContext, context) => {
    if (resPos !== true || resContext !== true) {
      $span.textContent = resPos || resContext;
      searchInputElement(context).appendChild($span);
    } else {
      $span.textContent = "";
    }
  };

  //Interacción con los botones (porcentajes)
  d.addEventListener("click", (e) => {});
}

//Permite validar el ingreso de numeros positivos
const validityNumbersPositive = (number = undefined) => {
  if (parseInt(number) === 0) return "Can´'t be Zero";
  if (!number) return "Empty field, not (- ó +)";
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
