// Global
let symbolForTable = "A";

// Symbol Mathod
const methodsTrigger = document.querySelector(".methodsTrigger");
const methodsContainer = document.querySelector(".methodsContainer");

methodsTrigger.addEventListener("click", function () {
  if (methodsContainer.style.display === "block") {
    methodsContainer.style.display = "none";
    this.children[2].innerHTML = '<i class="fas fa-chevron-down"></i>';
  } else {
    methodsContainer.style.display = "block";
    this.children[2].innerHTML = '<i class="fas fa-chevron-up"></i>';
  }
});

[...methodsContainer.children].forEach((c) => {
  c.addEventListener("click", () => {
    const symbol = c.children[0].innerHTML;
    const method = c.children[1].innerHTML;
    methodsTrigger.children[0].innerText = symbol;
    methodsTrigger.children[1].innerText = method;
    symbolForTable = symbol;
    methodsContainer.style.display = "none";
    methodsTrigger.children[2].innerHTML =
      '<i class="fas fa-chevron-down"></i>';
  });
});

document.addEventListener("click", (e) => {
  if (
    e.target !== methodsContainer &&
    !methodsContainer.contains(e.target) &&
    e.target !== methodsTrigger &&
    !methodsTrigger.contains(e.target)
  ) {
    methodsContainer.style.display = "none";
    methodsTrigger.children[2].innerHTML =
      '<i class="fas fa-chevron-down"></i>';
  }
});

// Mobile Slider
const slides = document.querySelectorAll(".image_sildes");
const slideDots = document.querySelector(".image_slider_dots").children;
const slideNext = document.querySelector(".slide_right_control");
const slidePrev = document.querySelector(".slide_left_control");

function dates() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let nextDay = new Date();
  nextDay.setDate(tomorrow.getDate() + 1);
  dd = tomorrow.getDate();
  mm = tomorrow.getMonth() + 1;
  yyyy = tomorrow.getFullYear();
  tomorrow = mm + "/" + dd + "/" + yyyy;
  dd = nextDay.getDate();
  mm = nextDay.getMonth() + 1;
  yyyy = nextDay.getFullYear();
  nextDay = mm + "/" + dd + "/" + yyyy;

  return [today, tomorrow, nextDay];
}

function goToslide(slider, slide) {
  slider.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });

  const getDates = dates();
  document.querySelector("#sildeDate").innerText = getDates[slide];
}

let curSlide = 0;
let maxSlide = slides.length;
goToslide(slides, curSlide);

slideNext.addEventListener("click", () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  [...slideDots].forEach((c) => c.classList.remove("active"));
  slideDots[curSlide].classList.add("active");
  goToslide(slides, curSlide);
});
slidePrev.addEventListener("click", () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  [...slideDots].forEach((c) => c.classList.remove("active"));
  slideDots[curSlide].classList.add("active");
  goToslide(slides, curSlide);
});

[...slideDots].forEach((c, i) => {
  c.addEventListener("click", () => {
    [...slideDots].forEach((c) => c.classList.remove("active"));
    c.classList.add("active");
    curSlide = i;
    goToslide(slides, i);
  });
});

// Table Data
const saveBtn = document.querySelector("#saveToTable");

let postsTableData = [
  {
    modifiedBy: "User",
    postingMethod: "A",
    date: "9/23/2021",
    numberOfPosts: "0",
    successRate: "N/A",
  },
];

const displayTableData = (data) => {
  const tbody = document.querySelector(".postsGroupTable tbody");
  let row = "";
  data.forEach((c) => {
    row += `
        <tr>
            <td>${c.modifiedBy}</td>
            <td>${c.postingMethod}</td>
            <td>${c.date}</td>
            <td>${c.numberOfPosts}</td>
            <td>${c.successRate}</td>
        </tr>
    `;
  });
  tbody.innerHTML = row;
};

displayTableData(postsTableData);

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  postsTableData.push({
    modifiedBy: "User",
    postingMethod: symbolForTable,
    date: today,
    numberOfPosts: `${Math.floor(Math.random() * 10)}`,
    successRate: "N/A",
  });

  displayTableData(postsTableData);
});

const removeBtnInMobile = document.querySelector(".remove");

if (removeBtnInMobile) {
  removeBtnInMobile.addEventListener("click", () => {
    slides[curSlide].children[0].src = "./assets/images/t.png";
  });
}
