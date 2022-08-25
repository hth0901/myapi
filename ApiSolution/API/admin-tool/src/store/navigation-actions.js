import { navigationActions } from './navigation-slice'
const API_URL = process.env.REACT_APP_URL

export const getNavigationByUser = (uname) => {
    return async (dispatch) => {
        const getData = async () => {
            const res = await fetch(
                `${API_URL}/api/Menu/getnavigation/${uname}`
            )

            if (!res.ok) {
                throw new Error('Proccess Error')
            }

            const data = await res.json()
            console.log(data)
            return data
        }
        try {
            const navData = await getData()
            const lv1Menu = navData.filter(
                (el) => el.parentID === 0 && el.isAdminTool === '1'
            )
            const leafMenu = navData.filter(
                (el) => el.parentID !== 0 && el.isAdminTool === '1'
            )

            const lstResult = []

            lv1Menu.forEach((el) => {
                const elObj = {
                    name: el.name,
                    icon: el.icon,
                }
                if (el.isLeaf === '1') {
                    elObj.path = el.path
                    lstResult.push(elObj)
                } else if (el.isLeaf === '0') {
                    elObj.children = []
                    leafMenu.forEach((subel) => {
                        if (subel.parentID === el.id) {
                            elObj.children.push({
                                name: subel.name,
                                iconText: subel.icon,
                                path: subel.path,
                            })
                        }
                    })
                    if (elObj.children.length > 0) {
                        lstResult.push(elObj)
                    }
                }
                // if (el.isLeaf === '1')
                // lstResult.push(elObj)
            })
            dispatch(
                navigationActions.setNavigation({
                    listNav: lstResult,
                })
            )
        } catch (err) {
            console.log(err.message)
        }
    }
}
