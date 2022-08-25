import Mock from '../mock'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import { result } from 'lodash'

const JWT_SECRET = 'jwt_secret_key'
const JWT_VALIDITY = '7 days'

// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com

const API_URL = process.env.REACT_APP_URL

Mock.onPost('/api/auth/login').reply(async (config) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const { email, password } = JSON.parse(config.data)
        const data = {}
        data.userName = email
        data.passWord = password
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            method: 'Post',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow',
        }
        let ResultAPI = {}
        await fetch(`${API_URL}/api/Account/login`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                ResultAPI = JSON.parse(result)
            })
            .catch((error) => console.log('error', error))

        console.log('resultAPI', ResultAPI)
        if (ResultAPI.token === undefined) {
            return [400, { message: 'Sai tài khoản hoặc mật khẩu' }]
        } else {
            let ResultAPI2 = {}
            await fetch(`${API_URL}/api/Employee/getuser`, requestOptions)
                .then((response2) => response2.text())
                .then((result2) => {
                    ResultAPI2 = JSON.parse(result2)
                })
                .catch((error2) => console.log('error', error2))
            // const accessToken = jwt.sign({ userId: ResultAPI.id }, JWT_SECRET, {
            //     expiresIn: JWT_VALIDITY,
            // })
            if (ResultAPI2.id === undefined) {
                return [400, { message: 'Sai tài khoản hoặc mật khẩu' }]
            } else {
                const accessToken = ResultAPI.token
                //console.log(ResultAPI);
                Cookies.set('user', JSON.stringify(ResultAPI2))
                return [
                    200,
                    {
                        accessToken,
                        user: {
                            id: ResultAPI2.id,
                            name: ResultAPI2.fullName,
                            role: ResultAPI2.roleID,
                        },
                    },
                ]
            }
        }
    } catch (err) {
        console.error(err)
        return [500, { message: 'Internal server error' }]
    }
})

// Mock.onPost('/api/auth/register').reply( async(config) => {
//     try {
//         const { email, username , password } = JSON.parse(config.data)
//         // KIỂM TRA TỒN TẠI USER NÀY CHƯA
//         // const user = userList.find((u) => u.email === email)

//         // if (user) {
//         //     return [400, { message: 'User already exists!' }]
//         // }
//         const newUser = {
//             FullName: email,
//             RoleID: 8,
//             UserName: email,
//             PassWord: password
//         }

//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         var requestOptions = {
//             method: 'Post',
//             headers: myHeaders,
//             body: JSON.stringify(newUser),
//             redirect: 'follow'
//         };
//         await fetch("https://localhost:44311/api/Employee", requestOptions)
//         .then(response => response.text())
//         .then(result => {
//             console.log(result);
//             notify("Tạo tài khoản thành công", "success", 2000);

//         })
//         .catch(error => console.log('error', error));

//         const accessToken = jwt.sign({ userId: 2 }, JWT_SECRET, {
//             expiresIn: JWT_VALIDITY,
//         })

//         return [
//             200,
//             {
//                 accessToken,
//                 user: {
//                     avatar: newUser.avatar,
//                     email: newUser.email,
//                     name: newUser.name,
//                     username: newUser.username,
//                     role: newUser.role,
//                 },
//             },
//         ]
//     } catch (err) {
//         console.error(err)
//         return [500, { message: 'Internal server error' }]
//     }
// })

Mock.onGet('/api/auth/profile').reply((config) => {
    try {
        const { Authorization } = config.headers
        if (!Authorization) {
            return [401, { message: 'Invalid Authorization token' }]
        }

        //const accessToken = Authorization.split(' ')[1]
        //const { userId } = jwt.verify(accessToken, JWT_SECRET)
        //const user = userList.find((u) => u.id === userId)
        const userString = Cookies.get('user')
        //console.log("user",user);
        if (userString === undefined) {
            return [401, { message: 'Invalid authorization token' }]
        }
        const user = JSON.parse(userString.toString())
        return [
            200,
            {
                user: {
                    id: user.id,
                    //avatar: user.avatar,
                    //email: user.email,
                    name: user.fullName,
                    role: user.roleID,
                },
            },
        ]
    } catch (err) {
        console.error(err)
        return [500, { message: 'Internal server error' }]
    }
})
