// to do
// button click - change layout
// messagge for incorrect data (decide where to put)
// category message maybe?? - near the show all button?
// clear inputs after acept state
// filtered array is the better choice??? maybe map first to this.book without a beforeMount method?


var bookList = Vue.component('book-list', {
   props: [
      'filtered'
   ],
   template: `
      <ul class="book-list">
         <li>
            <div>TITLE</div>
            <div>AUTHOR</div>
            <div>YEAR</div>
         </li>
         <li v-for="book in filtered">
            <div>{{book.title}}</div>
            <div>{{book.author}}</div>
            <div>{{book.year}}</div>
         </li>
      </ul>
      `
})

var app = new Vue({
   el: '#app',
   components: {
      bookList
   },
   data: {
      title: '',
      author: '',
      year: '',
      search: '',
      searchActive: false,
      addActive: false,
      addShowMessage: false,
      message: '',
      books : [
      	{
      		title: "Il vecchio e il mare",
      		author: "Ernest Hemingway",
      		year: 1951
      	},
      	{
      		title: "La forma dell'acqua",
      		author: "Andrea Camilleri",
      		year: 1994
      	},
      	{
      		title: "La forma dell'acqua 1",
      		author: "Andrea Camilleri",
      		year: 1995
      	},
      	{
      		title: "La forma dell'acqua 2",
      		author: "Andrea Camilleri",
      		year: 1996
      	},
      	{
      		title: "Elogio della follia",
      		author: "Henri Laborit",
      		year: 1976
      	},
      	{
      		title: "La camera azzurra 1",
      		author: "George Simenon",
      		year: 1963
      	},
      	{
      		title: "La camera azzurra 2",
      		author: "George Simenon",
      		year: 1964
      	},
      	{
      		title: "La camera azzurra 3",
      		author: "George Simenon",
      		year: 1965
      	},
      	{
      		title: "La camera azzurra 4",
      		author: "George Simenon",
      		year: 1966
      	}
      ],
      filtered : []
   },
   methods: {
      addBook() {
         var notEmpty = validateForm(this.title, this.author, this.year);
         if (notEmpty) {
            this.books.push({
               title: this.title,
               author: this.author,
               year: this.year
            });

            // maybe not here!!! after click close form and display message elsewhere
            this.addShowMessage = true;
            this.message = "Book added successfully! -- to change where to put on screen";
         } else {
            this.addShowMessage = true;
            this.message = "Error: empty fields not allowed!";
         }

      },
      searchBook() {
         this.filtered = findByAuthor(this.books, this.search);

      },
      showAll() {
         this.filtered = this.books;
         this.addActive = false;
         this.searchActive = false;
      },
      toggleSearch() {
         this.searchActive = !this.searchActive;
         this.addActive = false;
      },
      toggleAdd() {
         this.addActive = !this.addActive;
         this.searchActive = false;
      }

   },
   beforeMount(){
    this.filtered = this.books;
 }
})

function findByAuthor(bookArray, author) {
   return bookArray.filter(book => {
      return book.author.toLowerCase() == author.toLowerCase();
   })
}

function validateForm(title, author, year) {
   return (title != '' && author != '' && year != '')
}
