const loginForm=document.getElementById("loginForm");
if(loginForm){
    addEventListener("submit",function(event){
        event.preventDefault();
    
        const userId=document.getElementById("userId").value;
        const password=document.getElementById("password").value;
    
        fetch("users.json")
            .then(response => response.json())
            .then(data => {
                const user=data.users.find(u => u.userId===userId && u.password===password);
                if(user){
                    document.cookie='loggedInUser=${userId};path=/';
                    window.location.href='landing.html';
                }
                else{
                    document.getElementById("erroeMessage").innerText="Invalid Credentials";
                }
            });
    
    });
    

}
let usersData = [];
function loadUsers() {
    fetch("users.json")
        .then(response => response.json())
        .then(data => {
            usersData = data.users;
            displayUsers();
        })
        .catch(error => console.error("Error loading users:",error));
}
//User in table display
function displayUsers() {
    const userTable = document.getElementById("userTable").getElementsByTagName("tbody")[0];
    userTable.innerHTML = "";

    usersData.forEach((user, index) => {
        const row = userTable.insertRow();
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.userId}</td>
            <td>${user.degree.major}, ${user.degree.graduationYear}</td>
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
    });
}

function addUser() {
    const firstName = prompt("Enter first name:");
    const lastName = prompt("Enter last name:");
    const phoneNumber = prompt("Enter phone number:");
    const userId = prompt("Enter user ID:");
    const password = prompt("Enter password:");
    const degreeMajor = prompt("Enter degree major:");
    const degreeYear = prompt("Enter graduation year:");
    const institution = prompt("Enter institution name:");

    if (firstName && lastName && phoneNumber && userId && password && degreeMajor && degreeYear && institution) {
        const newUser = {
            firstName,
            lastName,
            phoneNumber,
            userId,
            password,
            degree: {
                major: degreeMajor,
                graduationYear: parseInt(degreeYear),
                institution
            }
        };
        usersData.push(newUser);
        displayUsers();
    } else {
        alert("Please fill in all fields to add a new user.");
    }
}

function editUser(index) {
    const user = usersData[index];

    const firstName = prompt("Edit first name:", user.firstName);
    const lastName = prompt("Edit last name:", user.lastName);
    const phoneNumber = prompt("Edit phone number:", user.phoneNumber);
    const userId = prompt("Edit user ID:", user.userId);
    const password = prompt("Edit password:", user.password);
    const degreeMajor = prompt("Edit degree major:", user.degree.major);
    const degreeYear = prompt("Edit graduation year:", user.degree.graduationYear);
    const institution = prompt("Edit institution name:", user.degree.institution);

    if (firstName && lastName && phoneNumber && userId && password && degreeMajor && degreeYear && institution) {
        usersData[index] = {
            firstName,
            lastName,
            phoneNumber,
            userId,
            password,
            degree: {
                major: degreeMajor,
                graduationYear: parseInt(degreeYear),
                institution
            }
        };
        displayUsers();
    } else {
        alert("Please fill in all fields to edit the user.");
    }
}

function deleteUser(index) {
    if (confirm("Are you sure you want to delete this user?")) {
        usersData.splice(index, 1);
        displayUsers();
    }
}

if (window.location.pathname.includes("landing.html")) {
    window.onload = loadUsers;
}