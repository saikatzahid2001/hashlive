// Drag and drop comments
const draggTriggers = document.querySelectorAll(".comments_drag_trigger");
let draggables = document.querySelectorAll(".comments_list");
const dragContainers = document.querySelectorAll(".comments_list_container");

draggTriggers.forEach((c, i) => {
  let dragStart = false;
  c.addEventListener("mousedown", (e) => {
    let elementDetails = draggables[i].getBoundingClientRect();
    let containerDetails = dragContainers[0].getBoundingClientRect();
    let x = e.screenX;
    let leftValue = x - containerDetails.left;
    let elemleftValue = elementDetails.left - containerDetails.left;
    elemleftValue = leftValue - elemleftValue;
    draggables[i].style.width = `calc(${elementDetails.width}px - 2rem)`;
    draggables[i].style.height = `calc(${elementDetails.height}px - 2rem)`;
    draggables[i].style.position = "absolute";
    draggables[i].style.top = `2rem`;
    draggables[i].style.left = `${leftValue}px`;
    draggables[i].style.transform = `translateX(-${elemleftValue}px)`;
    draggables[i].style.zIndex = `99`;
    draggables[i].style.transition = `none`;

    Object.values(draggablesObj).forEach(
      (c) => (c.style.transition = `all 0.2s linear`)
    );
    dragStart = true;
  });
  const draggablesObj = { ...draggables };
  delete draggablesObj[i];
  window.addEventListener("mousemove", (e) => {
    if (dragStart) {
      let containerDetails = dragContainers[0].getBoundingClientRect();
      let x = e.screenX;
      let leftValue = x - containerDetails.left;
      draggables[i].style.left = `${leftValue}px`;

      Object.values(draggablesObj).forEach((c, j) => {
        const moveIf =
          c.getBoundingClientRect().left + c.getBoundingClientRect().width / 2;
        if (x < moveIf) {
          c.style.transform = `translateX(calc(100% + 1rem))`;
        } else if (x > moveIf) {
          c.style.transform = `translateX(0)`;
        }
      });
    }
  });
  window.addEventListener("mouseup", (e) => {
    if (dragStart) {
      dragStart = false;
      const draggableElements = [...Object.values(draggablesObj)];
      draggableElements.forEach((c) => (c.style.transition = `none`));
      draggables.forEach((c) => {
        c.removeAttribute("style");
      });
      const afterElement = getDragAfterElement(e.clientX);
      const draggable = draggables[i];
      if (afterElement == null) {
        dragContainers[0].appendChild(draggable);
      } else {
        dragContainers[0].insertBefore(draggable, afterElement);
      }
      function getDragAfterElement(x) {
        const draggableElements = [...Object.values(draggablesObj)];

        return draggableElements.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
            } else {
              return closest;
            }
          },
          { offset: Number.NEGATIVE_INFINITY }
        ).element;
      }
      const commentHeadlines = document.querySelectorAll("#commentHeadline");
      getStrategyName(commentHeadlines);
    }
  });
});
// Remove comment
const deleteComment = function () {
  this.parentElement.parentElement.removeChild(this.parentElement);
};
document.querySelectorAll("#delete_comment").forEach((c) => {
  c.addEventListener("click", deleteComment);
});

// Table
const commentHeadlines = document.querySelectorAll("#commentHeadline");
const strategyName = document.querySelector("#strategyName");

const symbolMethodForComments = new SymbolMethod(
  "methodsTriggerComment",
  "methodsContainerComment",
  "s_m_other_textarea",
  "C"
);
const saveBtnComments = document.querySelector("#saveToTableComment");

const getStrategyName = (items) => {
  let strategy = "";
  items.forEach((c) => {
    strategy += c.innerText.charAt(0).toUpperCase();
  });
  strategyName.innerHTML = strategy;
  return strategy;
};

let postsTableData = [
  {
    modifiedBy: "User",
    date: "9/23/2021",
    commentingingMethod: "A",
    strategyName: getStrategyName(commentHeadlines),
    numberOfComments: "0",
    successRate: "N/A",
  },
];

const displayTableData = (data) => {
  const tbody = document.querySelector(".commentsGroupTable tbody");
  let row = "";
  data.forEach((c) => {
    row += `
        <tr>
            <td>${c.modifiedBy}</td>
            <td>${c.date}</td>
            <td>${c.commentingingMethod}</td>
            <td>${c.strategyName}</td>
            <td>${c.numberOfComments}</td>
            <td>${c.successRate}</td>
        </tr>
    `;
  });
  tbody.innerHTML = row;
};

displayTableData(postsTableData);

saveBtnComments.addEventListener("click", (e) => {
  e.preventDefault();
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  const commentHeadlines = document.querySelectorAll("#commentHeadline");

  postsTableData.push({
    modifiedBy: "User",
    date: today,
    commentingingMethod: symbolMethodForComments.getSymbol(),
    strategyName: getStrategyName(commentHeadlines),
    numberOfComments: `${Math.floor(Math.random() * 10)}`,
    successRate: "N/A",
  });

  displayTableData(postsTableData);
});

// Comments input
const addingInputTriggers = document.querySelectorAll(".add_inputs_comments");
const commentsLine = document.querySelectorAll("#commentsLine h3");
const commentsEditTriggers = document.querySelectorAll(
  ".comments_edit_trigger"
);

addingInputTriggers.forEach((c) => {
  c.addEventListener("click", function () {
    let prevInputs = this.parentElement.previousElementSibling;
    if (prevInputs.children.length < 100) {
      let comment = prompt("Please enter the comment...");
      let div = document.createElement("div");
      div.classList.add("c_l_input");
      let h3 = document.createElement("h3");
      h3.setAttribute("id", "commentsLine");
      h3.innerHTML = comment;
      div.appendChild(h3);
      let span = document.createElement("span");
      span.setAttribute("id", "delete_comment");
      span.innerHTML = '<i class="fas fa-times"></i>';
      span.addEventListener("click", deleteComment);
      div.appendChild(span);
      prevInputs.appendChild(div);
    } else {
      alert("You have added maximum number of items");
    }
  });
});

commentsEditTriggers.forEach((c) => {
  c.addEventListener("click", function () {
    if (!c.classList.contains("active")) {
      c.innerHTML = `<i class="fas fa-check"></i>`;
      c.classList.add("active");
      const allInputComments = [
        ...this.parentElement.parentElement.nextElementSibling.children,
      ];
      allInputComments.forEach((c) => {
        const ec = c.children[0];
        ec.contentEditable = "true";
        ec.style.textDecoration = "underline";
      });
      this.parentElement.parentElement.children[0].contentEditable = "true";
      this.parentElement.parentElement.children[0].focus();
    } else {
      c.classList.remove("active");
      c.innerHTML = `<i class="far fa-edit"></i>`;
      const headline = c.parentElement.parentElement.children[0];
      const inputField = c.parentElement.parentElement.nextElementSibling;
      disableAllEdits(inputField, headline);
    }
  });
});

commentsLine.forEach((c) => {
  c.addEventListener("click", () => {
    c.style.textDecoration = "none";
  });
});

const disableAllEdits = (currentInputField, headline) => {
  const commentHeadlines = document.querySelectorAll("#commentHeadline");
  getStrategyName(commentHeadlines);
  headline.contentEditable = "false";
  [...currentInputField.children].forEach((c) => {
    c.children[0].contentEditable = "false";
    c.children[0].style.textDecoration = "none";
  });
};

// document.addEventListener("click", (e) => {
//   commentsEditTriggers.forEach((c) => {
//     const headline = c.parentElement.parentElement.children[0];
//     const inputField = c.parentElement.parentElement.nextElementSibling;
//     if (
//       e.target !== c &&
//       !c.contains(e.target) &&
//       e.target !== headline &&
//       !headline.contains(e.target) &&
//       e.target !== inputField &&
//       !inputField.contains(e.target)
//     ) {
//       disableAllEdits(inputField, headline);
//     }
//   });
// });

// Generate comment
document.querySelector(".generate_comment").addEventListener("click", () => {
  document.querySelector(".g_c_copy").style.display = "block";
  const commentsList = document.querySelectorAll(".comments_list");
  const generatedComment = [];
  commentsList.forEach((c) => {
    const random = Math.floor(
      Math.random() * (c.children[1].children.length - 1)
    );
    generatedComment.push(c.children[1].children[random].children[0].innerText);
  });
  document.querySelector(".generated_comment").innerText =
    generatedComment.join(" ");
});

document
  .querySelector(".generated_comment_copy")
  .addEventListener("click", () => {
    navigator.clipboard.writeText(
      document.querySelector(".generated_comment").innerText
    );
    alert("Comment Copied");
  });
