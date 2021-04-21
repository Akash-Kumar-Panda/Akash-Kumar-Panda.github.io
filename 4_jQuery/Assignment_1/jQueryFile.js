$(document).ready(function () {
  var oper1 = $("#operand1")[0],
    operator = $("#operator")[0],
    oper2 = $("#operand2")[0],
    ans = 2;

  var fNameCheck = false,
    mNameCheck = false,
    lNameCheck = false,
    emailCheck = false,
    pwdCheck = false,
    cpwdCheck = false,
    cnumCheck = false,
    acnumCheck = false,
    cityCheck = false;
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }
  function getEvaluate(a, b, c) {
    if (typeof a == "string" || a instanceof String) {
      a = parseInt(a);
    }
    if (typeof b == "string" || b instanceof String) {
      b = parseInt(b);
    }
    switch (c) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
    }
  }
  function refresh() {
    var arr = ["+", "-", "*", "/"],
      a = 0,
      b = 0,
      c = arr[0];
    while (true) {
      a = getRandomInt(100);
      b = getRandomInt(100);
      c = arr[getRandomInt(4)];
      ans = getEvaluate(a, b, c);
      if (isFloat(ans)) {
        continue;
      } else if (ans > 99 || ans < 0) {
        continue;
      }
      break;
    }
    if (a > 9) {
      oper1.innerHTML = a;
    } else {
      oper1.innerHTML = "0" + a;
    }
    if (b > 9) {
      oper2.innerHTML = b;
    } else {
      oper2.innerHTML = "0" + b;
    }
    operator.innerHTML = c;
  }
  var i = 0;
  function rotRefresh() {
    i = (i + 1) % 2;
    if (i == 0) {
      $("#refresh").animate(
        { deg: 360 },
        {
          duration: 100,
          step: function (now) {
            $(this).css({ transform: "rotate(" + now + "deg)" });
          },
        },
        "swing"
      );
    } else {
      $("#refresh").animate(
        { deg: -360 },
        {
          duration: 100,
          step: function (now) {
            $(this).css({ transform: "rotate(" + now + "deg)" });
          },
        },
        "swing"
      );
    }
  }
  $("#refresh").click(function () {
    rotRefresh();
    refresh();
  });
  $("#refresh").click();

  function greenTick(ele) {
    ele.html(
      '<img src="Images/tick.png" height="15px" width="19px" style="margin-top: 5px">'
    );
  }

  function validateEach(key, val) {
    switch (key) {
      case "fname":
        if (val == "") {
          $("#fNameP").html("Can't be empty");
          fNameCheck = false;
          return false;
        }
        var patt = /[^(a-zA-Z )]/g;
        if (!patt.exec(val)) {
          greenTick($("#fNameP"));
          fNameCheck = true;
          return true;
        }
        $("#fNameP").html("Invalid first name");
        fNameCheck = false;
        return false;

      case "mname":
        if (val == "") {
          $("#mNameP").html("Can't be empty");
          mNameCheck = false;
          return false;
        }
        var patt = /[^(a-zA-Z )]/g;
        if (!patt.exec(val)) {
          greenTick($("#mNameP"));
          mNameCheck = true;
          return true;
        }
        $("#mNameP").html("Invalid middle name");
        mNameCheck = false;
        return false;

      case "lname":
        if (val == "") {
          $("#lNameP").html("Can't be empty");
          lNameCheck = false;
          return false;
        }
        var patt = /[^(a-zA-Z )]/g;
        if (!patt.exec(val)) {
          greenTick($("#lNameP"));
          lNameCheck = true;
          return true;
        }
        $("#lNameP").html("Invalid last name");
        lNameCheck = false;
        return false;

      case "email":
        if (val == "") {
          $("#emailP").html("Can't be empty");
          emailCheck = false;
          return false;
        }
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (val.match(mailformat)) {
          greenTick($("#emailP"));
          emailCheck = true;
          return true;
        } else {
          $("#emailP").html("Invalid email address");
        }
        emailCheck = false;
        return false;

      case "pwd":
        var l = val.length;
        if (l >= 6 && l <= 12) {
          greenTick($("#pwdP"));
          pwdCheck = true;
          return true;
        } else if (l > 12) {
          $("#pwdP").html("Passsword length < 13");
        } else if (l < 6) {
          $("#pwdP").html("Passsword length > 5");
        }
        pwdCheck = false;
        return false;

      case "cnum":
        var patt = /[^0-9]/g;
        if (val.length == 10) {
          if (!patt.exec(val)) {
            greenTick($("#cnumP"));
            cnumCheck = true;
            return true;
          } else {
            $("#cnumP").html("Invalid phone number");
            cnumCheck = false;
            return false;
          }
        } else {
          $("#cnumP").html("Should be 10 digits");
          cnumCheck = false;
          return false;
        }

      case "acnum":
        var patt = /[^0-9]/g;
        if (val.length == 10) {
          if (!patt.exec(val)) {
            greenTick($("#acnumP"));
            acnumCheck = true;
            return true;
          } else {
            $("#acnumP").html("Invalid phone number");
            acnumCheck = false;
            return false;
          }
        } else {
          $("#acnumP").html("Should be 10 digits");
          acnumCheck = false;
          return false;
        }

      case "city":
        if (val == "") {
          $("#cityP").html("Can't be empty");
          cityCheck = false;
          return false;
        }
        var patt = /[^(a-zA-Z )]/g;
        if (!patt.exec(val)) {
          greenTick($("#cityP"));
          cityCheck = true;
          return true;
        }
        $("#cityP").html("Invalid city name");
        cityCheck = false;
        return false;
    }
  }

  function validateCpwd(valCpwd, valPwd) {
    lP = valPwd.length;
    if (valPwd == "" || lP < 6 || lP > 12) {
      $("#pwdP").html("Enter password first");
      cpwdCheck = false;
      $("#pwd").focus();
      return false;
    }
    var l = valCpwd.length;
    if (l > 5 && l < 13) {
      if (valPwd === valCpwd) {
        greenTick($("#cpwdP"));
        cpwdCheck = true;
        return true;
      } else {
        $("#cpwdP").html("Passwords do not match");
      }
    } else if (l > 12) {
      $("#cpwdP").html("Passsword length < 13");
    } else if (l < 6) {
      $("#cpwdP").html("Passsword length > 5");
    }
    cpwdCheck = false;
    return false;
  }
  $("#myForm").submit(function validateform() {
    var customer = {
      fname: $("#fname")[0].value,
      mname: $("#mname")[0].value,
      lname: $("#lname")[0].value,
      email: $("#email")[0].value,
      pwd: $("#pwd")[0].value,
      cpwd: $("#cpwd")[0].value,
      cnum: $("#cnum")[0].value,
      acnum: $("#acnum")[0].value,
      al1: $("#al1")[0].value,
      city: $("#city")[0].value,
      state: $("#state")[0].value,
      country: $("#country")[0].value,
    };
    var male = $("#male")[0].checked,
      female = $("#female")[0].checked,
      other = $("#other")[0].checked;

    if (
      !(
        fNameCheck &&
        mNameCheck &&
        lNameCheck &&
        emailCheck &&
        pwdCheck &&
        cpwdCheck &&
        cnumCheck &&
        acnumCheck &&
        cityCheck
      )
    ) {
      alert("\n\nPlease fill up the required details properly.\n\n");
      return false;
    }

    if (customer[al1] == "") {
      alert("\n\nPlease fill in the required details\n\n");
      return false;
    } else if (customer[state] == "") {
      alert("\n\nPlease fill in the required details\n\n");
      return false;
    } else if (customer[country] == "") {
      alert("\n\nPlease fill in the required details\n\n");
      return false;
    }

    if (!(male || female || other)) {
      alert("You have not selected any Gender option!");
      return false;
    }

    while (true) {
      if ($("#ans")[0].value == ans) {
        break;
      } else {
        alert("Captcha Validation failed!\n Try Again..");
        $("#ans")[0].value = "";
        refresh();
        return false;
      }
    }
    alert("Form successfully submitted!");
    return true;
  });

  $("#fname").keyup(function () {
    validateEach("fname", $(this).val());
  });
  $("#mname").keyup(function () {
    validateEach("mname", $(this).val());
  });
  $("#lname").keyup(function () {
    validateEach("lname", $(this).val());
  });

  $("#email").keyup(function () {
    validateEach("email", $(this).val());
  });
  $("#pwd").keyup(function () {
    validateEach("pwd", $(this).val());
  });
  $("#cpwd").keyup(function () {
    validateCpwd($(this).val(), $("#pwd").val());
  });

  $("#cnum").keyup(function () {
    validateEach("cnum", $(this).val());
  });

  $("#acnum").keyup(function () {
    validateEach("acnum", $(this).val());
  });
  $("#al1").keyup(function () {
    var val = $(this).val();
    if (val == "") {
      $("#al1P").html("Can't be empty");
      return false;
    }
    greenTick($("#al1P"));
    return true;
  });
  $("#city").keyup(function () {
    validateEach("city", $(this).val());
  });
});
