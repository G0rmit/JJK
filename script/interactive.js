// Vriten
window.addEventListener("DOMContentLoaded", () => {
	const btn = document.querySelector("button[type='submit']");
	const emailInput = document.querySelector("#email");
	const nameInput = document.querySelector("#name");
	const suggestionInput = document.querySelector("#suggestion");
	const messageH3 = document.querySelector("footer h3");
	const form = document.querySelector("footer form");
	form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  btn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const suggestion = suggestionInput.value.trim();
    if (!email.endsWith("@dawsoncollege.qc.ca")) {
      messageH3.textContent = "suggestions from Dawsonites only!";
      return;
    }
    messageH3.textContent = `Thank you ${name} for suggesting ${suggestion}.`;
  });
});