# Interactive Registration Form

An accessible and secure user registration form built using HTML, CSS, and vanilla JavaScript. This project implements strict client-side validation using the browser's native **Constraint Validation API** paired with real-time UX feedback.

## Features

* **Real-Time Validation**: Field requirements are verified as the user types.
* **Smart Password Complexity**: Validates length, case matching, and numerical requirements natively.
* **Synchronized Password Confirmation**: Automatically updates the validation state of the confirmation field if the primary password changes.
* **Persistent Identity Handling**: Automatically saves the username to `localStorage` upon a successful registration and pre-fills it on subsequent visits.
* **Accessible UX Architecture**: Focuses automatically on the first failing input upon an invalid submit, and utilizes `aria-live="polite"` elements for real-time assistive announcements.

## Project Structure

```text
interactive-registration-form/
├── index.html 
├── style.css 
└── script.js 
```

## Setup Instructions

1. **Create the Project Directory**:
   ```bash
   mkdir interactive-registration-form
   cd interactive-registration-form
   ```
2. **Create the Files**: Initialize clean files named `index.html`, `style.css`, and `script.js` inside that folder.
3. **Insert the Source Code**: Paste the respective codebase logic into each file.
4. **Launch the Application**: Double-click `index.html` or run it via a local development server (such as VS Code's Live Server extension) to open it in your browser.

## Testing Checklist

To confirm the validation logic works exactly as intended, complete the following validation tests in your browser:

| Target Component | Test Case Scenario | Expected Behavior |
| :--- | :--- | :--- |
| **Username Field** | Leave blank or enter fewer than 3 characters. | Blocks submit; alerts with clear character requirements. |
| **Email Field** | Enter a malformed address (e.g., `test@`). | Catches invalid structure using built-in API formats. |
| **Password Field** | Input text missing uppercase letters or numbers. | Triggers validation using custom regex patterns. |
| **Confirm Password** | Provide something different from the password field. | Evaluates and outputs a "mismatch" message. |
| **Form Submission** | Click register while multiple fields are invalid. | Halts submit, shows all errors, and moves focus to the first error. |
| **Local Storage** | Fill valid values, submit successfully, and refresh. | Form resets cleanly, but the username field stays pre-filled. |