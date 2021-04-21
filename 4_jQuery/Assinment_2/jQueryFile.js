$(document).ready(function () {
  // $("#registration").hide();
  //$("#result").fadeIn(slow);
  $("#result").hide();
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#preview").attr("src", e.target.result);
        $("#resultPreview").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#profile").change(function () {
    readURL(this);
  });

  var oper1 = $("#operand1")[0],
    operator = $("#operator")[0],
    oper2 = $("#operand2")[0],
    ans = 2;

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
    oper1.innerHTML = a;
    oper2.innerHTML = b;
    operator.innerHTML = c;
  }

  $("#refresh").click(function () {
    refresh();
  });
  $("#refresh").click();

  function redTick(ele) {
    ele.html(
      '<img src="Images/tick.png" height="15px" width="19px" style="margin-top: 5px">'
    );
  }
  var fNameCheck = false,
    mNameCheck = false,
    lNameCheck = false,
    emailCheck = false,
    panCheck = false,
    aadhaarCheck = false,
    cnumCheck = new Array(false, false, false, false, false),
    al1Check = new Array(false, false, false, false, false),
    al2Check = new Array("", "", "", "", ""),
    cityCheck = new Array(false, false, false, false, false),
    stateCheck = new Array(false, false, false, false, false),
    countryCheck = new Array(false, false, false, false, false),
    pinCodeCheck = new Array(false, false, false, false, false);
  function validateEach(key, val, ind) {
    switch (key) {
      case "fname":
        if (val == "") {
          $("#fNameP").html("Can't be empty");
          fNameCheck = false;
          return false;
        }
        var patt = /[^(a-zA-Z )]/g;
        if (!patt.exec(val)) {
          redTick($("#fNameP"));
          fNameCheck = val;
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
          redTick($("#mNameP"));
          mNameCheck = val;
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
          redTick($("#lNameP"));
          lNameCheck = val;
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
          redTick($("#emailP"));
          emailCheck = val;
          return true;
        } else {
          $("#emailP").html("Invalid email address");
        }
        emailCheck = false;
        return false;

      case "pan":
        var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!regex.test(val)) {
          panCheck = false;
          $("#panP").html("Invalid PAN no.");
          return false;
        }
        panCheck = val;
        redTick($("#panP"));
        return true;

      case "aadhaar":
        var regex = /[2-9]{1}[0-9]{3}\-[0-9]{4}\-[0-9]{4}$/;
        if (!regex.test(val)) {
          aadhaarCheck = false;
          $("#aadhaarP").html("Invalid Aadhaar");
          return false;
        }
        aadhaarCheck = val;
        console.log(aadhaarCheck);
        redTick($("#aadhaarP"));
        return true;

      case "cnum":
        console.log("ind=" + ind);
        var patt = /[^0-9]/g;
        if (val.length == 10) {
          if (!patt.exec(val)) {
            redTick($("#scnumP" + ind));
            cnumCheck[ind] = val;
            return true;
          } else {
            $("#scnumP" + ind).html("Invalid phone number");
            cnumCheck[ind] = false;
            return false;
          }
        } else {
          $("#scnumP" + ind).html("Should be 10 digits");
          cnumCheck[ind] = false;
          return false;
        }

      case "al1":
        if (val == "") {
          $("#al1P_" + ind).html("Can't be empty");
          return false;
        }
        al1Check[ind] = val;
        redTick($("#al1P_" + ind));
        return true;

      case "al2":
        if (val == "") {
          al2Check[ind] = "";
          return false;
        }
        al2Check[ind] = val;
        console.log(al2Check);
        return true;

      case "city":
        if (val == "") {
          $("#cityP_" + ind).html("Can't be empty");
          cityCheck[ind] = false;
          return false;
        }
        var patt = /[^(a-zA-Z )]/g;
        if (!patt.exec(val)) {
          redTick($("#cityP_" + ind));
          cityCheck[ind] = val;
          return true;
        }
        $("#cityP_" + ind).html("Invalid city name");
        cityCheck[ind] = false;
        return false;

      case "state":
        if (val == null) {
          stateCheck[ind] = false;
          console.log(stateCheck);
          return false;
        }
        stateCheck[ind] = val;
        console.log(stateCheck);
        return true;

      case "country":
        if (val == "select") {
          countryCheck[ind] = false;
          $("#stateSecondary_" + ind).html(null);
          // $("#stateSecondary_" + ind).focus();
          console.log(countryCheck);
          return false;
        }
        countryCheck[ind] = val;
        console.log(countryCheck);
        $("#stateSecondary_" + ind).focus();
        return true;

      case "pin":
        console.log("ind=" + ind);
        if (val.length == 6) {
          redTick($("#pinCodeP_" + ind));
          pinCodeCheck[ind] = val;
          return true;
        } else {
          $("#pinCodeP_" + ind).html("Invalid PIN Code");
          pinCodeCheck[ind] = false;
          return false;
        }
    }
  }

  $("#myForm").submit(function validateform() {
    var countErrors = 0;
    var stringDisplay = "";
    if ($("input[type=file]").val() == "") {
      stringDisplay += " > Photo not uploaded!\n";
      countErrors += 1;
    }
    if (fNameCheck) {
      $("#resultfNameP").html(fNameCheck);
    } else {
      stringDisplay += " > Enter valid First Name\n";
      countErrors += 1;
    }

    if (mNameCheck) {
      $("#resultmNameP").html(mNameCheck);
    } else {
      stringDisplay += " > Enter valid Middle Name\n";
      countErrors += 1;
    }

    if (lNameCheck) {
      $("#resultlNameP").html(lNameCheck);
    } else {
      stringDisplay += " > Enter valid Last Name\n";
      countErrors += 1;
    }

    // if (!Check) {
    //   $("#result P").html(Check);
    // } else {
    //   stringDisplay += "\n";
    //   countErrors += 1;
    // }

    if (emailCheck) {
      $("#resultemailP").html(emailCheck);
    } else {
      stringDisplay += " > Enter valid Email Address\n";
      countErrors += 1;
    }

    if (panCheck) {
      $("#resultpanP").html(panCheck);
    } else {
      stringDisplay += " > Enter valid Pan No.\n";
      countErrors += 1;
    }

    if (aadhaarCheck) {
      $("#resultaadhaarP").html(aadhaarCheck);
    } else {
      stringDisplay += " > Enter valid Aadhaar No.\n";
      countErrors += 1;
    }

    for (var i = 0; i <= phoneCount; ++i) {
      if (cnumCheck[i]) {
        $("#resultscnumP" + i).html(cnumCheck[i]);
        if (i != 0) {
          $("#resultSecContNum" + i).show();
        }
      } else {
        stringDisplay += " > Enter valid Contact No." + (i + 1) + "\n";
        countErrors += 1;
      }
    }
    var addrString = "";
    for (var i = 0; i <= addressCount; ++i) {
      addrString = "";
      if (
        al1Check[i] &&
        cityCheck[i] &&
        stateCheck[i] &&
        countryCheck[i] &&
        pinCodeCheck[i]
      ) {
        addrString += al1Check[i];
        if (al2Check[i] != "") {
          addrString += ", " + al2Check[i];
        }
        addrString += ", " + cityCheck[i];
        addrString += ", " + stateCheck[i];
        addrString += ", " + countryCheck[i];
        addrString += " - " + pinCodeCheck[i];
        $("#resultP_" + i).html(addrString);
        if (i != 0) {
          $("#resultSecAdd" + i).show();
        }
      } else {
        stringDisplay += " > Enter valid Address No.:" + (i + 1) + "\n";
        countErrors += 1;
      }
    }

    if (countErrors > 0) {
      alert(
        "There are in total " +
          countErrors +
          " errors while submitting the form. The errors are: " +
          stringDisplay +
          "\nPlease resolve them."
      );
      return false;
    }
    // if (
    //   fNameCheck &&
    //   mNameCheck &&
    //   lNameCheck &&
    //   emailCheck &&
    //   panCheck &&
    //   aadhaarCheck
    // ) {
    //   alert("Please fill up the required details properly.");
    //   return false;
    // }

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
    alert("Form submitted successfully!");
    $("#registration").fadeOut("slow", function () {
      window.setTimeout(4300);
      $("#result").fadeIn("slow");
    });

    // return true;
    return false;
  });

  $("#fname").focusout(function () {
    validateEach("fname", $(this).val());
  });
  $("#mname").focusout(function () {
    validateEach("mname", $(this).val());
  });
  $("#lname").focusout(function () {
    validateEach("lname", $(this).val());
  });

  $("#email").focusout(function () {
    validateEach("email", $(this).val());
  });

  $("#cnum").focusout(function () {
    validateEach("cnum", $(this).val(), 0);
  });

  // panCheck
  $("#pan").focusout(function () {
    validateEach("pan", $(this).val());
  });

  // aadhaarCheck

  $("#aadhaar").keyup(function () {
    var value = $(this).val();
    value = value
      .replace(/\D/g, "")
      .split(/(?:([\d]{4}))/g)
      .filter((s) => s.length > 0)
      .join("-");
    $(this).val(value);
  });

  $("#aadhaar").on("change, blur", function () {
    validateEach("aadhaar", $(this).val());
  });

  $("#al1_0").focusout(function () {
    validateEach("al1", $(this).val(), 0);
  });

  $("#al2_0").focusout(function () {
    validateEach("al2", $(this).val(), 0);
  });

  $("#city_0").focusout(function () {
    validateEach("city", $(this).val(), 0);
  });

  $("#stateSecondary_0").focusout(function () {
    validateEach("state", $(this).val(), 0);
  });

  $("#country_0").change(function () {
    validateEach("country", $(this).val(), 0);
  });

  $("#pinCode_0").focusout(function () {
    validateEach("pin", $(this).val(), 0);
  });

  var phoneCount = 0;
  $("#addPhone").click(function () {
    phoneCount += 1;
    var localPhoneCount = phoneCount;
    if (phoneCount == 5) {
      alert("You cannot add any more numbers!");
      phoneCount -= 1;
      return false;
    }
    var st = '<div class="row" id="secContNum' + phoneCount + '"';
    st += '><label for="scnum' + phoneCount;
    st += '" class="attr">Secondary Contact number' + phoneCount;
    st += '&nbsp;</label><input type="text" id="scnum' + phoneCount;
    st += '" name="scnum' + phoneCount;
    st +=
      '" class="val tenMargin" placeholder="Secondary Contact number' +
      phoneCount;
    st += '"/><img class="minus" id="minusPhone' + phoneCount;
    st += '" src="Images/minus.png" /><p id="scnumP' + phoneCount;
    st += '" class="comment"></p></div>';
    if (phoneCount != 1) {
      var hideMinusBtn = "#secContNum" + (phoneCount - 1) + " .minus";
      $(hideMinusBtn).hide();
    }
    $("#contactList").append(st);
    $("#minusPhone" + phoneCount).click(function () {
      var removeContNum = "#" + $(this).parent().attr("id");
      //alert(removeContNum);
      $(removeContNum).remove();
      phoneCount -= 1;
      if (phoneCount == 0) {
        return;
      }
      var showMinusBtn = "#secContNum" + phoneCount + " .minus";
      $(showMinusBtn).show();
    });
    // console.log(phoneCount);
    $("#scnum" + phoneCount).focusout(function () {
      console.log("#scnum" + localPhoneCount);
      validateEach("cnum", $(this).val(), localPhoneCount);
    });
  });
  var countryList = {
    select: null,
    India:
      '<option value="Andhra Pradesh">Andhra Pradesh</option><option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option><option value="Arunachal Pradesh">Arunachal Pradesh</option><option value="Assam">Assam</option><option value="Bihar">Bihar</option><option value="Chandigarh">Chandigarh</option><option value="Chhattisgarh">Chhattisgarh</option><option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option><option value="Daman and Diu">Daman and Diu</option><option value="Delhi">Delhi</option><option value="Lakshadweep">Lakshadweep</option><option value="Puducherry">Puducherry</option><option value="Goa">Goa</option><option value="Gujarat">Gujarat</option><option value="Haryana">Haryana</option><option value="Himachal Pradesh">Himachal Pradesh</option><option value="Jammu and Kashmir">Jammu and Kashmir</option><option value="Jharkhand">Jharkhand</option><option value="Karnataka">Karnataka</option><option value="Kerala">Kerala</option><option value="Madhya Pradesh">Madhya Pradesh</option><option value="Maharashtra">Maharashtra</option><option value="Manipur">Manipur</option><option value="Meghalaya">Meghalaya</option><option value="Mizoram">Mizoram</option><option value="Nagaland">Nagaland</option><option value="Odisha">Odisha</option><option value="Punjab">Punjab</option><option value="Rajasthan">Rajasthan</option><option value="Sikkim">Sikkim</option><option value="Tamil Nadu">Tamil Nadu</option><option value="Telangana">Telangana</option><option value="Tripura">Tripura</option><option value="Uttar Pradesh">Uttar Pradesh</option><option value="Uttarakhand">Uttarakhand</option><option value="West Bengal">West Bengal</option>',
    Australia:
      '<option value="New South Wales">New South Wales</option><option value="Queensland">Queensland</option><option value="South Australia">South Australia</option><option value="Tasmania">Tasmania</option><option value="Victoria">Victoria</option><option value="Western Australia">Western Australia</option>',
  };
  $(".valState").focus(function () {
    var countrySelect = $(".valState").parent().next().children().next();
    if (countrySelect.val() == "select") {
      /*checks whether country is selected or not*/
      $(this).html(countryList[countrySelect.val()]);
      countrySelect.focus();
    } else {
      $(this).html(countryList[countrySelect.val()]);
    }
  });

  $("#country").change(function () {
    $("#country")
      .parent()
      .prev()
      .children()
      .next()
      .html(countryList[$(this).val]);
  });
  var addressCount = 0;
  $("#addAddress").click(function () {
    addressCount += 1;
    var localAddressCount = addressCount;
    if (addressCount == 5) {
      alert("You cannot add any more addresses!");
      addressCount -= 1;
      return false;
    }
    var addString = '<div id="secondaryAddress' + addressCount + '">';
    addString += '<div class="row">';
    addString += "<h6>Secondary Address " + addressCount + "</h6>";
    addString += '<label for="al1_' + addressCount + '" class="attr1"';
    addString += ">Address Line 1&nbsp;<b>*</b></label";
    addString += ">";
    addString += "<textarea id";
    addString += '="al1_' + addressCount + '"';
    addString += '  name="al1_' + addressCount + '"';
    addString += '  class="valAL"';
    addString += '  rows="4"';
    addString += '  placeholder="Address Line 1"';
    addString += "></textarea>";

    addString += '<p class="comment" id="al1P_' + addressCount + '"></p>';
    addString += "</div>";

    addString += '<div class="row">';
    addString +=
      '<label for="al2_' +
      addressCount +
      '" class="attr1">Address Line 2&nbsp;</label>';
    addString += "<textarea id";
    addString += '="al2_' + addressCount + '" ';
    addString += 'name="al2_' + addressCount + '" ';
    addString += 'class="valAL" ';
    addString += 'rows="4" ';
    addString += 'placeholder="Address Line 2" ';
    addString += "></textarea>";
    addString += "</div>";
    addString += '<div class="row">';
    addString +=
      '<label for="city_' +
      addressCount +
      '" class="attr2">City&nbsp;<b>*</b></label>';
    addString += "<input type";
    addString += '="text" id';
    addString += '="city_' + addressCount + '" name';
    addString += '="city_' + addressCount + '" class';
    addString += '="val" placeholder';
    addString += '="City"';
    addString += "/>";

    addString += '<p class="comment" id="cityP_' + addressCount + '"></p>';
    addString += "</div>";
    addString += '<div class="row">';
    addString +=
      '<label for="stateSecondary_' + addressCount + '" class="attrState"';
    addString += ">State &nbsp;<b>*</b></label";
    addString += ">";
    addString += "<select id";
    addString += '="stateSecondary_' + addressCount + '" name';
    addString += '="state_' + addressCount + '" class';
    addString += '="valState"';
    addString += "></select>";
    addString += "</div>";
    addString += '<div class="row">';
    addString += '<label for="country_' + addressCount + '" class="valCountry"';
    addString += ">Country &nbsp;<b>*</b></label";
    addString += ">";
    addString +=
      '<select id="country_' +
      addressCount +
      '" name="country_' +
      addressCount +
      '" class="valCountrySelect">';
    addString += '<option value="select" selected>Select</option>';
    addString += '<option value="India">India</option>';
    addString += '<option value="Australia">Australia</option>';
    addString += "</select>";
    addString += "</div>";
    addString += '<div class="row">';
    addString += '<label for="pinCode_' + addressCount + '" class="attr2"';
    addString += ">Pin Code&nbsp;<b>*</b></label";
    addString += ">";
    addString += "<input type";
    addString += '="number" id';
    addString += '="pinCode_' + addressCount + '" name';
    addString += '="pinCode_' + addressCount + '"class';
    addString += '="val" placeholder';
    addString += '="Pin Code"';
    addString += "/>";

    addString += '<p class="comment" id="pinCodeP_' + addressCount + '"></p>';
    addString += "</div>";
    addString += '<p class="addOrSubtract" id="minusAdd_' + addressCount;
    addString += '"><img id';
    addString += '="minusAddress_' + addressCount + '" class';
    addString += '="subtractImage" src';
    addString += '="Images/minus.png"';
    addString += "/>Click on '-' button to remove above addresses";
    addString += "</p>";
    addString += "</div>";
    if (addressCount != 1) {
      var hideMinusBtn = "#minusAdd_" + (addressCount - 1);
      $(hideMinusBtn).hide();
    }

    $("#addressBook").append(addString);

    $(".valState").focus(function () {
      var countrySelect = $(this).parent().next().children().next();
      if (countrySelect.val() == "select") {
        /*checks whether country is selected or not*/
        $(this).html(countryList["select"]);
        countrySelect.focus();
      } else {
        $(this).html(countryList[countrySelect.val()]);
      }
    });
    $("#country_" + addressCount).change(function () {
      $("#country_" + addressCount)
        .parent()
        .prev()
        .children()
        .next()
        .html(countryList[$(this).val]);
    });
    $("#minusAddress_" + addressCount).click(function () {
      var removeAddress = $(this).parent().parent();
      //alert(removeContNum);

      addressCount -= 1;
      if (addressCount == 0) {
        $("#" + removeAddress.attr("id")).remove();
        return;
      }

      var showMinusBtn =
        "#" +
        removeAddress
          .prev()
          .children()
          .next()
          .next()
          .next()
          .next()
          .next()
          .next()
          .attr("id");
      $("#" + removeAddress.attr("id")).remove();
      $(showMinusBtn).show();
    });

    $("#al1_" + localAddressCount).focusout(function () {
      console.log("#al1_" + localAddressCount);
      validateEach("al1", $(this).val(), localAddressCount);
    });
    $("#al2_" + localAddressCount).focusout(function () {
      console.log("#al2_" + localAddressCount);
      validateEach("al2", $(this).val(), localAddressCount);
    });
    $("#city_" + localAddressCount).focusout(function () {
      console.log("#city_" + localAddressCount);
      validateEach("city", $(this).val(), localAddressCount);
      console.log(cityCheck);
    });
    $("#stateSecondary_" + localAddressCount).focusout(function () {
      console.log("#stateSecondary_" + localAddressCount);
      validateEach("state", $(this).val(), localAddressCount);
      //console.log(stateCheck);
    });
    $("#country_" + localAddressCount).change(function () {
      console.log("#country_" + localAddressCount);
      validateEach("country", $(this).val(), localAddressCount);
      //console.log(stateCheck);
    });
    $("#pinCode_" + localAddressCount).focusout(function () {
      console.log("#pinCode_" + localAddressCount);
      validateEach("pin", $(this).val(), localAddressCount);
      //console.log(stateCheck);
    });
  });
});
