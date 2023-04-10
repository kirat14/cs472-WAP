// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {

                event.preventDefault();
                event.stopPropagation();

                
               
                var phoneObj = jQuery('#phone');
                phoneObj.get(0).setCustomValidity('');

                /* Phone validation */
                /* 123-456-7890
                (123) 456-7890
                123 456 7890
                123.456.7890
                +91 (123) 456-7890 */
                var pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i;
                if (!pattern.test(phoneObj.val())) {
                    phoneObj.get(0).setCustomValidity('Invalid');
                    phoneObj.siblings(".invalid-feedback").text("Please enter a valid Phone number!");
                }

                if (form.checkValidity()) {
                   console.log("Form valid");
                }
                form.classList.add('was-validated')
            }, false)
        })
})();