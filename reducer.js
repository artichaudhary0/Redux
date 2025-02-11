// let state = {
//     count : 0
// }

// // increment
// function reducer1(state){
//     return {...state,count:state.count+1}
// }

// // decrement
// function reducer2(state){
//     return {...state,count:state.count-1}
// }

// state = reducer1(state)
// console.log(state)
// state = reducer2(state)
// console.log(state)

// function reducer(state,action)
// {
//     if(action.type === "post/increment")
//     {
//         return {...state,count : state.count+1}
//     }else if(action.type === "post/decrement")
//     {
//         return {...state,count : state.count-1}
//     }

//     return state
// }


// function reducer(state,action)
// {
//     switch(action.type)
//     {
//         case "post/increment":
//             return {...state,count : state.count+1}
//         case "post/decrement" :
//             return {...state,count : state.count-1}
//         default : 
//             return state
//     }
// }

// action: plain js object {}
// state = reducer(state, {dfgfg : "post/increment"})
// console.log(state)

// state = reducer(state, {type : "post/decrement"})
// console.log(state )

// state = reducer(state,{type : ""})
// console.log(state)

// do-to-list
let state = {
    todos: []
}


function reducer(state, action) {

    switch (action.type) {
        case "add_todo":
            return { ...state, todos: [...state.todos, action.payload] }
        case "remove_todo":
            return { ...state, todos: state.todos.filter((todo) => (todo !== action.payload)) };
    }
}


state = reducer(state, { type: "add_todo", payload: "learn redux" })
console.log(state)

state = reducer(state, { type: "add_todo", payload: "learn react" })
console.log(state)

state = reducer(state, { type: "add_todo", payload: "learn Js" })
console.log(state)

state = reducer(state, { type: "remove_todo", payload: "learn react" })
console.log(state)
