// FLIPCARD SCHEMA
// deck: String, required
// question: String, required
// answer: String, required
//
// deck:
//   {
//     name: String,
//     cards:
//       [
//         {
//           question: String,
//           answer: String
//         }
//       ]
//   }
const seedData = [
  {
    deckName: 'Math',
    cards: [
      {
        question: '√16',
        answer: '4'
      },
      {
        question: '2^5',
        answer: '32'
      },
      {
        question: '11 x 5',
        answer: '55'
      }
    ]
  },
  {
    deckName: 'Vocabulary',
    cards:
      [
        {
          question: 'obtuse',
          answer: 'difficult to understand'
        },
        {
          question: 'onerous',
          answer: 'involving, imposing, or constituting a burden'
        }
      ]

  }
];

module.exports = seedData;
