$(document).ready(function() {
    $('#date').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        maxDate: '+6m'
    });

    $('#reservationForm').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            event: {
                required: true
            },
            date: {
                required: true
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: 'Please enter your full name.',
                minlength: 'Name must be at least 2 characters.'
            },
            email: {
                required: 'Please enter your email.',
                email: 'Please enter a valid email address.'
            },
            event: {
                required: 'Please select an event.'
            },
            date: {
                required: 'Please select a date.'
            },
            message: {
                required: 'Please enter a message.',
                minlength: 'Message must be at least 10 characters.'
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },
        submitHandler: function(form) {
            const formData = $(form).serializeArray();
            const message = `Thank you, ${formData[0].value}! Your reservation for ${formData[2].value} on ${formData[3].value} has been received. We'll contact you at ${formData[1].value}.`;
            
            $('#dialog p').text(message);
            $('#dialog').dialog({
                modal: true,
                buttons: {
                    Ok: function() {
                        $(this).dialog('close');
                    }
                }
            });
            
            form.reset();
        }
    });
});