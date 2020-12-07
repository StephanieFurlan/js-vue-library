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
      showSearchInput: false,
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
      filtered : [],
      searchText: "",
      showForm: false,
      showFilters: false,
      title: "",
      author: "",
      year: "",
      selected: ""
   },
   methods: {
      search() {
         this.showSearchInput = !this.showSearchInput;
         this.$nextTick(() => {
            this.$refs.search.focus();
         });
      },
      searchBook(e) {
         // search book - no matter which attribute! just string match
         // not case sensitive
         if (e.keyCode === 13) {
            // enter pressed
            var searchText = this.searchText.toUpperCase();
            this.filtered = this.books.filter(book => {
               return (book.title.toUpperCase().includes(searchText) | book.author.toUpperCase().includes(searchText) | book.year.toString().toUpperCase().includes(searchText));
            })
         }
      },
      searchAuthor() {
         if (this.selected != "All") {
            this.filtered = this.books.filter(book => {
               return book.author == this.selected;
            })
         } else {
            this.showAll();
         }
      },
      showAll() {
         this.filtered = this.books;
         console.log(this.minYear);
      },
      showAddBookForm() {
         this.showForm = !this.showForm;
      },
      showFiltersForm() {
         this.showFilters = !this.showFilters;
      },
      addBook() {
         var notEmpty = validateForm(this.title, this.author, this.year);
         if (notEmpty) {
            this.books.push({
               title: this.title,
               author: this.author,
               year: this.year
            });
            this.showAddBookForm();
         }
      }

   },
   beforeMount(){
      this.filtered = this.books;
   },
   computed: {
      minYear: function() {
         return range(this.books)[0];
      },
      maxYear: function() {
         return range(this.books)[1];
      },
      authorsList: function() {
         return listAuthors(this.books);
      }

   }
});


function validateForm(title, author, year) {
   return (title != '' && author != '' && year != '')
}

function listAuthors(booksArray) {
   let authors = [];
   booksArray.forEach(book => {
      if (!authors.includes(book.author)) {
         authors.push(book.author);
      }
   })
   return authors;
}

function range(booksArray) {
   let years = [];
   booksArray.forEach(book => {
      if (!years.includes(book.year)) {
         years.push(book.year);
      }
   })
   let x = Math.min.apply(Math, years);
   let y = Math.max.apply(Math, years);
   return [x, y];
}
