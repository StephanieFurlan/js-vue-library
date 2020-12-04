
Vue.component('book-list', {
   props: [
      'books'
   ],
   template: `
      <ul class="book-list">
         <li>
            <div>TITLE</div>
            <div>AUTHOR</div>
            <div>YEAR</div>
         </li>
         <li v-for="book in books">
            <div>{{book.title}}</div>
            <div>{{book.author}}</div>
            <div>{{book.year}}</div>
         </li>
      </ul>
      `
})

var app = new Vue({
   el: '#app',
   component: [
      'book-list'
   ],
   data: {
      title: '',
      author: '',
      year: '',
      search: '',
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
      		title: "Elogio della follia",
      		author: "Henri Laborit",
      		year: 1976
      	},
      	{
      		title: "La camera azzurra",
      		author: "George Simenon",
      		year: 1964
      	}
      ]
   },
   methods: {
      addBook: function() {
         this.books.push({
            title: this.title,
            author: this.author,
            year: this.year
         });
      },
      find: function() {
         console.log(findByAuthor(this.books, this.search))


      }
   }
})

function findByAuthor(bookArray, author) {
   return bookArray.filter(book => {
      return book.author.toLowerCase() == author.toLowerCase();
   })
}

function hey(value) {
   console.log(value);
}
