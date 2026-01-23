let menu = document.querySelector(".navbar");
let burger = document.querySelector(".burger");
burger.onclick =()=>{
    menu.classList.toggle("show");
    
}

function getBooks(){
    return JSON.parse(localStorage.getItem("books")||"[]");
}
    function saveBooks(books){
        localStorage.setItem("books",JSON.stringify(books));

    }
    function addBook(event){
        event.preventDefault();
        let book={
            id:Date.now(),
            title:document.querySelector("#title").value,
            author:document.querySelector("#author").value,
            category:document.querySelector("#category").value,
            year:document.querySelector("#year").value,
            isbn:document.querySelector("#isbn").value,
            status:"Available"
        };
            let books=getBooks();
            books.push(book);
            saveBooks(books);
            alert("Book Added Successfully!");
            window.location.href="viewBook.html";
        }
        function loadBooks(){
            let books=getBooks();
            let table=document.querySelector("#bookTable");
            books.forEach(b=>{
                let row=`<tr onclick="openBook(${b.id})"><td>${b.title}</td><td>${b.author}</td><td>${b.category}</td><td>${b.year}</td><td>${b.status}</td></tr>`;
                table.innerHTML+=row;
            });
            }
            function openBook(id){
                localStorage.setItem("currentBook",id);
                window.location.href="book-details.html";

            }
            function loadBookDetails(){
                let id=localStorage.getItem("currentBook");
                let books=getBooks();
                let book=books.find(b=>b.id==id);
                document.querySelector("#detailTitle").innerText=book.title;
                document.querySelector("#detailAuthor").innerText=book.author;
                document.querySelector("#detailCategory").innerText=book.category;
                document.querySelector("#detailYear").innerText=book.year;
                document.querySelector("#detailISBN").innerText=book.isbn;
                document.querySelector("#detailStatus").innerText=book.status;
            }




            async function loadBook() {
   let searchText = document.getElementById("searchInput").value;
 document.getElementById("text").innerHTML ="searching...";
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchText}`;

    try {
        // wait for response
        const response = await fetch(url);

        // convert to JSON
        const data = await response.json();

        const books = data.items;
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";
      

        books.forEach(book => {
            const info = book.volumeInfo;

            const row = document.createElement("tr");
               
            row.innerHTML = `
                <td>${info.title || "No Title"}</td>
                <td>${info.authors ? info.authors.join(", ") : "Unknown"}</td>
                <td>${info.categories ? info.categories.join(", ") : "None"}</td>
                <td>${info.publishedDate || "N/A"}</td>
            `;
           
            tableBody.appendChild(row);
                     document.getElementById("text").style.display ="none";

        });

    } catch (error) {
        document.getElementById("text").innerHTML=`Error Fetching book: ${error}`;
        console.error("Error fetching books:",error);
     }

 
}


    function deleteAllBooks(){
        localStorage.removeItem("books");
       location.reload();

        
     } 

     function displayTimeTableData(){
       let createNowButton = document.getElementById("createNowBtn");
         if(createNowButton.textContent =="Cancel"){
        createNowButton.textContent = "Create Now";
        createNowButton.style.background ="green"
       }else if(createNowButton.textContent =="Create Now"){
        createNowButton.textContent = "Cancel";
        createNowButton.style.background ="red";
       }

      
        let studyData = document.querySelector(".studyData");
        studyData.classList.toggle("displayData");
     }


     let timeTable = JSON.parse(localStorage.getItem("timetable")) || [];
     window.onload = function (){
        timeTable.forEach(item =>
             addRowToTable(item));
     };

    function addRow(){
        let day = document.getElementById("day").value;
        let module = document.getElementById("module").value;
        let time = document.getElementById("time").value;
        let duration = document.getElementById("duration").value;

        if(!day || !module || !time || !duration) {
            alert("please fill all fields");
            return;
        }
              location.reload();
    
        const studyData = {
            day, module, time, duration
        };

        timeTable.push(studyData);

        localStorage.setItem("timetable", JSON.stringify(timeTable));
 
        addRowToTable(data);

      

        }
        

        function addRowToTable(data){
            const  tBody = document.getElementById("table");

            const row = document.createElement("tr");

            row.innerHTML = 
            `<td>${data.day}</td>
            <td>${data.module}</td>
            <td>${data.time}</td>
            <td>${data.duration}</td>`

            tBody.appendChild(row);
                   

        }
        let delBtn = document.getElementById("deleteTimeTable");
      if(timeTable.length < 1){
        delBtn.style.display ="none";
      }else{
        delBtn.style.display ="flex";
      }

          function deleteTimeTable2(){
        localStorage.removeItem("timetable");
       location.reload();

        
     } 


