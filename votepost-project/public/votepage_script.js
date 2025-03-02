document.addEventListener('DOMContentLoaded', () => {

    const addOptionButton = document.getElementById('addOption');
    const optionsContainer = document.getElementById('optionsContainer');
    let optionCounter = 2; // Start with two options (A and B)
    const maxOptions = 6; // Max limit of options

    // Function to update all option labels, IDs, and remove button attributes
    function updateOptionLabels() {
        const optionDivs = optionsContainer.querySelectorAll('.option');
        optionDivs.forEach((div, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, ...
            div.id = `optionDiv${index + 1}`;

            const label = div.querySelector('label');
            label.setAttribute('for', `option${letter}`);
            label.textContent = `${letter} -`;

            const input = div.querySelector('input');
            input.setAttribute('id', `option${letter}`);

            const removeBtn = div.querySelector('.remove-btn');
            removeBtn.setAttribute('data-id', index + 1);
        });

        optionCounter = optionDivs.length; // Correctly update counter
    }

    // Add new option
    addOptionButton.addEventListener('click', () => {
        if (optionCounter < maxOptions) {
            const letter = String.fromCharCode(65 + optionCounter); // Get next letter
            const newOptionDiv = document.createElement('div');
            newOptionDiv.className = 'option';

            newOptionDiv.innerHTML = `
                <label for="option${letter}">${letter} -</label>
                <input type="text" id="option${letter}" name="options[]" required>
                <button type="button" class="remove-btn">❌</button>
            `;

            optionsContainer.appendChild(newOptionDiv);
            updateOptionLabels(); // Update labels after adding a new option
        } else {
            alert(`You can only have up to ${maxOptions} options.`);
        }
    });

    // Remove option and reorder
    optionsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const optionDiv = event.target.closest('.option');
            if (optionDiv && optionCounter > 2) {
                optionsContainer.removeChild(optionDiv);
                updateOptionLabels(); // Reorder everything after deletion
            } else {
                alert("You must have at least two options!");
            }
        }
    });

    // Form submission (purely logs data since there's no backend)
    document.getElementById('pollForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Stop default form submission

        const premise = document.getElementById('pollPremise').value;
        const options = Array.from(document.querySelectorAll('input[name="options[]"]')).map(input => input.value);

        console.log("Premise:", premise);
        console.log("Options:", options);

        alert("Poll created successfully! (Check the console for details)");
    });
});
