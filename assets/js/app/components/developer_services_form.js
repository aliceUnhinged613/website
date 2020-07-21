$(document).ready(function() {
  console.log("Document ready function firing ...");
  $("#btnSubmit").click(function(event) {
    console.log("Feedback form submit firing ...");
    event.preventDefault();
    var form = $('#feedback-form');
    var data = new FormData(form);
    console.log(data);
    var jqxhr = $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: 'https://servicedesk.linaro.org/plugins/servlet/feedback/create',
      data: data,
      processData: false,
      contentType: false,
      cache: false,
    })
      .done(function(data) {
        $('#feedback-form').hide();
        $('#feedback-response').html(data);
      })
      .fail(function(e) {
        console.log("ERROR: ", e);
      })

    jqxhr.always(function() {
      console.log("Post finished");
    })
  });
});
