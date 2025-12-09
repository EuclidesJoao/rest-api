const user = {
    firstname: "Euclides",
    lastname: "Joao",
    age: 27,
    role: "Software engineer",
    salary: 2000000
}
type TUser = {
    firstname: string;
    lastname: string;
    age: number;
    role: string;
    salary: number;
}


const keys = Object.keys(user)
const setQueries = keys.map((key, index)=> `${key} = $${index+1}`)
//console.log(setQueries)




const sayMyName=(data: TUser)=>{
    const {firstname, lastname, age, role, salary} = data

    console.log("My name is ", firstname+" "+lastname+" I am a ",role+" I earn "+salary+" and I am only "+age+" years old")
}

console.log(sayMyName(user))



