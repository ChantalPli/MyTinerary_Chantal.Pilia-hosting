///qui mettiamo todas las llamadas a la API////

// import axios from 'axios';

// export const getAllCities = async () => {
//     try {
//         let data = await axios.get(`http://localhost:4000/api/allcities`)
//         return data
//     }
//     catch (error) {
//         throw error
//     }
// }
// export const loadData = async (dataInput) => {
//     console.log(dataInput)
//     try {
//         let data = await axios.post(`http://localhost:4000/api/cities`,{dataInput})
//         return data
//     }
//     catch (error) {
//         throw error
//     }
// }

// export const deleteCity = async (id) => {
//     console.log(id)
//     try {
//         let data = await axios.delete(`http://localhost:4000/api/cities/${id}`)
//         return data
//     }
//     catch (error) {
//         throw error
//     }
// }
// export const  modifyCities = async (id,dataInput) => {
//     console.log(id, dataInput)
//     try {
//         let data = await axios.put(`http://localhost:4000/api/cities/${id}`, {dataInput})
//         return data
//     }
//     catch (error) {
//         throw error
//     }
// }