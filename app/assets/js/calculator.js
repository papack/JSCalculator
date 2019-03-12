"use strict";

//
// This is a Simple Calculator with jQuery, JavaScript, HTML, CSS
//
//I programmed it to practice these web techniques.
// I'm happy about feedback or improvements on the structure :)
//
// Matthias Steiner - 12.03.2019
//


//
//
//The Display object represents all operations that are triggered by the gui.
//
let Display = {
  currentInput: "0",
  clearDisplay: true,
  lastOperation: "",

  //Refresh the Input line in the Gui
  showCurrentInput: function() {
    Display.currentInput = (Display.currentInput + "").replace(".", ",");
    $("#display").attr("value", Display.currentInput);
  },

  //return the current Inputline from the Gui
  getCurrentInput: function() {
    let returnValue = Display.currentInput.replace(",", ".");
    return parseFloat(returnValue);
  },

  //Adds a Value to the Inputline
  // Empty the Inputline in Gui when clearDisplay == true.
  addValue: function(value) {

    if (Display.clearDisplay) {
      Display.currentInput = ""
      Display.clearDisplay = false;

      if (value == ",") {
        Display.currentInput = "0";
      }

    }

    Display.currentInput += value;
    Display.currentInput += "";
    Display.showCurrentInput();
  },

  //reset erverthing
  clear: function() {
    Result.reset();
    Display.clearLastEntry();
  },

  //reset online the current Entry and keep the Data in Result
  clearLastEntry: function() {
    Display.currentInput = "0";
    Display.clearDisplay = true;
    Display.showCurrentInput();
  },

  //Delete only the last Digit
  delLastDigit: function() {

    //Check if this is a new Entered Value -> We dont want delete something
    //From a result.
    if (Display.clearDisplay == false) {
      let tempCurrentInput = Display.getCurrentInput() + "";

      if (tempCurrentInput.length > 1) {
        Display.currentInput = tempCurrentInput.slice(0, -1);
        Display.showCurrentInput();
      }

      if (tempCurrentInput.length == 1) {
        Display.clearLastEntry();
      }

    }
  },

  // + operation
  add: function() {

    if (Display.clearDisplay == false) {
      Display.clearDisplay = true;
      Result.setValue(Display.getCurrentInput());
      Display.result();
    }
    Display.lastOperation = "add";


  },

  // - operation
  sub: function() {
    if (Display.clearDisplay == false) {
      Display.clearDisplay = true;
      Result.setValue(Display.getCurrentInput());
      Display.result();
    }
    Display.lastOperation = "sub";

  },

  // * operation
  mul: function() {
    if (Display.clearDisplay == false) {
      Display.clearDisplay = true;
      Result.setValue(Display.getCurrentInput());
      Display.result();
    }
    Display.lastOperation = "mul";
  },

  // / operation
  div: function() {
    if (Display.clearDisplay == false) {
      Display.clearDisplay = true;
      Result.setValue(Display.getCurrentInput());
      Display.result();
    }
    Display.lastOperation = "div";
  },

  //invert the current input
  neg: function() {

    if (Display.clearDisplay == false) {
      let tempCurrentInput = Display.getCurrentInput();

      if (tempCurrentInput != 0) {
        Display.currentInput = tempCurrentInput - tempCurrentInput * 2;
        Display.showCurrentInput();
      }
    }
  },

  // = operation
  result: function() {
    if (Display.clearDisplay == false) {
      Result.setValue(Display.getCurrentInput());
    }

    Result.calculate(Display.lastOperation);

    //Show Value on Gui/ Screen
    Display.clearDisplay = true;
    Display.addValue(Result.leftOperand);
    Display.clearDisplay = true; // the addValue funktion resets the clearDisplay -> set again.
  }

}

//
//
//The result object represents the data or current calculation task.
//It is divided into two operants (left and right).
//

let Result = {
  leftOperand: null,
  rightOperand: null,

  reset: function() {
    Result.leftOperand = null; // the left Side keeps the result
    Result.rightOperand = null; // the Right Side is for new Operands
  },

  setValue: function(value) {
    //first we set the left operand.
    if (Result.leftOperand == null) {
      Result.leftOperand = value;
    } else {
      Result.rightOperand = value;
    }

  },

  calculate: function(operation) {

    //We only calculate if we have both operands. Otherwise we do nothing.
    if (Result.leftOperand != null && Result.rightOperand != null) {
      if (operation == "add") {
        Result.leftOperand = Result.leftOperand + Result.rightOperand;
      }
      if (operation == "sub") {
        Result.leftOperand = Result.leftOperand - Result.rightOperand;
      }
      if (operation == "mul") {
        Result.leftOperand = Result.leftOperand * Result.rightOperand;
      }
      if (operation == "div") {
        Result.leftOperand = Result.leftOperand / Result.rightOperand;

      }
    }
  }

}


jQuery(document).ready(function($) {

  //show Default Value on Display
  Display.showCurrentInput();

  //
  // Add all Listeners to the Buttons on the Gui
  //
  $("#btn-c").click(function() {
    Display.clear();
  });

  $("#btn-ce").click(function() {
    Display.clearLastEntry();
  });

  $("#btn-del").click(function() {
    Display.delLastDigit();
  });

  $("#btn-0").click(function() {
    Display.addValue(0);
  });

  $("#btn-1").click(function() {
    Display.addValue(1);
  });

  $("#btn-2").click(function() {
    Display.addValue(2);
  });

  $("#btn-3").click(function() {
    Display.addValue(3);
  });

  $("#btn-4").click(function() {
    Display.addValue(4);
  });

  $("#btn-5").click(function() {
    Display.addValue(5);
  });

  $("#btn-6").click(function() {
    Display.addValue(6);
  });

  $("#btn-7").click(function() {
    Display.addValue(7);
  });

  $("#btn-8").click(function() {
    Display.addValue(8);
  });

  $("#btn-9").click(function() {
    Display.addValue(9);
  });

  $("#btn-sub").click(function() {
    Display.sub();
  });

  $("#btn-add").click(function() {
    Display.add();
  });

  $("#btn-div").click(function() {
    Display.div();
  });

  $("#btn-mul").click(function() {
    Display.mul();
  });

  $("#btn-neg").click(function() {
    Display.neg();
  });

  $("#btn-comma").click(function() {
    Display.addValue(",");
  });

  $("#btn-result").click(function() {
    Display.result();
  });

  //
  // Add Hotkeys / Enable Keyboard functionality
  //

  $(document).keypress(function(event) {

    switch (event.key) {

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        Display.addValue(event.key);
        break;

      case "+":
        Display.add();
        break;
      case "-":
        Display.sub();
        break;
      case "/":
        Display.div();
        break;
      case "*":
        Display.mul();
        break;
    }

    //Enter/Return
    if (event.keyCode == 13) {
      Display.result();
    }

    //, -> comma
    if (event.keyCode == 44) {
      Display.addValue(",");
    }


  })

});
