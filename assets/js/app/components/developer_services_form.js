// Take the form data from developer_services_form.js and send it
// to the feedback endpoint.
feedback_form.onsubmit = (e) => {
  e.preventDefault();
  // Check that the form has values for the required fields
  var message = "";
  if (customfield_10902.value === "") {
    message = message + "You must provide a first name.<br>";
  }
  if (customfield_10903.value === "") {
    message = message + "You must provide a last name.<br>";
  }
  if (feedback_email.value === "") {
    message = message + "You must provide an email address.<br>";
  }
  if (customfield_12401.value === "") {
    message = message + "You must provide a Company name.<br>";
  }
  if (message !== "") {
    $("#feedback_form").addClass("was-validated");
  } else {
    feedback_error.innerHTML = "";
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    // Loop over them and prevent submission
    var data = new FormData(feedback_form);
    var formData = [...data];
    var formDataPayloadBody = {};
    for (var index in formData) {
      if (formData[index][1] !== "") {
        formDataPayloadBody[formData[index][0]] = formData[index][1];
      }
    }
    // Get the checkbox group name val.
    var checkboxGroupName = "";
    $(".checkbox_group input[type=checkbox]").each(function () {
      if ($(this).attr("name") !== "other_services") {
        checkboxGroupName = $(this).attr("name");
        return true;
      }
    });
    // Make sure all the checkbox values are submitted as an array.
    formDataPayloadBody[checkboxGroupName] = data.getAll(checkboxGroupName);
    console.log(formDataPayloadBody);

    // Send the POST request.
    fetch(
      "https://avqfk3gzg2.execute-api.us-east-1.amazonaws.com/prod/formSubmit",
      {
        method: "POST",
        body: JSON.stringify(formDataPayloadBody),
        headers: { "X-Api-Key": "ox9fSkYfRK16mxy5Gv6pM121H7iAubAQ6uzsDmoW" },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        feedback_form.style.display = "none";
        feedback_response.innerHTML = result.message;
      });
  }
};
$(document).ready(function () {
  // Developer Services Contact Form
  if ($(".ds_contact_form_btn").length > 0) {
    $(".ds_contact_form_btn").on("click", () => {
      $("#dev_services_contact_modal").modal("toggle");
    });
  }
  // Developer Services Overview Download
  if ($(".ds_overview_download").length > 0) {
    $(".ds_overview_download").on("click", () => {
      $("#dev_services_overview_download").modal("toggle");
    });
  }
  // Check form exists in HTML
  if ($("#customfield_12905").length > 0) {
    $("#other_services").on("click", function () {
      $("#customfield_12905").prop("disabled", function (i, v) {
        return !v;
      });
    });
  }
});
