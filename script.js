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
                let row=`<tr onclick="openBook(${b.id})"><td>${b.title}</td><td>${b.author}</td><td>${b.category}</td><td>${b.year}</td></tr>`;
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
              
            }

            async function loadBooks() {
   let searchText = document.getElementById("searchInput").value;

    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchText}`;
searchText ="";
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
        });

    } catch (error) {
        console.error("Error fetching books:",error);
     }

 
}

             
               function deleteAllBooks(){
               localStorage.clear();
               window.location.href ="viewBook.html";

                
               } 

           