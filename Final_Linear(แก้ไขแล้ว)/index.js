const businesses = [
  {
    name: "Tech Solutions",
    skills: ["JavaScript", "Node.js", "React"],
    image: "img/logo1.jpg",
  },
  {
    name: "Pythonic Solutions",
    skills: ["Python", "Django", "Flask"],
    image: "img/logo2.jpg",
  },
  {
    name: "Java World",
    skills: ["Java", "Spring", "Hibernate"],
    image: "img/logo3.jpg",
  },
];

const interns = [
  {
    name: "John Smith",
    skills: ["JavaScript", "React", "Vue.js"],
    image: "img/01.jpg",
  },
  {
    name: "Michael Brown",
    skills: ["Python", "Django", "Flask"],
    image: "img/02.jpg",
  },
  {
    name: "Emily Johnson",
    skills: ["Java", "Spring", "Hibernate"],
    image: "img/03.jpg",
  },
  {
    name: "Daniel Garcia",
    skills: ["Java", "JavaScript"],
    image: "img/04.jpg",
  },
  {
    name: "Olivia Mille",
    skills: ["Java", "Python", "Hibernate"],
    image: "img/11.jpg",
  },
  {
    name: "Sophia Martinez",
    skills: ["Java", "React", "JavaScript"],
    image: "img/12.jpg",
  },
  {
    name: "Ethan Wilson",
    skills: ["Java", "React", "JavaScript"],
    image: "img/13.jpg",
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

var currentItemType; // เพิ่มตัวแปร global เพื่อเก็บประเภทของรายการที่จะเพิ่ม

    function showAddForm(itemType) {
        currentItemType = itemType; // กำหนดค่า currentItemType ให้เป็นประเภทของรายการที่จะเพิ่ม
        document.getElementById('addForm').style.display = 'block';
    }

    function hideAddForm() {
        document.getElementById('addForm').style.display = 'none';
    }

    function addItem() {
        var name = document.getElementById('nameInput').value;
        var skills = document.getElementById('skillsInput').value;
        var image = document.getElementById('imageInput').files[0];

        // ตรวจสอบว่า currentItemType เป็น 'intern' หรือ 'business' แล้วดำเนินการตามประเภทนั้นๆ
        if (currentItemType === 'intern') {
            // ทำตามการเพิ่ม intern
        } else if (currentItemType === 'business') {
            // ทำตามการเพิ่ม business
        }
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

   if (matches.length > 0) {
    var result = "<table>"; // เริ่มตาราง
    result += "<tr><th>Business</th><th>Intern</th><th>Skill</th><th>Images</th></tr>"; // เพิ่มแถวหัวตาราง
  
    matches.forEach(function (match) {
      var internImage = interns.find(function (intern) {
        return intern.name === match.intern;
      }).image;
  
      result += "<tr>"; // เริ่มแถวของข้อมูล
      result +=
        "<td>" +
        match.business +
        "</td><td>" +
        match.intern +
        "</td><td>" +
        match.skill +
        "</td><td><div class='match-images'>" +
        "<img src='" + internImage + "' alt='Intern Image'>" +
        "</div></td>";
      result += "</tr>"; // ปิดแถวของข้อมูล
    });
  
    result += "</table>"; // ปิดตาราง
    document.getElementById("matchResult").innerHTML = result;
    document.getElementById("matchResult").style.display = "block"; // แสดงผลลัพธ์
  } else {
    document.getElementById("matchResult").innerHTML = "No matches found.";
    document.getElementById("matchResult").style.display = "none"; // ซ่อนผลลัพธ์เมื่อไม่มีการจับคู่
  }
}  

window.onload = function () {
  createTable("businessTable", businesses);
  createTable("internTable", interns);
};
