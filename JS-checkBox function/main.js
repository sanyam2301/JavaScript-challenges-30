const checkboxes = document.querySelectorAll(".item input");

let lastChecked;

function handleCheck(e) {
    // the shift key is down and they are checking the box
    if (e.shiftKey && this.checked) {
        let inBetween = false;
        checkboxes.forEach(checkbox => {
            // console.log(checkbox)
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
                // console.log("this is point")
            }

            if (inBetween) {
                checkbox.checked = true;
            }
        })
    }

    lastChecked = this;
}

checkboxes.forEach(checkbox => { checkbox.addEventListener('click', handleCheck) })