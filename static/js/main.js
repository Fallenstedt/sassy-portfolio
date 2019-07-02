//toggle nav bar
(function() {
  const open = document.getElementById("nav-open");
  const close = document.getElementById("nav-close");
  const navMobile = document.getElementById("nav-mobile");
  if (close && close.onclick == null) {
    close.onclick = () => navMobile.classList.add("hide");
  }
  if (open && open.onclick == null) {
    open.onclick = () => navMobile.classList.remove("hide");
  }
})();
