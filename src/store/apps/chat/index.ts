// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Types
import { Dispatch } from 'redux'
import { SendMsgParamsType } from 'src/types/apps/chat'

// const chats =  [
//   {
//     id: 1,
//     userId: 1,
//     unseenMsgs: 1,
//     chat: [
//       {
//         message: "How can we help? We're here for you!",
//         time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
//         senderId: 11,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
//         time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
//         senderId: 1,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'It should be MUI v5 compatible.',
//         time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
//         senderId: 1,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'Absolutely!',
//         time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
//         senderId: 11,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'This admin template is built with MUI!',
//         time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
//         senderId: 11,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'Looks clean and fresh UI. 😍',
//         time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
//         senderId: 1,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: "It's perfect for my next project.",
//         time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
//         senderId: 1,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'How can I purchase it?',
//         time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
//         senderId: 1,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'Thanks, From our official site  😇',
//         time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
//         senderId: 11,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
     
//     ]
//   },
//   {
//     id: 2,
//     userId: 2,
//     unseenMsgs: 0,
//     chat: [
//       {
//         message: 'Hi',
//         time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
//         senderId: 11,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'Hello. How can I help You?',
//         time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
//         senderId: 2,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'Can I get details of my last transaction I made last month? 🤔',
//         time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
//         senderId: 11,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'We need to check if we can provide you such information.',
//         time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
//         senderId: 2,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
//       {
//         message: 'I will inform you as I get update on this.',
//         time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
//         senderId: 2,
//         feedback: {
//           isSent: true,
//           isDelivered: true,
//           isSeen: true
//         }
//       },
      
//     ]
//   }
// ]

// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {
  const response = await axios.get('/apps/chat/users/profile-user')

  return response.data
})

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
  const response = await axios.get('/apps/chat/chats-and-contacts')

  return response.data
})

// ** Select Chat
export const selectChat = createAsyncThunk(
  'appChat/selectChat',
  async (id: number | string, { dispatch }: { dispatch: Dispatch<any> }) => {
    const response = await axios.get('/apps/chat/get-chat', {
      params: {
        id
      }
    })
    await dispatch(fetchChatsContacts())

    return response.data
  }
)

// ** Send Msg
export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj: SendMsgParamsType, { dispatch }) => {
  const response = await axios.post('/apps/chat/send-msg', {
    data: {
      obj
    }
  })
  if (obj.contact) {
    await dispatch(selectChat(obj.contact.id))
  }
  await dispatch(fetchChatsContacts())

  return response.data
})

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState: {
    chats: null,
    contacts: null,
    userProfile: null,
    selectedChat: null
  },
  reducers: {
    removeSelectedChat: state => {
      state.selectedChat = null
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload
    })
    builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
      state.contacts = action.payload.contacts
      state.chats = action.payload.chatsContacts
    })
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.selectedChat = action.payload
    })
  }
})

export const { removeSelectedChat } = appChatSlice.actions

export default appChatSlice.reducer
