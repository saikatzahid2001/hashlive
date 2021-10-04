const menuBtn = document.querySelector(".menu_bar");
const displayToggleArray = [
  document.querySelector(".sidebar .title"),
  document.querySelector(".sidebar .sider_bar_footer"),
  document.querySelector(".sidebar .bar_logo .logo"),
  ...document.querySelectorAll(".sidebar .navigation_menu ul li a .label"),
];
const widthToggleArray = [
  document.querySelector(".header"),
  document.querySelector(".body"),
  document.querySelector(".footer"),
];
menuBtn.addEventListener("click", () => {
  if (window.innerWidth > 992) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("expended");
    widthToggleArray.forEach((c) => c.classList.toggle("viewPortToggle"));
    if (sidebar.classList.contains("expended")) {
      displayToggleArray.forEach((c) => (c.style.display = "none"));
    } else {
      setTimeout(() => {
        displayToggleArray.forEach((c) => (c.style.display = "block"));
      }, 300);
    }
  } else {
    menuBtn.classList.toggle("cross_bar");
    document
      .querySelector(".mobile_menu_wrapper")
      .classList.toggle("sidebarinout");
  }
});

const profilesTriggers = document.querySelector(".profiles_triggers");
const profileTriggersDropdown = document.getElementById("p_t_dropdown");
profileTriggersDropdown.addEventListener("click", () => {
  if (profilesTriggers.style.display === "flex") {
    profileTriggersDropdown.innerHTML = "<i class='fas fa-chevron-down'></i>";
    profilesTriggers.style.opacity = "0";
    profilesTriggers.style.top = "30px";
    setTimeout(() => {
      profilesTriggers.style.display = "none";
    }, 300);
  } else {
    profileTriggersDropdown.innerHTML = "<i class='fas fa-chevron-up'></i>";
    profilesTriggers.style.display = "flex";
    setTimeout(() => {
      profilesTriggers.style.opacity = "1";
      profilesTriggers.style.top = "100%";
    }, 10);
  }
});
