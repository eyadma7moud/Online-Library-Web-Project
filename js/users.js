const users = [
  {
    id: 1,
    name: "Eyad Mahmoud",
    email: "eyad@gmail.com",
    password: "123456",

    favourites: [1, 3],

    borrowedBooks: [
      {
        bookId: 2,
        borrowDate: "2026-03-20",
        returnDate: null,
      },
    ],
  },
  {
    id: 2,
    name: "Ali Saber Hassan",
    email: "ali@gmail.com",
    password: "123456",

    favourites: [2],

    borrowedBooks: [
      {
        bookId: 1,
        borrowDate: "2026-03-20",
        returnDate: null,
      },
    ],
  },
  {
    id: 3,
    name: "Nour Salah Alaa",
    email: "nour@gmail.com",
    password: "123456",

    favourites: [1, 2],

    borrowedBooks: [
      {
        bookId: 2,
        borrowDate: "2026-03-20",
        returnDate: null,
      },
    ],
  },
];


const totalUsers =  users.length;
document.getElementById("total-users").textContent = totalUsers;