import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import pkg from 'graphql';
const { GraphQLSchema,GraphQLObjectType,GraphQLString,GraphQLNonNull,GraphQLList,GraphQLInt } = pkg;
const app = express()
const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

// {
//     message:String,
//     name:String,

// }
// const schema = new GraphQLSchema({
//     query:new GraphQLObjectType({
//         name:'helloworld',
//         fields:()=>({
//             message:{
//                 type:GraphQLString,
//                 resolve:()=>'Hello World'
//             },
//             name:{
//                 type:GraphQLString,
//                 resolve:()=>'Nusayeb'
//             }
//         })
//     }),
// })

const BookType = new GraphQLObjectType({
    name:'Book',
    description:"Book with written by",
    fields:()=>({
        id:{ type: new GraphQLNonNull(GraphQLInt)},
        name:{ type: new GraphQLNonNull(GraphQLString)},
        authorId:{ type: new GraphQLNonNull(GraphQLInt)},
    })
})
const RootType = new GraphQLObjectType({
    name:'Guery',
    description:"Root Query",
    fields:()=>({
        books:{
            type: new GraphQLList(BookType),
            description: "List of all books",
            resolve:()=>books
        }
    })
})

const schema = new GraphQLSchema({
    query:RootType
})

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))

app.use('/rest',(req,res)=>res.send('Rest'))
app.listen(3000,()=>console.log('http://localhost:3000'))