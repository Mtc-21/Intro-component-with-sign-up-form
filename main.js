  const input = document.getElementsByTagName
      ("input");
    const submit = document.querySelector("#submit");
    const modal = document.querySelector(".modal");
    const closeModal = document.querySelector(".close");

    const validateEmail = email => {
      return /^[a-z0-9_-]+(\.|[a-z0-9_-])+@[a-z]+(\.[a-z]+$|\.[a-z]+\.[a-z]+$)/ig.test(email)
    }

    const show = (elem) => {
      elem.style.marginBottom = "0";
      elem.nextElementSibling.style.marginBottom = "0.5rem";
      elem.nextElementSibling.style.display = "block";
      elem.classList.add("error");
      elem.classList.remove("valid");
    }

    const hide = (elem) => {
      elem.style.marginBottom = "1.2rem";
      elem.nextElementSibling.style.marginBottom = "0rem";
      elem.classList.remove("error");
      elem.nextElementSibling.style.display = "none";
      elem.classList.add("valid");
    }

    const validate = (elem) => {
      if (elem.type == "email") {
        !validateEmail(elem.value) ? show(elem) : hide(elem);
      }
      if (elem.type == "text") {
        !/^[a-z]+$|(\s[a-z]+)$/ig.test(elem.value) ? show(elem) : hide(elem);
      }
      if (elem.type == "password") {
        !elem.value || elem.value.length < 5 ? show(elem) : hide(elem);
      }
    }

    Array.from(input).forEach((elem) => {
      if (elem.type !== "submit") {
        elem.addEventListener("input", (e) => {
          validate(e.target)
        });
      }
    });

    submit.addEventListener("click", (e) => {
      let counter = 0;
      e.preventDefault();
      Array.from(input).forEach((elem) => {
        if (elem.type !== "submit") {
          validate(elem);
          if (elem.classList.contains("valid")) counter++;
        }
      });
      if (counter == 4) {
        modal.style.visibility = "visible";
      }
    });
    closeModal.addEventListener("click", () => {
      modal.style.visibility = "hidden";
    });