var businesses = [
  {
    name: "Business A",
    skills: ["JavaScript", "Node.js", "React"],
    image: "img/11.jpg",
  },
  {
    name: "Business B",
    skills: ["Python", "Django", "Flask"],
    image: "img/12.jpg",
  },
  {
    name: "Business C",
    skills: ["Java", "Spring", "Hibernate"],
    image: "img/13.jpg",
  },
];

var interns = [
  {
    name: "Intern 1",
    skills: ["JavaScript", "React", "Vue.js"],
    image: "img/01.jpg",
  },
  {
    name: "Intern 2",
    skills: ["Python", "Django", "Flask"],
    image: "img/02.jpg",
  },
  {
    name: "Intern 3",
    skills: ["Java", "Spring", "Hibernate"],
    image: "img/03.jpg",
  },
];

function createTable(tableId, data) {
  var table = document.getElementById(tableId);
  var tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  data.forEach(function (item) {
    var row = "<tr>";
    row += "<td>" + item.name + "</td>";
    row += "<td>" + item.skills.join(", ") + "</td>";
    row += '<td><img src="' + item.image + '" alt="' + item.name + '"></td>';
    row +=
      "<td><button onclick=\"deleteItem('" +
      tableId +
      "', '" +
      item.name +
      "')\">Delete</button></td>";
    row += "</tr>";
    tbody.innerHTML += row;
  });
}

function addItem() {
  var name = document.getElementById("nameInput").value;
  var skills = document.getElementById("skillsInput").value.split(",");
  var image = document.getElementById("imageInput").value;
  if (!name || !skills || !image) {
    alert("Please fill out all fields.");
    return;
  }

  var tableId = document.getElementById("addForm").dataset.tableId;
  if (tableId === "businessTable") {
    addItemToTable(name, skills, image, businesses);
  } else if (tableId === "internTable") {
    addItemToTable(name, skills, image, interns);
  }

  hideAddForm();
}

function addItemToTable(name, skills, image, table) {
  table.push({ name: name, skills: skills, image: image });
  createTable(table.id, table);
}

function deleteItem(tableId, name) {
  var table;
  if (tableId === "businessTable") {
    table = businesses;
  } else if (tableId === "internTable") {
    table = interns;
  }
  var index = table.findIndex(function (item) {
    return item.name === name;
  });
  if (index !== -1) {
    table.splice(index, 1);
    createTable(tableId, table);
  }
}
function showAddForm(tableType) {
  document.getElementById("addForm").style.display = "block";
  document.getElementById("addForm").dataset.tableId =
    tableType === "business" ? "businessTable" : "internTable";
}

function hideAddForm() {
  document.getElementById("addForm").style.display = "none";
}

function matchPairs() {
   var matches = [];

   // วนลูปผู้ประกอบการ
   businesses.forEach(function (business) {
     // วนลูปทักษะของผู้ประกอบการ
     business.skills.forEach(function (skill) {
       // วนลูปนักศึกษาฝึกงาน
       interns.forEach(function (intern) {
         // ถ้านักศึกษาฝึกงานมีทักษะเดียวกันกับผู้ประกอบการ
         if (intern.skills.includes(skill)) {
           // เพิ่มข้อมูลคู่ที่ตรงกันเข้าในอาร์เรย์ matches
           matches.push({
             business: business.name,
             intern: intern.name,
             skill: skill,
           });
         }
       });
     });
   });

   // แสดงผลลัพธ์
   if (matches.length > 0) {
     var result = "<ul>";
     matches.forEach(function (match) {
       result +=
         "<li>" +
         match.business +
         " - " +
         match.intern +
         " (" +
         match.skill +
         ")</li>";
     });
     result += "</ul>";
     document.getElementById("matchResult").innerHTML = result;
   } else {
     document.getElementById("matchResult").innerHTML = "No matches found.";
   }
}

window.onload = function () {
  createTable("businessTable", businesses);
  createTable("internTable", interns);
};
