document.querySelector(".edit_content").addEventListener("click", () => {
  const ec = document.querySelector(".editable_content");
  ec.contentEditable = "true";
  ec.focus();
});
