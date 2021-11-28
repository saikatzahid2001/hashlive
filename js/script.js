const iconToggle = (t, c, cn) => {
  if (c.style.display === "block") {
    t.children[0].className = "fas fa-times";
  } else {
    t.children[0].className = cn;
  }
};
const displayToggle = (t, c) => {
  t.classList.toggle("active");
  if (c.style.display === "block") {
    c.style.display = "none";
  } else {
    c.style.display = "block";
  }
};

// Chat
const actionBtnChat = document.querySelector(".actionBtnChat");
const chat_close_btn = document.querySelector(".chat_close_btn");
const chat_box_container = document.querySelector(".chat_box_container");

actionBtnChat.addEventListener("click", () => {
  actionBtnChat.classList.toggle("active");

  if (chat_box_container.style.display === "flex") {
    chat_box_container.style.display = "none";
    actionBtnChat.children[0].className = "far fa-comments";
    if (window.innerWidth <= 600) {
      document.querySelector("body").style.overflow = "auto";
      document.querySelector(".floating_action_buttons").style.zIndex = 1;
    }
  } else {
    chat_box_container.style.display = "flex";
    actionBtnChat.children[0].className = "fas fa-times";
    if (window.innerWidth <= 600) {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector(".floating_action_buttons").style.zIndex = 3;
    }
  }
});

chat_close_btn.addEventListener("click", () => {
  if (window.innerWidth <= 600) {
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".floating_action_buttons").style.zIndex = 1;
  }
  chat_box_container.style.display = "none";
  actionBtnChat.classList.remove("active");
  actionBtnChat.innerHTML = `<i class="far fa-comments"></i>`;
});

// Notification
const notifications_trigger = document.querySelector(".notifications_trigger");
const notifications_container = document.querySelector(
  ".notifications_container"
);
notifications_trigger.addEventListener("click", () => {
  displayToggle(notifications_trigger, notifications_container);
});

// Question Action
const question_box_trigger = document.querySelector(".question_box_trigger");
const question_box_container = document.querySelector(
  ".question_box_container"
);
question_box_trigger.addEventListener("click", () => {
  displayToggle(question_box_trigger, question_box_container);
  iconToggle(question_box_trigger, question_box_container, "fas fa-question");
});

// Bulb Action
const bulb_trigger = document.querySelector(".bulb_trigger");
const bulb_container = document.querySelector(".bulb_container");
bulb_trigger.addEventListener("click", () => {
  displayToggle(bulb_trigger, bulb_container);
  iconToggle(bulb_trigger, bulb_container, "far fa-lightbulb");
});

// User Settings
const user_settings_trigger = document.querySelector(".user_settings_trigger");
const user_settings_container = document.querySelector(
  ".user_settings_container"
);
user_settings_trigger.addEventListener("click", () => {
  displayToggle(user_settings_trigger, user_settings_container);
});

document.addEventListener("click", (e) => {
  if (
    e.target !== chat_box_container &&
    !chat_box_container.contains(e.target) &&
    e.target !== actionBtnChat &&
    !actionBtnChat.contains(e.target)
  ) {
    chat_box_container.style.display = "none";
    actionBtnChat.classList.remove("active");
    actionBtnChat.innerHTML = `<i class="far fa-comments"></i>`;
  }
  if (
    e.target !== question_box_container &&
    !question_box_container.contains(e.target) &&
    e.target !== question_box_trigger &&
    !question_box_trigger.contains(e.target)
  ) {
    question_box_container.style.display = "none";
    question_box_trigger.classList.remove("active");
    question_box_trigger.innerHTML = `<i class="fas fa-question"></i>`;
  }
  if (
    e.target !== bulb_container &&
    !bulb_container.contains(e.target) &&
    e.target !== bulb_trigger &&
    !bulb_trigger.contains(e.target)
  ) {
    bulb_container.style.display = "none";
    bulb_trigger.classList.remove("active");
    bulb_trigger.innerHTML = `<i class="far fa-lightbulb"></i>`;
  }
  if (
    e.target !== notifications_container &&
    !notifications_container.contains(e.target) &&
    e.target !== notifications_trigger &&
    !notifications_trigger.contains(e.target)
  ) {
    notifications_container.style.display = "none";
    notifications_trigger.classList.remove("active");
  }
  if (
    e.target !== user_settings_container &&
    !user_settings_container.contains(e.target) &&
    e.target !== user_settings_trigger &&
    !user_settings_trigger.contains(e.target)
  ) {
    user_settings_container.style.display = "none";
    user_settings_trigger.classList.remove("active");
  }
});

// Sidemenu
const menuBtn = document.querySelector(".menu_bar");
const displayToggleArray = [
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
