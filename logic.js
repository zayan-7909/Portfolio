document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".navbar .max-width > .menu-btn");
  const menuIcon = menuButton?.querySelector("i");
  const navigationMenu = document.querySelector(".navbar .menu");
  const contactForm = document.getElementById("contact-form");
  const successAlert = document.getElementById("alert");
  const errorAlert = document.getElementById("alert-error");

  if (menuButton && navigationMenu) {
    menuButton.addEventListener("click", () => {
      navigationMenu.classList.toggle("active");
      menuIcon?.classList.toggle("active");
    });
  }

  document.querySelectorAll(".navbar .menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navigationMenu?.classList.remove("active");
      menuIcon?.classList.remove("active");
    });
  });

  if (!contactForm) {
    return;
  }

  if (window.emailjs) {
    window.emailjs.init("bMNPtUmgroIe3lr47");
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
      subject: document.getElementById("topic").value.trim(),
      from_name: document.getElementById("name").value.trim(),
      message: document.getElementById("message").value.trim(),
      email_id: document.getElementById("email").value.trim()
    };

    if (!formData.subject || !formData.from_name || !formData.message || !formData.email_id) {
      showAlert(errorAlert);
      return;
    }

    if (!window.emailjs) {
      showAlert(errorAlert);
      return;
    }

    window.emailjs
      .send("service_8mq6ma1", "template_wfi7h9x", formData)
      .then(() => {
        contactForm.reset();
        showAlert(successAlert);
      })
      .catch(() => {
        showAlert(errorAlert);
      });
  });
});

function showAlert(alertElement) {
  if (!alertElement) {
    return;
  }

  alertElement.style.visibility = "visible";
}
