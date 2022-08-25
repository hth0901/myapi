import { createSlice } from '@reduxjs/toolkit'

const placeCartSlice = createSlice({
    name: 'placeCart',
    initialState: {
        items: [],
        totalPrice: 0,
        quickOrderObject: {
            placeId: '',
            placeName: '',
            imageID: '',
            imageUrl: '',
            details: [],
            totalPrice: 0,
        },
    },
    reducers: {
        reset(state) {
            state.items = []
            state.totalPrice = 0
            state.quickOrderObject = {
                placeId: '',
                placeName: '',
                imageID: '',
                imageUrl: '',
                details: [],
                totalPrice: 0,
            }
        },
        addItemToCart(state, action) {
            const selectedPlace = { ...action.payload.selectedPlace }
            // const selectedQuickPlace = {
            //   placeId: selectedPlace.id,
            //   placeName: selectedPlace.title,
            //   imageID: selectedPlace.imageID,
            //   imageUrl: selectedPlace.imageUrl,
            //   details: [],
            //   totalPrice: 0
            // }
            let selectedQuickPlace
            const currentItems = [...state.items]

            let existingPlace = currentItems.find(
                (el) => el.placeId === selectedPlace.id
            )
            if (existingPlace) {
                existingPlace.totalPrice = 0
                existingPlace.details.forEach((el) => {
                    if (el.custommerTypeId === 1) {
                        el.quantity = el.quantity + 1
                    }
                    existingPlace.totalPrice =
                        existingPlace.totalPrice + el.price * el.quantity
                })
            } else {
                selectedQuickPlace = {
                    placeId: selectedPlace.id,
                    placeName: selectedPlace.title,
                    imageID: selectedPlace.imageID,
                    imageUrl: selectedPlace.imageUrl,
                    details: [],
                    totalPrice: 0,
                }

                const vTemp = selectedPlace.priceDetail || []

                vTemp.forEach((el) => {
                    const item = { ...el }
                    item.quantity = 0
                    // if (item.custommerTypeId === 1) {
                    //   item.quantity = action.payload.adultCount
                    // };
                    // if (item.custommerTypeId === 2) {
                    //   item.quantity = action.payload.childrenCount
                    // };

                    // selectedQuickPlace.totalPrice = selectedQuickPlace.totalPrice + (item.price * item.quantity);
                    selectedQuickPlace.details.push(item)
                })
                selectedQuickPlace.details.forEach((el) => {
                    if (el.custommerTypeId === 1) {
                        el.quantity = el.quantity + 1
                    }
                    selectedQuickPlace.totalPrice =
                        selectedQuickPlace.totalPrice + el.price * el.quantity
                })
                currentItems.push(selectedQuickPlace)
            }
            let totalPrice = 0
            currentItems.forEach((el) => {
                totalPrice += el.totalPrice
            })
            state.items = currentItems
            state.totalPrice = totalPrice

            // selectedPlace.adultQuantity = 1;
            // selectedPlace.childrenQuantity = 0;
            // // console.log(selectedPlace);
            // const existingItem = state.items.find(
            //   (item) => item.id === selectedPlace.id
            // );
            // if (!existingItem) {
            //   state.items.push(selectedPlace);
            // } else {
            //   existingItem.adultQuantity += 1;
            // }

            // let mPrice = 0;
            // state.items.forEach((el) => {
            //   mPrice =
            //     mPrice +
            //     el.adultQuantity * el.adultPrice +
            //     el.childrenQuantity * el.childrenPrice;
            // });
            // state.totalPrice = mPrice;
        },

        turningQuantity(state, action) {
            const { placeId, custommerTypeId, count } = action.payload
            const currentItems = [...state.items]
            let existingPlace = currentItems.find(
                (el) => el.placeId === placeId
            )
            let currentType = existingPlace.details.find(
                (el) => el.custommerTypeId === custommerTypeId
            )
            if (count < 0) {
                if (currentType.quantity > 0) {
                    currentType.quantity = currentType.quantity + count
                    existingPlace.totalPrice =
                        existingPlace.totalPrice + currentType.price * count
                }
            } else {
                currentType.quantity = currentType.quantity + count
                existingPlace.totalPrice =
                    existingPlace.totalPrice + currentType.price * count
            }
            let totalPrice = 0
            currentItems.forEach((el) => {
                totalPrice += el.totalPrice
            })
            state.items = currentItems
            state.totalPrice = totalPrice
        },
        increaseAdultQuantity(state, action) {
            const placeId = action.payload.placeId
            const existingItem = state.items.find((item) => item.id === placeId)
            if (!existingItem) return
            existingItem.adultQuantity += 1
            // state.items = [existingItem];

            let mPrice = 0
            state.items.forEach((el) => {
                mPrice =
                    mPrice +
                    el.adultQuantity * el.adultPrice +
                    el.childrenQuantity * el.childrenPrice
            })
            state.totalPrice = mPrice
        },
        decreaseAdultQuantity(state, action) {
            const placeId = action.payload.placeId
            const existingItem = state.items.find((item) => item.id === placeId)
            if (!existingItem) return
            if (existingItem.adultQuantity === 0) return
            existingItem.adultQuantity -= 1
            // state.items = [existingItem];
            let mPrice = 0
            state.items.forEach((el) => {
                mPrice =
                    mPrice +
                    el.adultQuantity * el.adultPrice +
                    el.childrenQuantity * el.childrenPrice
            })
            state.totalPrice = mPrice
        },
        increaseChildrenQuantity(state, action) {
            const placeId = action.payload.placeId
            const existingItem = state.items.find((item) => item.id === placeId)
            if (!existingItem) return
            existingItem.childrenQuantity += 1
            // state.items = [existingItem];
            let mPrice = 0
            state.items.forEach((el) => {
                mPrice =
                    mPrice +
                    el.adultQuantity * el.adultPrice +
                    el.childrenQuantity * el.childrenPrice
            })
            state.totalPrice = mPrice
        },
        decreaseChildrenQuantity(state, action) {
            const placeId = action.payload.placeId
            const existingItem = state.items.find((item) => item.id === placeId)
            if (!existingItem) return
            if (existingItem.childrenQuantity === 0) return
            existingItem.childrenQuantity -= 1
            // state.items = [existingItem];
            let mPrice = 0
            state.items.forEach((el) => {
                mPrice =
                    mPrice +
                    el.adultQuantity * el.adultPrice +
                    el.childrenQuantity * el.childrenPrice
            })
            state.totalPrice = mPrice
        },

        updateChildrenQuantity(state, action) {
            const placeId = action.payload.placeId
            const existingItem = state.items.find((item) => item.id === placeId)
            if (!existingItem) return
            existingItem.childrenQuantity = action.payload.count
            // state.items = [existingItem];
            let mPrice = 0
            state.items.forEach((el) => {
                mPrice =
                    mPrice +
                    el.adultQuantity * el.adultPrice +
                    el.childrenQuantity * el.childrenPrice
            })
            state.totalPrice = mPrice
        },

        updateAdultQuantity(state, action) {
            const placeId = action.payload.placeId
            const existingItem = state.items.find((item) => item.id === placeId)
            if (!existingItem) return
            existingItem.adultQuantity = action.payload.count
            // state.items = [existingItem];
            let mPrice = 0
            state.items.forEach((el) => {
                mPrice =
                    mPrice +
                    el.adultQuantity * el.adultPrice +
                    el.childrenQuantity * el.childrenPrice
            })
            state.totalPrice = mPrice
        },
        quickOrderTuningQuantity(state, action) {
            const { count, custommerTypeId } = action.payload
            const currentSelectedQuickPlace = JSON.parse(
                JSON.stringify({ ...state.quickOrderObject })
            )
            currentSelectedQuickPlace.totalPrice = 0
            currentSelectedQuickPlace.details.forEach((el) => {
                if (el.custommerTypeId === custommerTypeId) {
                    el.quantity = el.quantity + count
                }

                currentSelectedQuickPlace.totalPrice =
                    currentSelectedQuickPlace.totalPrice +
                    el.price * el.quantity
            })

            state.quickOrderObject = { ...currentSelectedQuickPlace }
        },
        quickOrderChangeQuantity(state, action) {
            const { count, custommerTypeId } = action.payload
            const currentSelectedQuickPlace = JSON.parse(
                JSON.stringify({ ...state.quickOrderObject })
            )
            currentSelectedQuickPlace.totalPrice = 0
            currentSelectedQuickPlace.details.forEach((el) => {
                if (el.custommerTypeId === custommerTypeId) {
                    el.quantity = count
                }

                currentSelectedQuickPlace.totalPrice =
                    currentSelectedQuickPlace.totalPrice +
                    el.price * el.quantity
            })

            state.quickOrderObject = { ...currentSelectedQuickPlace }
        },
        initQuickOrder(state, action) {
            const selectedPlace = { ...action.payload.selectedPlace }
            const selectedQuickPlace = {
                placeId: selectedPlace.id,
                placeName: selectedPlace.title,
                imageID: selectedPlace.imageID,
                imageUrl: selectedPlace.imageUrl,
                details: [],
                totalPrice: 0,
            }

            const vTemp = selectedPlace.priceDetail || []

            vTemp.forEach((el) => {
                const item = { ...el }

                item.quantity = 0
                selectedQuickPlace.details.push(item)
            })

            state.quickOrderObject = selectedQuickPlace
        },
        replaceCartItem(state, action) {
            const selectedPlace = { ...action.payload.selectedPlace }
            // const strJsonPlace = JSON.stringify(selectedPlace);
            // const selectedQuickPlace = JSON.parse(strJsonPlace);
            //   selectedPlace.adultQuantity = action.payload.adultQuantity;
            //   selectedPlace.childrenQuantity = action.payload.childrenQuantity;

            const selectedQuickPlace = {
                placeId: selectedPlace.id,
                placeName: selectedPlace.title,
                imageID: selectedPlace.imageID,
                imageUrl: selectedPlace.imageUrl,
                details: [],
                totalPrice: 0,
            }

            const vTemp = selectedPlace.priceDetail || []

            const currentSelectedQuickPlace = JSON.parse(
                JSON.stringify({ ...state.quickOrderObject })
            )

            vTemp.forEach((el) => {
                const item = { ...el }

                item.quantity = 0

                currentSelectedQuickPlace.details.forEach((subel) => {
                    if (subel.custommerTypeId === item.custommerTypeId) {
                        item.quantity = subel.quantity
                    }
                })

                selectedQuickPlace.totalPrice =
                    selectedQuickPlace.totalPrice + item.price * item.quantity
                selectedQuickPlace.details.push(item)
            })

            // selectedQuickPlace.details.forEach((el) => {
            //     selectedQuickPlace.totalPrice =
            //         selectedQuickPlace.totalPrice + el.price * el.quantity
            // })

            // vTemp.forEach((el) => {
            //     const item = { ...el }
            //     item.quantity = 0
            //     if (item.custommerTypeId === 1) {
            //         item.quantity = action.payload.adultCount
            //     }
            //     if (item.custommerTypeId === 2) {
            //         item.quantity = action.payload.childrenCount
            //     }

            //     selectedQuickPlace.totalPrice =
            //         selectedQuickPlace.totalPrice + item.price * item.quantity
            //     selectedQuickPlace.details.push(item)
            // })

            // selectedPlace.adultQuantity = action.payload.adultCount;
            // selectedPlace.childrenQuantity = action.payload.childrenCount;
            // state.items = [selectedPlace];
            // let mPrice = 0;
            // state.items.forEach((el) => {
            //   mPrice =
            //     mPrice +
            //     el.adultQuantity * el.adultPrice +
            //     el.childrenQuantity * el.childrenPrice;
            // });
            // state.totalPrice = mPrice;
            state.quickOrderObject = selectedQuickPlace
        },
        removeItemFromCart(state, action) {
            const currentItems = [...state.items]
            const resultItems = []
            currentItems.forEach((el) => {
                if (action.payload.indexOf(el.id) === -1) {
                    resultItems.push(el)
                }
            })

            state.items = [...resultItems]
            let mPrice = 0
            state.items.forEach((el) => {
                mPrice =
                    mPrice +
                    el.adultQuantity * el.adultPrice +
                    el.childrenQuantity * el.childrenPrice
            })
            state.totalPrice = mPrice
        },
    },
})

export const placeCartActions = placeCartSlice.actions

export default placeCartSlice
