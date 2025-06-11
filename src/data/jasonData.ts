// TypeScript version of the data with proper type definition

// Define the type for our data items
export interface DataItem {
  name: string;
  surname: string;
  price: number;
  id: string;
}

// Export the data with proper typing
const jasonData: DataItem[] = [
  {
    name: "2025-05-14T19:19:30.195Z",
    surname: "Mario Gleason IV",
    price: 35,
    id: "1"
  },
  {
    name: "2025-05-15T01:47:30.456Z",
    surname: "James Ullrich",
    price: 12,
    id: "2"
  },
  {
    name: "2025-05-14T21:44:05.741Z",
    surname: "Gladys Wiegand",
    price: 20,
    id: "3"
  },
  {
    name: "2025-05-14T22:29:11.133Z",
    surname: "Marianne Mayer-Bernhard",
    price: 2,
    id: "4"
  },
  {
    name: "2025-05-14T11:28:23.235Z",
    surname: "Vera Hirthe",
    price: 81,
    id: "5"
  },
  {
    name: "2025-05-14T21:43:28.708Z",
    surname: "Gayle Kohler",
    price: 94,
    id: "6"
  },
  {
    name: "2025-05-14T19:53:46.843Z",
    surname: "Alicia Corkery",
    price: 79,
    id: "7"
  },
  {
    name: "2025-05-15T00:55:58.198Z",
    surname: "Carolyn Block IV",
    price: 44,
    id: "8"
  },
  {
    name: "2025-05-15T03:38:35.337Z",
    surname: "Amy Emmerich",
    price: 80,
    id: "9"
  },
  {
    name: "2025-05-15T09:13:36.396Z",
    surname: "Doreen Schoen",
    price: 13,
    id: "10"
  }
  // Additional items omitted for brevity
];

export default jasonData; 