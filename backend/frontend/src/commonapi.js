import { base_url, isUserLoggedInToken } from "./config"

export const postRequest = async ({ sub_url, dataMain }) => {
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: isUserLoggedInToken(),
      Accept: 'application/json'
    },
    body: JSON.stringify(dataMain)
  }

  try {
    const response = await fetch(`${base_url}${sub_url}`, data)
    const res = await response.json()

    if (res.status === true) {
      return res
    } else {
      return {
        status: res.status,
        message: res.message
      }
    }
  } catch (error) {
    return {
      status: false,
      message: "Server not responding, please try again later"
    }
  }
}


