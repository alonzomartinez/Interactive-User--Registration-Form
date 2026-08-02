document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const successMessage = document.getElementById('successMessage');

    // 1. Load saved username from localStorage
    const savedUsername = localStorage.getItem('registeredUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }

    // 2. Custom Validation Messages Object
    const validationRules = {
        username: (input) => {
            if (input.validity.valueMissing) return 'Username is required.';
            if (input.validity.tooShort) return `Username must be at least ${input.minLength} characters.`;
            return '';
        },
        email: (input) => {
            if (input.validity.valueMissing) return 'Email address is required.';
            if (input.validity.typeMismatch) return 'Please enter a valid email address.';
            return '';
        },
        password: (input) => {
            if (input.validity.valueMissing) return 'Password is required.';
            if (input.validity.patternMismatch) return 'Password does not meet the complexity requirements.';
            return '';
        },
        confirmPassword: (input) => {
            if (input.validity.valueMissing) return 'Please confirm your password.';
            if (input.value !== passwordInput.value) return 'Passwords do not match.';
            return '';
        }
    };

    // 3. Field validation runner
    function validateField(inputElement) {
        const fieldName = inputElement.name;
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        // Execute rule function based on field name
        const errorMessage = validationRules[fieldName](inputElement);

        if (errorMessage) {
            errorElement.textContent = errorMessage;
            inputElement.classList.add('invalid-field');
            inputElement.classList.remove('valid-field');
            return false;
        } else {
            errorElement.textContent = '';
            inputElement.classList.remove('invalid-field');
            inputElement.classList.add('valid-field');
            return true;
        }
    }

    // 4. Real-time validation listeners
    const inputs = [usernameInput, emailInput, passwordInput, confirmPasswordInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
            // Re-validate confirmation field automatically if original password changes
            if (input.id === 'password' && confirmPasswordInput.value !== '') {
                validateField(confirmPasswordInput);
            }
        });
    });

    // 5. Form submission handling
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        successMessage.style.display = 'none';

        let isFormValid = true;
        let firstInvalidInput = null;

        // Final validation check for all fields
        inputs.forEach(input => {
            const isValid = validateField(input);
            if (!isValid) {
                isFormValid = false;
                if (!firstInvalidInput) {
                    firstInvalidInput = input;
                }
            }
        });

        if (isFormValid) {
            // Process successful registration safely
            try {
                localStorage.setItem('registeredUsername', usernameInput.value.trim());
            } catch (error) {
                console.error('LocalStorage write failed:', error);
            }

            // Display UX success message
            successMessage.textContent = 'Registration successful!';
            successMessage.style.display = 'block';

            // Reset form tracking states and fields
            form.reset();
            inputs.forEach(input => {
                input.classList.remove('valid-field', 'invalid-field');
            });
        } else {
            // Shift focus to the first failing element
            firstInvalidInput.focus();
        }
    });
});